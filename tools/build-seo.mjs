/*  Generador de páginas estáticas para SEO — La Barraquita
 *
 *  Lee los productos desde js/app.js (fuente única de verdad) y escribe:
 *    /catalogo/index.html                        → índice de todos los productos
 *    /catalogo/<categoria>/index.html            → 6 páginas de categoría
 *    /catalogo/<categoria>/<producto>/index.html → 1 ficha por producto
 *    /marcas/<marca>/index.html                  → páginas de marca (2+ productos)
 *    /sitemap.xml                                → todas las URLs
 *    /js/rutas.js                                → mapa id→URL que usa el catálogo
 *
 *  IMPORTANTE: cada vez que cambien precios, productos o fotos en js/app.js
 *  hay que volver a correr:  node tools/build-seo.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://labarraquita.com.uy";
const WA = "59892109806";
const TEL_WA = "092 109 806";
const HOY = new Date().toISOString().slice(0, 10);

/* ── 1. Datos ─────────────────────────────────────────────────────── */
const app = fs.readFileSync(path.join(ROOT, "js/app.js"), "utf8");
const PRODUCTS = JSON.parse(app.match(/var PRODUCTS\s*=\s*(\[[\s\S]*?\]);/)[1]);
const IMGS = JSON.parse(app.match(/var IMGS\s*=\s*(\{[\s\S]*?\});/)[1]);

const CATS = {
  perro:   { slug:"perros",  label:"Perros",  h1:"Raciones y alimento balanceado para perros",
             tipo:"Alimento balanceado para perros",
             intro:"Trabajamos con las marcas líderes en ración para perros: Astro, Bravo, Frost, Equilibrio, Criolla, Connie, Old Prince, Pedigree y muchas más. Tenemos fórmulas para cachorros, adultos, razas pequeñas, razas grandes y perros mayores de 7 años, en bolsas desde 7 kg hasta 25 kg, con bonificación de kilos en la mayoría de las presentaciones." },
  gato:    { slug:"gatos",   label:"Gatos",   h1:"Raciones y alimento balanceado para gatos",
             tipo:"Alimento balanceado para gatos",
             intro:"Ración para gatos adultos y castrados de las mejores marcas —Atacama, Frost, Le Roy, Fámil, Equilibrio, Criolla, Connie— más la variedad más completa de piedras sanitarias de Minas. Vendemos por mayor y por menor, con envío en el día a todo el país." },
  granja:  { slug:"granja",  label:"Granja",  h1:"Raciones para animales de granja",
             tipo:"Ración para animales de granja",
             intro:"Somos los únicos avalados por el MGAP en la zona. Raciones para aves ponedoras, pollos parrilleros, vacunos, terneros, cerdos, lechones, ovinos y conejos, en bolsas de 25 kg, más suplementos proteicos y vitamínicos. Precios mayoristas para productores y comercios." },
  granos:  { slug:"granos",  label:"Granos",  h1:"Granos e insumos a granel",
             tipo:"Grano e insumo a granel",
             intro:"Maíz entero, maíz quebrado, arroz y avena para caballos, en bolsas de 25 y 35 kg. Insumos para alimentar aves de corral, cerdos, vacunos y equinos, con entrega en tu casa o tu establecimiento." },
  cuidado: { slug:"sanidad", label:"Sanidad", h1:"Sanidad animal y control de plagas",
             tipo:"Producto de sanidad animal y control de plagas",
             intro:"Antiparasitarios internos y externos, pipetas, Simparica Trio para perros de 5 a 60 kg, mata pulgas y garrapatas, venenos para hormigas y cucarachas. Consultá siempre al veterinario por la dosis según el peso del animal." },
  harina:  { slug:"harinas", label:"Harinas", h1:"Harina de trigo por bolsa y por pack",
             tipo:"Harina de trigo",
             intro:"Harina de trigo 00, 000, 0000 e integral en bolsas de 25 kg, y packs de 12 unidades de Harina Uruguay y Primor. Precios mayoristas para panaderías, pizzerías y comercios de Minas y todo el país." }
};

