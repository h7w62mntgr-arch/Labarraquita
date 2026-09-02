/*  Guías — se publican en /guias/<slug>/ con schema Article y en el índice /guias/.
 *  El campo "cuerpo" es HTML. Los links a productos usan las URLs de las fichas.
 *  Editar acá y volver a correr:  node tools/build-seo.mjs
 */
export default [
  {
    slug: "cuanta-racion-darle-a-un-perro-por-dia",
    titulo: "¿Cuánta ración darle a un perro por día?",
    desc: "Cómo calcular la cantidad diaria de ración según el peso, la edad y la actividad de tu perro, cuántas veces al día servirla y cuánto te dura una bolsa.",
    fecha: "2026-09-02",
    cuerpo: `
<p>La pregunta que más nos hacen en el mostrador. La respuesta corta: <b>mirá la tabla del envase</b>. Cada marca formula distinto y esa tabla está calculada para esa ración. Lo que sigue te sirve para entenderla y ajustarla a tu perro.</p>

<h2>Lo que determina la cantidad</h2>
<ul>
  <li><b>Peso</b>: es la referencia principal de todas las tablas.</li>
  <li><b>Edad</b>: los cachorros comen proporcionalmente más que los adultos; los senior, algo menos.</li>
  <li><b>Actividad</b>: un perro de campo o que corre todos los días necesita más que uno de apartamento.</li>
  <li><b>Castración</b>: baja el gasto de energía; suele convenir reducir un poco la porción o pasar a una línea light.</li>
  <li><b>Tipo de ración</b>: una premium es más concentrada, así que la porción es menor que en una económica.</li>
</ul>

<h2>Valores orientativos para un adulto</h2>
<p>Como referencia general para una ración estándar de mantenimiento (la tabla de tu bolsa manda):</p>
<table class="tabla">
  <thead><tr><th>Peso del perro</th><th>Ración por día (aprox.)</th></tr></thead>
  <tbody>
    <tr><td>5 kg</td><td>80 – 120 g</td></tr>
    <tr><td>10 kg</td><td>150 – 200 g</td></tr>
    <tr><td>20 kg</td><td>250 – 350 g</td></tr>
    <tr><td>30 kg</td><td>350 – 450 g</td></tr>
    <tr><td>40 kg</td><td>450 – 550 g</td></tr>
  </tbody>
</table>
<p>Una taza de té llena son unos 100 g de croqueta. Lo mejor es pesarla una vez y después usar siempre la misma medida.</p>

<h2>¿Cuántas veces al día?</h2>
<ul>
  <li><b>Cachorros hasta 4 meses</b>: 3 o 4 comidas.</li>
  <li><b>De 4 meses a 1 año</b>: 2 o 3 comidas.</li>
  <li><b>Adultos</b>: 2 comidas, mañana y tarde. Una sola comida grande carga el estómago, sobre todo en razas grandes.</li>
</ul>

<h2>¿Está en su peso?</h2>
<p>Con las manos apoyadas en los costados tenés que <b>sentir las costillas sin apretar</b>, pero no verlas. Visto desde arriba, se nota la cintura. Si se pierde la cintura, bajá un 10 % la porción; si se marcan las costillas, subila. Ajustá de a poco y esperá dos semanas para ver el cambio.</p>

<h2>Cambio de ración</h2>
<p>Al pasar de una marca a otra, mezclalas durante unos 7 días aumentando la nueva de a poco. Evita diarreas y rechazos.</p>

<h2>¿Cuánto me dura una bolsa?</h2>
<p>Dividís los kilos de la bolsa por lo que come por día. Ejemplo: un perro de 20 kg que come 300 g por día con una bolsa de 15 kg → 15.000 / 300 = <b>50 días</b>. Con las presentaciones con kilos de regalo (15 kg + 2 kg, 25 kg + 7 kg) el precio por día baja bastante: mirá el <a href="/catalogo/perros/">catálogo de perros</a> y comparalo.</p>

<p>¿Dudas sobre qué línea le conviene? Leé <a href="/guias/que-racion-elegir-adulto-cachorro-senior-light/">qué ración elegir según edad y tamaño</a> o escribinos por WhatsApp.</p>
`
  },
  {
    slug: "que-racion-elegir-adulto-cachorro-senior-light",
    titulo: "Adulto, cachorro, senior, light o razas pequeñas: qué ración elegir",
    desc: "Qué significa cada línea de ración para perros y cómo elegir la correcta según la edad, el tamaño y el estado de tu perro. Con ejemplos del catálogo.",
    fecha: "2026-09-02",
    cuerpo: `
<p>Las marcas dividen sus raciones en líneas porque las necesidades cambian mucho entre un cachorro de 3 meses y un perro de 9 años, o entre un caniche y un ovejero. Elegir la línea correcta importa tanto como elegir la marca.</p>

<h2>Cachorros (hasta 12 meses)</h2>
<p>Más proteína, más energía y calcio y fósforo balanceados para el crecimiento de huesos y músculos. Croqueta más chica. En razas grandes conviene mantenerla hasta los 12–18 meses. Ejemplos: <a href="/catalogo/perros/bravo-baby-10-kg-mas-1-kg/">Bravo Baby</a>, <a href="/catalogo/perros/frost-cachorros-15-kg-mas-2-kg/">Frost Cachorros</a>, <a href="/catalogo/perros/criolla-cachorros-7-kg/">Criolla Cachorros</a>.</p>

<h2>Adultos (1 a 7 años)</h2>
<p>La ración de mantenimiento. Es la que compra la mayoría y donde más variedad hay, desde económicas hasta premium. La diferencia entre una y otra está en la calidad de la proteína, la digestibilidad (menos cantidad de heces) y el cuidado de piel y pelaje. Ejemplos: <a href="/catalogo/perros/astro-adultos-14-kg-mas-3-kg/">Astro Adultos</a>, <a href="/catalogo/perros/old-prince-adulto-15-kg-mas-3-kg/">Old Prince</a>, <a href="/catalogo/perros/connie-adultos-25-kg/">Connie Adultos</a>.</p>

<h2>Senior (mayores de 7 años)</h2>
<p>Menos calorías porque se mueven menos, y agregados para las articulaciones. La croqueta suele ser más blanda o más chica para dientes gastados. Ejemplo: <a href="/catalogo/perros/astro-senior-14-kg-mas-2-kg/">Astro Senior 7+</a>.</p>

<h2>Light</h2>
<p>Para perros con sobrepeso, castrados o muy sedentarios: la misma nutrición con menos grasa y más fibra, para que se llenen comiendo menos calorías. Ejemplos: <a href="/catalogo/perros/bravo-light-15-kg-mas-2-kg/">Bravo Light</a>, <a href="/catalogo/perros/frost-light-razas-pequenas-10-kg/">Frost Light Razas Pequeñas</a>.</p>

<h2>Razas pequeñas</h2>
<p>Los perros chicos tienen el metabolismo más rápido y la boca más chica: croqueta pequeña y ración más concentrada en energía. Ejemplos: <a href="/catalogo/perros/astro-razas-pequenas-7-kg/">Astro Razas Pequeñas</a>, <a href="/catalogo/perros/equilibrio-razas-pequenas-7-5-kg/">Equilibrio Razas Pequeñas</a>, <a href="/catalogo/perros/bravo-razas-pequenas-10-kg-mas-1-kg/">Bravo Razas Pequeñas</a>.</p>

<h2>Razas medianas y grandes</h2>
<p>Croqueta más grande (obliga a masticar) y cuidado de articulaciones, que en perros pesados sufren más. Ejemplos: <a href="/catalogo/perros/frost-razas-grandes-15-kg-mas-2-kg/">Frost Razas Grandes</a>, <a href="/catalogo/perros/equilibrio-razas-medianas-15-kg-mas-3-kg/">Equilibrio Razas Medianas</a>.</p>

<h2>¿Económica, estándar o premium?</h2>
<p>Todas alimentan. La diferencia real: una premium se digiere mejor, así que <b>el perro come menos gramos por día</b> y el precio por día se acerca más de lo que parece mirando la bolsa. Si tenés varios perros o un perro grande, los combos con kilos de regalo (25 kg + 7 kg, 22 kg + 10 kg) son la opción más rendidora. Mirá todo en el <a href="/catalogo/perros/">catálogo de perros</a>.</p>

<p>Y para saber cuánto servir, leé <a href="/guias/cuanta-racion-darle-a-un-perro-por-dia/">cuánta ración darle a un perro por día</a>.</p>
`
  },
  {
    slug: "alimentacion-gallinas-ponedoras",
    titulo: "Cómo alimentar gallinas ponedoras para que pongan más huevos",
    desc: "Las etapas de la gallina ponedora (pollito, recría, postura fase 1 y fase 2), qué ración va en cada una, cuánto comen por día y los errores más comunes.",
    fecha: "2026-09-02",
    cuerpo: `
<p>Una gallina bien alimentada pone casi un huevo por día en su pico de producción. Una mal alimentada pone la mitad, con cáscara fina y se enferma más. La diferencia está casi toda en la ración.</p>

<h2>Las etapas y su ración</h2>
<table class="tabla">
  <thead><tr><th>Etapa</th><th>Edad</th><th>Ración</th></tr></thead>
  <tbody>
    <tr><td>Pollito bebé</td><td>0 a 6 semanas</td><td><a href="/catalogo/granja/pollito-bebe-25-kg/">Iniciador Pollito Bebé</a></td></tr>
    <tr><td>Recría</td><td>6 a 18 semanas</td><td><a href="/catalogo/granja/ponedora-recria-25-kg/">Ponedora Recría</a></td></tr>
    <tr><td>Postura fase 1</td><td>18 a ~40 semanas</td><td><a href="/catalogo/granja/ponedora-granulada-fase-1-25-kg/">Ponedora Fase 1</a></td></tr>
    <tr><td>Postura fase 2</td><td>desde ~40 semanas</td><td><a href="/catalogo/granja/ponedora-granulada-fase-2-25-kg/">Ponedora Fase 2</a> (granulada o <a href="/catalogo/granja/ponedora-molida-fase-2-25-kg/">molida</a>)</td></tr>
  </tbody>
</table>
<p>La fase 1 tiene más proteína para arrancar la postura; la fase 2 baja la proteína y sube el <b>calcio</b>, que es lo que sostiene la cáscara cuando la gallina ya lleva meses poniendo.</p>

<h2>¿Granulada o molida?</h2>
<p>La granulada se desperdicia menos y las gallinas no seleccionan lo que más les gusta. La molida es más barata y funciona bien en comederos que no la dejen volar. Si ves mucha ración en el piso, pasá a granulada.</p>

<h2>Cuánto comen</h2>
<p>Una ponedora adulta come entre <b>110 y 130 g por día</b>. Diez gallinas, unos 1,2 kg diarios: una bolsa de 25 kg dura unas tres semanas. En invierno comen un poco más.</p>

<h2>El maíz: complemento, no reemplazo</h2>
<p>El error más común es darles solo <a href="/catalogo/granos/maiz-quebrado-25-kg/">maíz</a>. El maíz es energía, pero casi no tiene proteína ni calcio, y la postura se cae. Usalo como golosina o para "tirarles" a la tarde, no como base. La base es la ración de postura.</p>

<h2>Lo demás que hace la diferencia</h2>
<ul>
  <li><b>Agua limpia siempre</b>: un huevo es 75 % agua. Sin agua, no hay huevos.</li>
  <li><b>Luz</b>: necesitan 14 a 16 horas de luz por día. En invierno una lámpara de baja potencia en el gallinero mantiene la postura.</li>
  <li><b>Calcio extra</b>: cáscara de huevo molida o conchilla a disposición, aparte de la ración.</li>
  <li><b>Sombra y ventilación</b> en verano: el calor corta la postura.</li>
</ul>

<p>Tenemos todas las raciones de la línea en el <a href="/catalogo/granja/">catálogo de granja</a>, en bolsas de 25 kg con precio mayorista. Somos los únicos avalados por el MGAP en la zona.</p>
`
  },
  {
    slug: "harina-000-vs-0000-cual-usar",
    titulo: "Harina 000 vs 0000: cuál usar para pan, pizza y pastelería",
    desc: "Qué significan los ceros de la harina de trigo, la diferencia entre 00, 000, 0000 e integral, y cuál conviene para cada preparación.",
    fecha: "2026-09-02",
    cuerpo: `
<p>Los ceros de la harina no son una marca ni una calidad: indican el <b>grado de refinamiento</b>. Cuantos más ceros, más tamizada está la harina: más blanca, más fina y con menos salvado.</p>

<h2>Cada tipo y para qué sirve</h2>
<table class="tabla">
  <thead><tr><th>Harina</th><th>Cómo es</th><th>Para qué</th></tr></thead>
  <tbody>
    <tr><td><a href="/catalogo/harinas/harina-de-trigo-0000-25-kg/">0000</a></td><td>La más refinada y blanca, casi sin salvado. Gluten más débil.</td><td>Pastelería, bizcochuelos, masas finas, pastas frescas, pizza a la piedra.</td></tr>
    <tr><td><a href="/catalogo/harinas/harina-de-trigo-000-25-kg/">000</a></td><td>Refinada, con más gluten que la 0000: absorbe más agua y leva mejor.</td><td>Pan, facturas, pizza al molde, masas con levadura en general.</td></tr>
    <tr><td><a href="/catalogo/harinas/harina-de-trigo-00-25-kg/">00</a></td><td>Menos refinada, algo de salvado, sabor más rústico.</td><td>Panes de campo, galleta, masas más firmes.</td></tr>
    <tr><td><a href="/catalogo/harinas/harina-de-trigo-integral-25-kg/">Integral</a></td><td>Con el salvado y el germen del grano. Más fibra, leva menos.</td><td>Pan integral, galletas, mezclada con 000 para que leve.</td></tr>
  </tbody>
</table>

<h2>La regla práctica</h2>
<ul>
  <li>Si lleva <b>levadura</b> → 000.</li>
  <li>Si lleva <b>polvo de hornear</b> o es masa fina → 0000.</li>
  <li>Si querés sabor rústico o más fibra → 00 o integral, mezclada con 000.</li>
</ul>

<h2>Bolsa de 25 kg o pack de 1 kg</h2>
<p>Para panaderías, pizzerías y cocinas profesionales la <b>bolsa de 25 kg</b> es lo que conviene por precio. Para almacenes y comercios que revenden, tenemos <a href="/catalogo/harinas/harina-uruguay-0000-pack-12-uds/">Harina Uruguay 0000</a> y <a href="/catalogo/harinas/harina-primor-0000-pack-12-uds/">Harina Primor 0000</a> en packs de 12 paquetes de 1 kg.</p>

<p>Todas las harinas se venden en dólares al precio mayorista, con envío en el día en Minas y a todo el país. Mirá el <a href="/catalogo/harinas/">catálogo de harinas</a> o pedí la lista por WhatsApp.</p>
`
  }
];