/* Marcas que valen una página propia (se generan solo si tienen 2+ productos) */
const MARCAS = [
  { nombre:"Astro",         re:/^astro\b/i },
  { nombre:"Bravo",         re:/^bravo\b/i },
  { nombre:"Frost",         re:/^frost\b/i },
  { nombre:"Criolla",       re:/^criolla\b/i },
  { nombre:"Connie",        re:/^connie\b/i },
  { nombre:"Equilibrio",    re:/^equilibrio\b/i },
  { nombre:"Le Roy",        re:/^le roy\b/i },
  { nombre:"Prot",          re:/^prot\b/i },
  { nombre:"Fámil Premium", re:/^f[áa]mil\b/i },
  { nombre:"Atacama",       re:/^atacama\b/i },
  { nombre:"Nhock",         re:/^nhock\b/i },
  { nombre:"Oriunda",       re:/^oriunda\b/i },
  { nombre:"Hiport Dog",    re:/^hiport\b/i },
  { nombre:"Macanudo",      re:/^macanudo\b/i },
  { nombre:"Simparica",     re:/^simparica\b/i }
];

/* ── 2. Utilidades ────────────────────────────────────────────────── */
function slug(s){
  return String(s)
    .replace(/\+/g, " mas ")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’´`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function esc(s){
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function fmtUYU(n){ return "$ " + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
function fmtUSD(n){ return "US$ " + n.toFixed(2).replace(".", ","); }
function precio(p){
  if(p.price === null || p.price === undefined) return "Consultar";
  return p.cur === "USD" ? fmtUSD(p.price) : fmtUYU(p.price);
}
function waHref(texto){
  return "https://wa.me/" + WA + "?text=" + encodeURIComponent(texto);
}
function write(rel, html){
  const dest = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html, "utf8");
}

/* ── 3. Modelo enriquecido ────────────────────────────────────────── */
const usados = new Set();
const items = PRODUCTS.map(function(p){
  const cat = CATS[p.cat];
  const base = slug(p.name + (p.pres ? " " + p.pres : ""));
  let s = base, n = 2;
  while(usados.has(cat.slug + "/" + s)){ s = base + "-" + (n++); }
  usados.add(cat.slug + "/" + s);
  const marca = MARCAS.find(function(m){ return m.re.test(p.name); });
  return {
    ...p,
    cat_slug: cat.slug,
    cat_label: cat.label,
    tipo: /sanitaria/i.test(p.name) ? "Piedra sanitaria absorbente para gatos" : cat.tipo,
    slug: s,
    url: "/catalogo/" + cat.slug + "/" + s + "/",
    img: IMGS[p.img] ? "/" + IMGS[p.img] : null,
    titulo: p.name + (p.pres ? " " + p.pres : ""),
    marca: marca ? marca.nombre : null,
    precio: precio(p)
  };
});
const porCat = {};
items.forEach(function(it){ (porCat[it.cat] = porCat[it.cat] || []).push(it); });

const marcas = MARCAS.map(function(m){
  const lista = items.filter(function(it){ return it.marca === m.nombre; });
  return { ...m, slug: slug(m.nombre), url: "/marcas/" + slug(m.nombre) + "/", items: lista };
}).filter(function(m){ return m.items.length >= 2; });

/* ── 4. Plantilla base ────────────────────────────────────────────── */
function layout(o){
  return `<!doctype html>
<html lang="es-UY">
<head>
<meta charset="utf-8">
<title>${esc(o.title)}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${esc(o.desc)}">
<meta name="theme-color" content="#5c1b26">
<link rel="canonical" href="${SITE}${o.url}">
<link rel="icon" href="/img/brand-logo.png" type="image/png">
<link rel="apple-touch-icon" href="/img/brand-logo.png">
<meta property="og:type" content="${o.ogType || "website"}">
<meta property="og:site_name" content="La Barraquita">
<meta property="og:title" content="${esc(o.ogTitle || o.title)}">
<meta property="og:description" content="${esc(o.desc)}">
<meta property="og:image" content="${SITE}${o.image || "/img/og-cover.jpg"}">
<meta property="og:url" content="${SITE}${o.url}">
<meta property="og:locale" content="es_UY">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(o.ogTitle || o.title)}">
<meta name="twitter:description" content="${esc(o.desc)}">
<meta name="twitter:image" content="${SITE}${o.image || "/img/og-cover.jpg"}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Libre+Franklin:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/pagina.css">
<script type="application/ld+json">
${JSON.stringify(o.jsonld, null, 2)}
</script>
</head>
<body>

<div class="bar">Envíos en el día con flota propia a todo el país · <b>Únicos avalados por el MGAP</b></div>

<header class="top">
  <div class="wrap top-row">
    <a class="brandmark" href="/" aria-label="La Barraquita, inicio">
      <img class="brand-logo" src="/img/brand-logo.png" alt="La Barraquita — Raciones Balanceadas">
    </a>
    <nav class="pagenav" aria-label="Categorías">
      ${Object.values(CATS).map(function(c){
        return `<a href="/catalogo/${c.slug}/">${c.label}</a>`;
      }).join("\n      ")}
    </nav>
    <a class="btn-wa-top" href="${waHref("Hola La Barraquita! Vengo desde la web y quiero hacer un pedido.")}" target="_blank" rel="noopener">${TEL_WA}</a>
  </div>
</header>

<nav class="crumbs" aria-label="Migas de pan">
  <div class="wrap">
    ${o.crumbs.map(function(c, i){
      const last = i === o.crumbs.length - 1;
      return last ? `<span aria-current="page">${esc(c.n)}</span>`
                  : `<a href="${c.u}">${esc(c.n)}</a><span class="sep">›</span>`;
    }).join("\n    ")}
  </div>
</nav>

<main>
${o.body}
</main>

<footer>
  <div class="wrap foot-grid">
    <div>
      <div class="foot-wordmark">LA BARRAQUITA</div>
      <div class="foot-tagline">Raciones balanceadas</div>
      <p class="foot-p">Negocio familiar de Minas desde 2002. Raciones para perros, gatos y granja, granos, sanidad y harinas. Únicos avalados por el MGAP, con flota propia y envíos en el día a todo el país.</p>
    </div>
    <div>
      <h4>Catálogo</h4>
      <ul>
        <li><a href="/catalogo/">Todos los productos</a></li>
        ${Object.values(CATS).map(function(c){
          return `<li><a href="/catalogo/${c.slug}/">${c.label}</a></li>`;
        }).join("\n        ")}
      </ul>
    </div>
    <div>
      <h4>Marcas</h4>
      <ul>
        ${marcas.slice(0, 8).map(function(m){
          return `<li><a href="${m.url}">${esc(m.nombre)}</a></li>`;
        }).join("\n        ")}
      </ul>
    </div>
    <div>
      <h4>Dónde estamos</h4>
      <p class="foot-p">Intendente Lois 523<br>Minas, Lavalleja</p>
      <h4 class="mt">Horarios</h4>
      <p class="foot-p">Lunes a viernes 8:00–12:30 y 14:00–18:30<br>Sábados 8:00–13:00</p>
      <h4 class="mt">Contacto</h4>
      <p class="foot-p">WhatsApp ${TEL_WA}<br>Teléfono 4442 4021</p>
    </div>
  </div>
  <div class="foot-bottom">
    <div class="wrap">
      <p>Los precios pueden variar; confirmá stock y valores al hacer tu pedido. Productos de granja y harinas expresados en dólares.</p>
      <span>© ${new Date().getFullYear()} La Barraquita · Minas, Lavalleja</span>
    </div>
  </div>
</footer>

</body>
</html>
`;
}

/* Mismo @id que el PetStore declarado en index.html; se repite nombre y tipo
   para que cada ficha sea válida por sí sola en el validador de Google. */
const NEGOCIO = { "@type": ["PetStore", "Store"], "@id": SITE + "/#negocio", "name": "La Barraquita", "url": SITE + "/" };

function breadcrumbLD(crumbs){
  return {
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map(function(c, i){
      return { "@type":"ListItem", "position": i + 1, "name": c.n, "item": SITE + c.u };
    })
  };
}

/* Tarjeta de producto reutilizable en índices */
function card(it){
  return `<li class="card">
        <a href="${it.url}">
          <span class="card-art">${it.img ? `<img src="${it.img}" alt="${esc(it.titulo)}" loading="lazy" decoding="async">` : ""}</span>
          <span class="card-cat">${esc(it.cat_label)}</span>
          <span class="card-name">${esc(it.name)}</span>
          ${it.pres ? `<span class="card-pres">${esc(it.pres)}</span>` : ""}
          <span class="card-price">${esc(it.precio)}</span>
        </a>
      </li>`;
}

/* ── 5. Fichas de producto ────────────────────────────────────────── */
items.forEach(function(it){
  const crumbs = [
    { n:"Inicio", u:"/" },
    { n:"Catálogo", u:"/catalogo/" },
    { n:it.cat_label, u:"/catalogo/" + it.cat_slug + "/" },
    { n:it.titulo, u:it.url }
  ];
  const pedido = `Hola La Barraquita! Quiero pedir: ${it.name}${it.pres ? " (" + it.pres + ")" : ""}. ¿Está disponible?`;
  const relacionados = porCat[it.cat].filter(function(o){ return o.id !== it.id; }).slice(0, 8);

  const desc = `${it.name}${it.pres ? " de " + it.pres : ""} — ${it.precio} en La Barraquita, Minas (Lavalleja). ${it.tipo}. Envío en el día a todo el país, por mayor y por menor. Pedí por WhatsApp ${TEL_WA}.`;

  const offer = {
    "@type": "Offer",
    "url": SITE + it.url,
    "priceCurrency": it.cur,
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": NEGOCIO,
    "areaServed": { "@type":"Country", "name":"Uruguay" }
  };
  if(it.price !== null && it.price !== undefined) offer.price = it.price;

  const producto = {
    "@type": "Product",
    "@id": SITE + it.url + "#producto",
    "name": it.titulo,
    "sku": it.id,
    "category": it.cat_label,
    "description": `${it.tipo}${it.pres ? ", presentación de " + it.pres : ""}. Disponible en La Barraquita, Minas, Lavalleja, con envío a todo el Uruguay.`,
    "offers": offer
  };
  if(it.img) producto.image = SITE + it.img;
  if(it.marca) producto.brand = { "@type":"Brand", "name": it.marca };

  const body = `
<article class="ficha wrap">
  <div class="ficha-art">
    ${it.img ? `<img src="${it.img}" alt="${esc(it.titulo)} — La Barraquita, Minas" decoding="async">` : ""}
  </div>
  <div class="ficha-info">
    <p class="eyebrow"><a href="/catalogo/${it.cat_slug}/">${esc(it.cat_label)}</a>${it.marca ? ` · <a href="/marcas/${slug(it.marca)}/">${esc(it.marca)}</a>` : ""}</p>
    <h1 class="display">${esc(it.name)}</h1>
    ${it.pres ? `<p class="ficha-pres">Presentación: <b>${esc(it.pres)}</b></p>` : ""}
    <p class="ficha-precio">${esc(it.precio)}</p>
    <a class="btn-wa" href="${waHref(pedido)}" target="_blank" rel="noopener">Pedir por WhatsApp ${TEL_WA}</a>
    <p class="ficha-nota">Coordinás pago y entrega directo por WhatsApp. El precio es de referencia: confirmá stock y valor al hacer el pedido.</p>
    <ul class="ficha-ventajas">
      <li>Envío en el día a todo el país con flota propia</li>
      <li>Únicos avalados por el MGAP en la zona</li>
      <li>Venta por mayor y por menor</li>
      <li>Efectivo, transferencias y todas las tarjetas</li>
    </ul>
  </div>
</article>

<section class="wrap bloque">
  <h2 class="display">Sobre ${esc(it.name)}</h2>
  <p>${esc(it.tipo)}${it.pres ? ` en presentación de <b>${esc(it.pres)}</b>` : ""}. Lo conseguís en <b>La Barraquita</b>, en Intendente Lois 523, Minas (Lavalleja), o te lo llevamos a tu casa o tu comercio en menos de 24 horas con nuestra flota propia, en Minas y en todo el Uruguay.</p>
  <p>Somos un negocio familiar desde 2002 y los <b>únicos avalados por el MGAP</b> en la zona. Vendemos <b>por mayor y por menor</b>: si necesitás cantidad, escribinos y te pasamos la lista mayorista.</p>
  <h3>Cómo comprar</h3>
  <ol class="pasos">
    <li>Escribinos por WhatsApp al <b>${TEL_WA}</b> con el producto y la cantidad.</li>
    <li>Te confirmamos stock, precio del día y forma de pago.</li>
    <li>Retirás en el local o coordinamos el envío con flota propia.</li>
  </ol>
</section>

${relacionados.length ? `<section class="wrap bloque">
  <h2 class="display">Otros productos de ${esc(it.cat_label.toLowerCase())}</h2>
  <ul class="grid">
    ${relacionados.map(card).join("\n    ")}
  </ul>
  <p><a class="link-mas" href="/catalogo/${it.cat_slug}/">Ver todo el catálogo de ${esc(it.cat_label.toLowerCase())} →</a></p>
</section>` : ""}
`;

  write("catalogo/" + it.cat_slug + "/" + it.slug + "/index.html", layout({
    title: `${it.titulo} — Precio y envío | La Barraquita`,
    ogTitle: `${it.titulo} · ${it.precio}`,
    desc: desc.slice(0, 300),
    url: it.url,
    image: it.img || "/img/og-cover.jpg",
    ogType: "product",
    crumbs: crumbs,
    jsonld: { "@context":"https://schema.org", "@graph":[ producto, breadcrumbLD(crumbs) ] },
    body: body
  }));
});

/* ── 6. Páginas de categoría ──────────────────────────────────────── */
Object.keys(CATS).forEach(function(key){
  const c = CATS[key];
  const lista = porCat[key] || [];
  const crumbs = [ { n:"Inicio", u:"/" }, { n:"Catálogo", u:"/catalogo/" }, { n:c.label, u:"/catalogo/" + c.slug + "/" } ];
  const marcasCat = marcas.filter(function(m){ return m.items.some(function(i){ return i.cat === key; }); });

  const body = `
<section class="wrap encabezado">
  <p class="eyebrow">Catálogo · ${esc(c.label)}</p>
  <h1 class="display">${esc(c.h1)}</h1>
  <p class="lead">${esc(c.intro)}</p>
  <p class="conteo">${lista.length} ${lista.length === 1 ? "producto" : "productos"} · precios actualizados al ${HOY.split("-").reverse().join("/")}</p>
  ${marcasCat.length ? `<p class="chips">Marcas: ${marcasCat.map(function(m){ return `<a href="${m.url}">${esc(m.nombre)}</a>`; }).join(" ")}</p>` : ""}
</section>

<section class="wrap bloque">
  <ul class="grid">
    ${lista.map(card).join("\n    ")}
  </ul>
</section>

<section class="wrap bloque">
  <h2 class="display">Envíos y formas de pago</h2>
  <p>Llevamos tu pedido de ${esc(c.label.toLowerCase())} <b>en el día</b> a Minas y a todo el Uruguay con flota propia. Vendemos <b>por mayor y por menor</b> y aceptamos efectivo, transferencias bancarias y todas las tarjetas de crédito y débito.</p>
  <p>Escribinos al WhatsApp <a href="${waHref("Hola La Barraquita! Quiero consultar por " + c.label.toLowerCase() + ".")}" target="_blank" rel="noopener"><b>${TEL_WA}</b></a> o pasá por Intendente Lois 523, Minas, Lavalleja.</p>
</section>
`;

  write("catalogo/" + c.slug + "/index.html", layout({
    title: `${c.label}: ${lista.length} productos con precio | La Barraquita`,
    ogTitle: `${c.h1} — La Barraquita`,
    desc: `${c.h1} en La Barraquita, Minas (Lavalleja). ${lista.length} productos con precio, envío en el día a todo el país, por mayor y por menor. WhatsApp ${TEL_WA}.`,
    url: "/catalogo/" + c.slug + "/",
    crumbs: crumbs,
    jsonld: { "@context":"https://schema.org", "@graph":[
      {
        "@type": "CollectionPage",
        "@id": SITE + "/catalogo/" + c.slug + "/#pagina",
        "name": c.h1,
        "isPartOf": { "@id": SITE + "/#sitio" },
        "about": NEGOCIO,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": lista.length,
          "itemListElement": lista.map(function(it, i){
            return { "@type":"ListItem", "position": i + 1, "url": SITE + it.url, "name": it.titulo };
          })
        }
      },
      breadcrumbLD(crumbs)
    ] },
    body: body
  }));
});

/* ── 7. Índice general del catálogo ───────────────────────────────── */
{
  const crumbs = [ { n:"Inicio", u:"/" }, { n:"Catálogo", u:"/catalogo/" } ];
  const body = `
<section class="wrap encabezado">
  <p class="eyebrow">Catálogo completo</p>
  <h1 class="display">Todos nuestros productos, con precio</h1>
  <p class="lead">${items.length} productos entre raciones para perros y gatos, alimento de granja, granos, sanidad animal y harinas. Somos La Barraquita, un negocio familiar de Minas (Lavalleja) desde 2002, los únicos avalados por el MGAP en la zona, con envío en el día a todo el Uruguay y venta por mayor y por menor.</p>
  <p class="chips">${Object.values(CATS).map(function(c){ return `<a href="/catalogo/${c.slug}/">${c.label}</a>`; }).join(" ")}</p>
</section>
${Object.keys(CATS).map(function(key){
  const c = CATS[key];
  const lista = porCat[key] || [];
  return `<section class="wrap bloque" id="${c.slug}">
  <h2 class="display"><a href="/catalogo/${c.slug}/">${esc(c.label)}</a> <span class="n">${lista.length}</span></h2>
  <ul class="grid">
    ${lista.map(card).join("\n    ")}
  </ul>
</section>`;
}).join("\n")}
`;
  write("catalogo/index.html", layout({
    title: `Catálogo de raciones y alimento balanceado | La Barraquita`,
    ogTitle: "Catálogo completo con precios — La Barraquita",
    desc: `Catálogo completo de La Barraquita: ${items.length} productos con precio — raciones para perros y gatos, granja, granos, sanidad y harinas. Minas, Lavalleja. Envío en el día a todo el país. WhatsApp ${TEL_WA}.`,
    url: "/catalogo/",
    crumbs: crumbs,
    jsonld: { "@context":"https://schema.org", "@graph":[
      {
        "@type": "CollectionPage",
        "@id": SITE + "/catalogo/#pagina",
        "name": "Catálogo de La Barraquita",
        "isPartOf": { "@id": SITE + "/#sitio" },
        "about": NEGOCIO,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": items.length,
          "itemListElement": items.map(function(it, i){
            return { "@type":"ListItem", "position": i + 1, "url": SITE + it.url, "name": it.titulo };
          })
        }
      },
      breadcrumbLD(crumbs)
    ] },
    body: body
  }));
}

/* ── 8. Páginas de marca ──────────────────────────────────────────── */
marcas.forEach(function(m){
  const crumbs = [ { n:"Inicio", u:"/" }, { n:"Catálogo", u:"/catalogo/" }, { n:m.nombre, u:m.url } ];
  const cats = [...new Set(m.items.map(function(i){ return i.cat_label; }))];
  const body = `
<section class="wrap encabezado">
  <p class="eyebrow">Marca</p>
  <h1 class="display">${esc(m.nombre)} en Minas y todo Uruguay</h1>
  <p class="lead">Todas las presentaciones de <b>${esc(m.nombre)}</b> que tenemos en stock, con precio actualizado. ${cats.length === 1 ? "Línea de " + cats[0].toLowerCase() + "." : "Líneas de " + cats.join(" y ").toLowerCase() + "."} Comprala en La Barraquita, Intendente Lois 523, Minas (Lavalleja), con envío en el día a todo el país y venta por mayor y por menor.</p>
  <p class="conteo">${m.items.length} presentaciones disponibles</p>
</section>

<section class="wrap bloque">
  <ul class="grid">
    ${m.items.map(card).join("\n    ")}
  </ul>
</section>

<section class="wrap bloque">
  <h2 class="display">¿Necesitás asesoramiento?</h2>
  <p>Escribinos al WhatsApp <a href="${waHref("Hola La Barraquita! Quiero consultar por " + m.nombre + ".")}" target="_blank" rel="noopener"><b>${TEL_WA}</b></a> y te ayudamos a elegir la presentación y la fórmula que mejor le va a tu animal. Si comprás cantidad, pedinos la lista mayorista.</p>
  <p><a class="link-mas" href="/catalogo/">Ver el catálogo completo →</a></p>
</section>
`;
  write("marcas/" + m.slug + "/index.html", layout({
    title: `${m.nombre}: precios y presentaciones | La Barraquita`,
    ogTitle: `${m.nombre} — precios en La Barraquita`,
    desc: `${m.nombre} en La Barraquita, Minas (Lavalleja): ${m.items.length} presentaciones con precio actualizado. Envío en el día a todo el Uruguay, por mayor y por menor. WhatsApp ${TEL_WA}.`,
    url: m.url,
    crumbs: crumbs,
    jsonld: { "@context":"https://schema.org", "@graph":[
      {
        "@type": "CollectionPage",
        "@id": SITE + m.url + "#pagina",
        "name": m.nombre + " — La Barraquita",
        "isPartOf": { "@id": SITE + "/#sitio" },
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": m.items.length,
          "itemListElement": m.items.map(function(it, i){
            return { "@type":"ListItem", "position": i + 1, "url": SITE + it.url, "name": it.titulo };
          })
        }
      },
      breadcrumbLD(crumbs)
    ] },
    body: body
  }));
});

/* ── 9. Sitemap ───────────────────────────────────────────────────── */
{
  const urls = [
    { loc:"/", prio:"1.0", freq:"weekly", img:"/img/og-cover.jpg" },
    { loc:"/catalogo/", prio:"0.9", freq:"weekly" },
    ...Object.values(CATS).map(function(c){ return { loc:"/catalogo/" + c.slug + "/", prio:"0.8", freq:"weekly" }; }),
    ...marcas.map(function(m){ return { loc:m.url, prio:"0.7", freq:"weekly" }; }),
    ...items.map(function(it){ return { loc:it.url, prio:"0.6", freq:"weekly", img:it.img }; })
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(function(u){
  return `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${HOY}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.prio}</priority>${u.img ? `
    <image:image><image:loc>${SITE}${u.img}</image:loc></image:image>` : ""}
  </url>`;
}).join("\n")}
</urlset>
`;
  write("sitemap.xml", xml);
}

/* ── 10. Mapa de rutas para el catálogo dinámico ──────────────────── */
{
  const mapa = {};
  items.forEach(function(it){ mapa[it.id] = it.url; });
  const cats = {};
  Object.keys(CATS).forEach(function(k){ cats[k] = "/catalogo/" + CATS[k].slug + "/"; });
  const js = `/* Generado por tools/build-seo.mjs — no editar a mano.
   Mapa id de producto → URL de su ficha estática, para que las tarjetas
   del catálogo sean enlaces rastreables por Google. */
window.LB_RUTAS = ${JSON.stringify(mapa)};
window.LB_CATS = ${JSON.stringify(cats)};
`;
  write("js/rutas.js", js);
}

/* ── 11. Resumen ──────────────────────────────────────────────────── */
console.log("Fichas de producto : " + items.length);
console.log("Categorías         : " + Object.keys(CATS).length);
console.log("Marcas             : " + marcas.length + " (" + marcas.map(function(m){ return m.nombre + "×" + m.items.length; }).join(", ") + ")");
console.log("URLs en sitemap    : " + (2 + Object.keys(CATS).length + marcas.length + items.length));
