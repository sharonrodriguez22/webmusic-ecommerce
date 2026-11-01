/**
 * WebMusic — E-commerce de Instrumentos Musicales
 * Main application logic
 * TP1 PPI · IFTS N.º 18 · Sprint 1 & 2
 *
 * Implemented User Stories:
 *   HU 01 — User registration
 *   HU 02 — User login
 *   HU 03 — Password recovery
 *   HU 04 — Product catalog
 *   HU 05 — Category filters
 *   HU 06 — Product search (real-time)
 *   HU 07 — Product detail (modal)
 *   HU 08 — Stock management (visible)
 *   HU 09 — Shopping cart (sidebar)
 *   HU 10 — Checkout & payment simulation
 *   HU 14 — Order history (customer)
 *   HU 15 — Order management (admin)
 *   HU 16 — Sales report (admin)
 *   HU 17 — Customer report (admin)
 *   HU 18 — Dashboard (admin)
 */

// ===== PRODUCT DATA (API / database simulation) =====

const products = [
  { id: 1, name: "Guitarra Acústica Folk", cat: "guitarras", img: "https://images.pexels.com/photos/6145550/pexels-photo-6145550.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Yamaha", price: 189990, stock: 12, desc: "Guitarra acústica con tapa de abeto, aros y fondo de meranti. Sonido cálido y equilibrado, ideal para principiantes y músicos intermedios.", sku: "WM-GA-001" },
  { id: 2, name: "Guitarra Eléctrica Stratocaster", cat: "guitarras", img: "https://images.pexels.com/photos/229039/pexels-photo-229039.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Fender", price: 459990, stock: 5, desc: "Clásica Stratocaster con tres micrófonos single-coil, mástil de arce y cuerpo de aliso. Versatilidad total para cualquier estilo.", sku: "WM-GE-002" },
  { id: 3, name: "Guitarra Clásica Española", cat: "guitarras", img: "https://images.pexels.com/photos/258288/pexels-photo-258288.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Alhambra", price: 249990, stock: 8, desc: "Guitarra clásica con cuerdas de nylon, tapa de cedro macizo. Perfecta para estudios de conservatorio y repertorio clásico.", sku: "WM-GC-003" },
  { id: 4, name: "Bajo Eléctrico Jazz Bass", cat: "bajos", img: "https://images.pexels.com/photos/96380/pexels-photo-96380.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Fender", price: 389990, stock: 4, desc: "Jazz Bass de 4 cuerdas con dos micrófonos single-coil y mástil de arce. Sonido definido y versátil para todos los géneros.", sku: "WM-BE-004" },
  { id: 5, name: "Bajo Eléctrico 5 Cuerdas", cat: "bajos", img: "https://images.pexels.com/photos/713126/pexels-photo-713126.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Ibanez", price: 329990, stock: 3, desc: "Bajo de 5 cuerdas con cuerpo de caoba, electrónica activa y mástil delgado. Rango extendido para grooves profundos.", sku: "WM-BE-005" },
  { id: 6, name: "Teclado Sintetizador 61 Teclas", cat: "teclados", img: "https://images.pexels.com/photos/4077324/pexels-photo-4077324.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Roland", price: 549990, stock: 6, desc: "Sintetizador con motor de síntesis analógica virtual, 61 teclas sensibles al tacto y más de 500 sonidos presets.", sku: "WM-TS-006" },
  { id: 7, name: "Piano Digital 88 Teclas", cat: "teclados", img: "https://images.pexels.com/photos/164790/pexels-photo-164790.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Kawai", price: 879990, stock: 2, desc: "Piano digital con teclas de madera contrapesadas, muestreo de piano de cola Shigeru Kawai y sistema de altavoces integrado.", sku: "WM-PD-007" },
  { id: 8, name: "Controlador MIDI 49 Teclas", cat: "teclados", img: "https://images.pexels.com/photos/7521283/pexels-photo-7521283.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Akai", price: 149990, stock: 15, desc: "Controlador MIDI USB con 49 teclas semi-pesadas, 8 pads sensibles a la velocidad y 8 knobs asignables.", sku: "WM-CM-008" },
  { id: 9, name: "Batería Acústica Completa", cat: "baterias", img: "https://images.pexels.com/photos/5650534/pexels-photo-5650534.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Pearl", price: 749990, stock: 3, desc: "Set completo de 5 piezas: bombo 22\", redoblante 14\", toms 10\" y 12\", tom de piso 16\". Incluye herrajes y platillos.", sku: "WM-BA-009" },
  { id: 10, name: "Batería Electrónica", cat: "baterias", img: "https://images.pexels.com/photos/237464/pexels-photo-237464.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Roland", price: 599990, stock: 4, desc: "Kit electrónico con pads de malla, módulo con 300+ sonidos, conectividad Bluetooth y salida para auriculares.", sku: "WM-BE-010" },
  { id: 11, name: "Saxofón Alto", cat: "viento", img: "https://images.pexels.com/photos/359995/pexels-photo-359995.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Yamaha", price: 679990, stock: 2, desc: "Saxofón alto en Eb con acabado lacado dorado, mecanismo preciso y excelente respuesta en todos los registros.", sku: "WM-SA-011" },
  { id: 12, name: "Trompeta en Bb", cat: "viento", img: "https://images.pexels.com/photos/12266891/pexels-photo-12266891.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Bach", price: 349990, stock: 5, desc: "Trompeta en Bb con campana de latón amarillo, acabado plateado y boquilla Bach 7C incluida.", sku: "WM-TR-012" },
  { id: 13, name: "Flauta Traversa", cat: "viento", img: "https://images.pexels.com/photos/6672717/pexels-photo-6672717.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Pearl", price: 289990, stock: 7, desc: "Flauta traversa en Do con cabeza de plata maciza, mecanismo offset G y llaves de níquel-plata.", sku: "WM-FT-013" },
  { id: 14, name: "Interfaz de Audio USB", cat: "audio", img: "https://images.pexels.com/photos/8198136/pexels-photo-8198136.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Focusrite", price: 179990, stock: 10, desc: "Interfaz de audio 2 entradas / 2 salidas con preamplificadores Scarlett, conversión 24-bit/192kHz y latencia ultra baja.", sku: "WM-IA-014" },
  { id: 15, name: "Micrófono Condensador", cat: "audio", img: "https://images.pexels.com/photos/347700/pexels-photo-347700.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Audio-Technica", price: 129990, stock: 14, desc: "Micrófono de condensador cardioide ideal para grabación vocal y de instrumentos acústicos en estudio.", sku: "WM-MC-015" },
  { id: 16, name: "Auriculares de Estudio", cat: "audio", img: "https://images.pexels.com/photos/8414344/pexels-photo-8414344.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Beyerdynamic", price: 219990, stock: 8, desc: "Auriculares de estudio cerrados con driver de 45mm, respuesta plana y almohadillas de velour para sesiones largas.", sku: "WM-AE-016" },
  { id: 17, name: "Monitor de Estudio (par)", cat: "audio", img: "https://images.pexels.com/photos/5650548/pexels-photo-5650548.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "KRK", price: 349990, stock: 6, desc: "Par de monitores activos de 5\" con tweeter de 1\", respuesta en frecuencia 43Hz-40kHz y ajustes de room EQ.", sku: "WM-ME-017" },
  { id: 18, name: "Set de Cuerdas Guitarra Acústica", cat: "accesorios", img: "https://images.pexels.com/photos/17601242/pexels-photo-17601242.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "D'Addario", price: 8990, stock: 50, desc: "Juego de 6 cuerdas de bronce fosforado calibre .012-.053. Tono brillante y cálido con excelente durabilidad.", sku: "WM-CG-018" },
  { id: 19, name: "Afinador Cromático Clip", cat: "accesorios", img: "https://images.pexels.com/photos/9597235/pexels-photo-9597235.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Korg", price: 12990, stock: 30, desc: "Afinador de clip con pantalla a color, detección rápida y precisa. Compatible con guitarra, bajo, ukelele y vientos.", sku: "WM-AF-019" },
  { id: 20, name: "Pedalera Multiefectos", cat: "accesorios", img: "https://images.pexels.com/photos/3355317/pexels-photo-3355317.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Boss", price: 289990, stock: 0, desc: "Pedalera multiefectos con 150+ efectos, looper de 60 segundos, afinador integrado y conectividad USB.", sku: "WM-PM-020" },
  { id: 21, name: "Soporte de Guitarra Doble", cat: "accesorios", img: "https://images.pexels.com/photos/164736/pexels-photo-164736.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Hercules", price: 24990, stock: 20, desc: "Soporte plegable para dos guitarras con protección de goma SFF en todos los puntos de contacto.", sku: "WM-SG-021" },
  { id: 22, name: "Cable de Instrumento 3m", cat: "accesorios", img: "https://images.pexels.com/photos/5280440/pexels-photo-5280440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Mogami", price: 15990, stock: 35, desc: "Cable de instrumento profesional de 3 metros con conectores Neutrik dorados y blindaje cuádruple.", sku: "WM-CI-022" },
  { id: 23, name: "Ukelele Soprano Caoba", cat: "guitarras", img: "https://images.pexels.com/photos/7576399/pexels-photo-7576399.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Kala", price: 59990, stock: 18, desc: "Ukelele soprano con cuerpo de caoba, diapasón de nogal y cuerdas Aquila. Sonido dulce y cálido.", sku: "WM-UK-023" },
  { id: 24, name: "Cajón Peruano", cat: "baterias", img: "https://images.pexels.com/photos/5648529/pexels-photo-5648529.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", brand: "Meinl", price: 89990, stock: 9, desc: "Cajón flamenco de abedul báltico con cuerdas de guitarra internas para efecto de caja. Acabado natural.", sku: "WM-CP-024" },
];

// ===== CATEGORY NAMES =====

const catNames = {
  guitarras: "Guitarras",
  bajos: "Bajos",
  teclados: "Teclados",
  baterias: "Baterías",
  viento: "Viento",
  audio: "Audio",
  accesorios: "Accesorios",
};

// ===== EXTENDED PRODUCT DATA (post-survey improvements) =====

const productSpecs = {
  1: { "Tipo": "Acústica Folk", "Tapa": "Abeto", "Aros/Fondo": "Meranti", "Cuerdas": "Acero", "Trastes": "20", "Escala": "648 mm" },
  2: { "Tipo": "Eléctrica Stratocaster", "Cuerpo": "Aliso", "Mástil": "Arce", "Mics": "3× Single-coil", "Trastes": "22", "Escala": "648 mm" },
  3: { "Tipo": "Clásica Española", "Tapa": "Cedro macizo", "Cuerdas": "Nylon", "Diapasón": "Palisandro", "Trastes": "19", "Escala": "650 mm" },
  4: { "Tipo": "Jazz Bass 4 cuerdas", "Cuerpo": "Aliso", "Mástil": "Arce", "Mics": "2× Single-coil", "Trastes": "20", "Escala": "864 mm" },
  5: { "Tipo": "Bajo 5 cuerdas", "Cuerpo": "Caoba", "Electrónica": "Activa", "Mástil": "Arce/Nogal", "Trastes": "24", "Escala": "864 mm" },
  6: { "Tipo": "Sintetizador", "Teclas": "61 sensibles", "Motor": "Analog Virtual", "Presets": "500+", "Polifonía": "128 voces", "Peso": "6.5 kg" },
  7: { "Tipo": "Piano Digital", "Teclas": "88 contrapesadas", "Tecnología": "SK-EX Sampling", "Polifonía": "256 voces", "Altavoces": "4× integrados", "Peso": "36 kg" },
  8: { "Tipo": "Controlador MIDI", "Teclas": "49 semi-pesadas", "Pads": "8 sensibles", "Knobs": "8 asignables", "Conexión": "USB-C", "Peso": "1.8 kg" },
  9: { "Tipo": "Acústica 5 piezas", "Bombo": "22\"", "Redoblante": "14\"", "Toms": "10\" y 12\"", "Tom de piso": "16\"", "Material": "Abedul/Álamo" },
  10: { "Tipo": "Electrónica", "Pads": "Malla", "Módulo": "300+ sonidos", "Bluetooth": "Sí", "Salida": "Auriculares + Línea", "Peso": "22 kg" },
  11: { "Tipo": "Alto en Eb", "Acabado": "Lacado dorado", "Boquilla": "Incluida", "Registro": "Bb3 – F#6", "Material": "Latón", "Peso": "2.4 kg" },
  12: { "Tipo": "Trompeta en Bb", "Campana": "Latón amarillo", "Acabado": "Plateado", "Boquilla": "Bach 7C", "Válvulas": "3 pistones", "Peso": "1.1 kg" },
  13: { "Tipo": "Traversa en Do", "Cabeza": "Plata maciza", "Mecanismo": "Offset G", "Llaves": "Níquel-plata", "Sistema": "Boehm", "Peso": "0.45 kg" },
  14: { "Tipo": "Interfaz USB", "Entradas": "2 (XLR/TRS)", "Salidas": "2 (TRS)", "Resolución": "24-bit/192kHz", "Preamplificador": "Scarlett", "Latencia": "Ultra baja" },
  15: { "Tipo": "Condensador", "Patrón": "Cardioide", "Rango": "20Hz–20kHz", "Sensibilidad": "-37 dB", "Conector": "XLR", "Peso": "0.34 kg" },
  16: { "Tipo": "Cerrado circumaural", "Driver": "45 mm", "Impedancia": "80 Ω", "Respuesta": "5Hz–35kHz", "Almohadillas": "Velour", "Peso": "0.27 kg" },
  17: { "Tipo": "Monitor activo", "Woofer": "5\"", "Tweeter": "1\"", "Respuesta": "43Hz–40kHz", "Potencia": "50W bi-amp", "EQ": "Room adjust" },
  18: { "Tipo": "Bronce fosforado", "Calibre": ".012–.053", "Cuerdas": "6", "Material": "Fósforo bronce", "Coating": "Sin", "Durabilidad": "Media-alta" },
  19: { "Tipo": "Clip cromático", "Pantalla": "Color LCD", "Rango": "A0–C8", "Precisión": "±1 cent", "Batería": "CR2032", "Compatibilidad": "Guitarra/Bajo/Uke/Viento" },
  20: { "Tipo": "Multiefectos", "Efectos": "150+", "Looper": "60 seg", "Afinador": "Integrado", "Conexión": "USB", "Alimentación": "4× AA o adaptador" },
  21: { "Tipo": "Soporte doble", "Material": "Acero", "Protección": "Goma SFF", "Plegable": "Sí", "Capacidad": "2 guitarras", "Peso": "1.6 kg" },
  22: { "Tipo": "Instrumento TS", "Largo": "3 metros", "Conectores": "Neutrik dorados", "Blindaje": "Cuádruple", "Diámetro": "6.3 mm", "Garantía": "Lifetime" },
  23: { "Tipo": "Soprano", "Cuerpo": "Caoba", "Diapasón": "Nogal", "Cuerdas": "Aquila Nylgut", "Trastes": "12", "Escala": "346 mm" },
  24: { "Tipo": "Flamenco", "Material": "Abedul báltico", "Cuerdas internas": "Guitarra", "Acabado": "Natural", "Tapa": "Resonante", "Peso": "3.2 kg" },
};

const productReviews = {
  1: [
    { author: "María G.", rating: 5, date: "2026-09-15", text: "Excelente sonido para el precio. La recomiendo para empezar." },
    { author: "Carlos R.", rating: 4, date: "2026-09-20", text: "Buena calidad, aunque las cuerdas de fábrica podrían ser mejores." },
    { author: "Lucía P.", rating: 5, date: "2026-10-01", text: "Mi hija está encantada. Perfecta para sus clases de guitarra." },
  ],
  2: [
    { author: "Andrés M.", rating: 5, date: "2026-08-10", text: "Versatilidad increíble. Los single-coil suenan brillantes." },
    { author: "Sofía L.", rating: 4, date: "2026-09-05", text: "Gran guitarra, el mástil es muy cómodo para tocar rápido." },
  ],
  4: [
    { author: "Tomás V.", rating: 5, date: "2026-10-12", text: "El Jazz Bass clásico. Sonido definido y presencia en la mezcla." },
    { author: "Daniela F.", rating: 4, date: "2026-09-28", text: "Excelente para funk y jazz. Muy bien terminado." },
  ],
  6: [
    { author: "Nicolás P.", rating: 5, date: "2026-10-05", text: "Los sonidos analógicos son impresionantes. Ideal para producción." },
    { author: "Valentina S.", rating: 4, date: "2026-09-18", text: "Muchas posibilidades, la curva de aprendizaje vale la pena." },
  ],
  7: [
    { author: "Eduardo S.", rating: 5, date: "2026-10-10", text: "Las teclas de madera se sienten como un piano real. Increíble." },
    { author: "Ana M.", rating: 5, date: "2026-09-22", text: "El mejor piano digital en este rango de precio. Sonido sublime." },
  ],
  9: [
    { author: "Martín R.", rating: 4, date: "2026-10-08", text: "Muy completa para el precio. Los platillos son decentes." },
  ],
  14: [
    { author: "Germán K.", rating: 5, date: "2026-10-15", text: "Latencia imperceptible. Los preamplificadores son cristalinos." },
    { author: "Sharon R.", rating: 4, date: "2026-10-18", text: "Perfecta para home studio. Fácil de configurar con cualquier DAW." },
  ],
  15: [
    { author: "Julieta N.", rating: 5, date: "2026-10-02", text: "Capta cada detalle de la voz. Relación calidad-precio imbatible." },
  ],
};

const productAudio = {
  1: "Guitarra acústica — muestra de fingerpicking",
  2: "Guitarra eléctrica — clean & overdrive",
  3: "Guitarra clásica — estudio de Tárrega",
  4: "Jazz Bass — línea de walking bass",
  6: "Sintetizador — pad atmosférico",
  7: "Piano digital — fragmento de Chopin",
  11: "Saxofón alto — fraseo de jazz",
  12: "Trompeta — fanfarria en Bb",
  24: "Cajón — patrón flamenco",
};

const productVideo = {
  1: "https://www.youtube.com/results?search_query=yamaha+folk+guitar+demo",
  2: "https://www.youtube.com/results?search_query=fender+stratocaster+demo",
  7: "https://www.youtube.com/results?search_query=kawai+digital+piano+demo",
  9: "https://www.youtube.com/results?search_query=pearl+drum+set+demo",
  10: "https://www.youtube.com/results?search_query=roland+electronic+drums+demo",
  14: "https://www.youtube.com/results?search_query=focusrite+scarlett+demo",
};

// ===================================================================
//  MAIN — fires when DOM is ready
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {

  // ===== DOM REFERENCES (cached) =====

  const $productGrid   = document.getElementById("productGrid");
  const $noResults     = document.getElementById("noResults");
  const $productCount  = document.getElementById("productCount");
  const $searchInput   = document.getElementById("searchInput");
  const $catNav        = document.getElementById("catNav");
  const $modalOverlay  = document.getElementById("modalOverlay");
  const $modalImg      = document.getElementById("modalImg");
  const $modalCategory = document.getElementById("modalCategory");
  const $modalName     = document.getElementById("modalName");
  const $modalDesc     = document.getElementById("modalDesc");
  const $modalPrice    = document.getElementById("modalPrice");
  const $modalStock    = document.getElementById("modalStock");
  const $modalBrand    = document.getElementById("modalBrand");
  const $modalSKU      = document.getElementById("modalSKU");
  const $qtyVal        = document.getElementById("qtyVal");
  const $qtyMinus      = document.getElementById("qtyMinus");
  const $qtyPlus       = document.getElementById("qtyPlus");
  const $modalAddCart   = document.getElementById("modalAddCart");
  const $cartCount     = document.getElementById("cartCount");
  const $toast         = document.getElementById("toast");

  // Auth elements
  const $accountBtn     = document.getElementById("accountBtn");
  const $authOverlay    = document.getElementById("authOverlay");
  const $authClose      = document.getElementById("authClose");
  const $loginView      = document.getElementById("loginView");
  const $registerView   = document.getElementById("registerView");
  const $recoveryView   = document.getElementById("recoveryView");
  const $recoverySuccess= document.getElementById("recoverySuccessView");
  const $loginForm      = document.getElementById("loginForm");
  const $registerForm   = document.getElementById("registerForm");
  const $recoveryForm   = document.getElementById("recoveryForm");
  const $userMenu       = document.getElementById("userMenu");
  const $userMenuHeader = document.getElementById("userMenuHeader");

  // Cart sidebar elements
  const $cartBtn       = document.getElementById("cartBtn");
  const $cartOverlay   = document.getElementById("cartOverlay");
  const $cartClose     = document.getElementById("cartClose");
  const $cartItems     = document.getElementById("cartItems");
  const $cartEmpty     = document.getElementById("cartEmpty");
  const $cartFooter    = document.getElementById("cartFooter");
  const $cartSubtotal  = document.getElementById("cartSubtotal");
  const $cartTotal     = document.getElementById("cartTotal");
  const $checkoutBtn   = document.getElementById("checkoutBtn");

  // Checkout elements
  const $checkoutOverlay  = document.getElementById("checkoutOverlay");
  const $checkoutClose    = document.getElementById("checkoutClose");
  const $checkoutForm     = document.getElementById("checkoutForm");
  const $checkoutFormView = document.getElementById("checkoutFormView");
  const $orderConfirmView = document.getElementById("orderConfirmView");
  const $checkoutSummary  = document.getElementById("checkoutSummary");
  const $cardFields       = document.getElementById("cardFields");

  // ===== APPLICATION STATE =====

  let currentCat   = "all";
  let searchTerm   = "";
  let modalQty     = 1;
  let modalProduct = null;

  // Cart — persisted with localStorage
  let cart = JSON.parse(localStorage.getItem("webmusic-cart") || "[]");

  // Auth — persisted with localStorage
  let users = JSON.parse(localStorage.getItem("webmusic-users") || "[]");
  let currentUser = JSON.parse(localStorage.getItem("webmusic-session") || "null");

  // Orders — persisted with localStorage
  let orders = JSON.parse(localStorage.getItem("webmusic-orders") || "[]");

  // Comparator state
  let compareList = [];

  // Audio state
  let currentAudioCtx = null;
  let currentAudioInterval = null;

  // ===== UTILITY FUNCTIONS =====

  /** Format a price in Argentine pesos */
  const formatPrice = (precio) => `$${precio.toLocaleString("es-AR")}`;

  /** Stock label and CSS class (HU 08) */
  const stockLabel = (stock) => {
    if (stock === 0) return { text: "Sin stock", cls: "no-stock" };
    if (stock <= 3) return { text: `Últimas ${stock} un.`, cls: "low-stock" };
    return { text: "En stock", cls: "in-stock" };
  };

  /** Save cart to localStorage */
  const saveCart = () => {
    localStorage.setItem("webmusic-cart", JSON.stringify(cart));
  };

  /** Total items in cart */
  const getCartTotal = () => cart.reduce((acc, item) => acc + item.qty, 0);

  /** Update cart badge in header */
  const updateCartBadge = () => {
    const total = getCartTotal();
    $cartCount.textContent = total;
    $cartCount.hidden = total === 0;
  };

  /** Simple email validation */
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /** Generate order number */
  const generateOrderNumber = () => {
    const num = Math.floor(100000 + Math.random() * 900000);
    return `WM-${num}`;
  };

  // ===== TOAST — Notifications =====

  let toastTimer = null;

  const showToast = (msg) => {
    $toast.textContent = msg;
    $toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $toast.classList.remove("show"), 2500);
  };

  // ===== PRODUCT RENDERING (HU 04) =====

  const renderProducts = () => {
    // Category filter (HU 05)
    let filtered = currentCat === "all"
      ? [...products]
      : products.filter((p) => p.cat === currentCat);

    // Search filter (HU 06)
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(({ name, brand, cat, desc }) =>
        name.toLowerCase().includes(q) ||
        brand.toLowerCase().includes(q) ||
        cat.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q)
      );
    }

    // Update result count
    $productCount.textContent = `${filtered.length} ${filtered.length === 1 ? "producto" : "productos"}`;

    // No results
    if (filtered.length === 0) {
      $productGrid.innerHTML = "";
      $noResults.hidden = false;
      return;
    }

    $noResults.hidden = true;

    // Generate product cards (HU 04 + HU 08 stock badges)
    $productGrid.innerHTML = filtered
      .map((p) => {
        const { text, cls } = stockLabel(p.stock);
        return `
          <div class="product-card" data-id="${p.id}">
            <div class="product-img">
              <span class="stock-badge ${cls}">${text}</span>
              <img src="${p.img}" alt="${p.name}" loading="lazy">
            </div>
            <div class="product-info">
              <div class="product-category">${catNames[p.cat] || p.cat}</div>
              <div class="product-name">${p.name}</div>
              <div class="product-desc">${p.desc}</div>
              <div class="product-bottom">
                <div class="product-price">${formatPrice(p.price)}</div>
                <button class="btn-add" data-add-id="${p.id}" title="Agregar" ${p.stock === 0 ? "disabled" : ""}>+</button>
              </div>
            </div>
          </div>`;
      })
      .join("");
  };

  // ===== EVENTS — Category filter (HU 05) =====

  $catNav.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;

    document.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCat = btn.dataset.cat;
    renderProducts();
  });

  // ===== EVENTS — Real-time search (HU 06) =====

  $searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.trim();
    renderProducts();
  });

  // ===== EVENTS — Grid click (event delegation) =====

  $productGrid.addEventListener("click", (e) => {
    // Quick "Add" button click
    const addBtn = e.target.closest("[data-add-id]");
    if (addBtn) {
      e.stopPropagation();
      const id = parseInt(addBtn.dataset.addId);
      const product = products.find((p) => p.id === id);
      if (product && product.stock > 0) {
        addToCart(product, 1);
      }
      return;
    }

    // Card click → open modal (HU 07)
    const card = e.target.closest(".product-card");
    if (card) {
      const id = parseInt(card.dataset.id);
      openModal(id);
    }
  });

  // ===== MODAL — Product detail (HU 07 + survey enhancements) =====

  const openModal = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    modalProduct = product;
    modalQty = 1;

    const { text, cls } = stockLabel(product.stock);
    const stockColor = cls === "in-stock" ? "green" : cls === "low-stock" ? "orange" : "red";

    // Stop any playing audio
    stopAudio();

    $modalImg.innerHTML = `
      <button class="modal-close" id="modalCloseBtn">✕</button>
      <img src="${product.img}" alt="${product.name}" id="modalMainImg">`;
    $modalCategory.textContent = catNames[product.cat] || product.cat;
    $modalName.textContent = product.name;
    $modalDesc.textContent = product.desc;
    $modalPrice.textContent = formatPrice(product.price);
    $modalStock.innerHTML = `<span style="color:var(--${stockColor})">${text}</span>`;
    $modalBrand.textContent = product.brand;
    $modalSKU.textContent = product.sku;
    $qtyVal.textContent = "1";
    $modalAddCart.disabled = product.stock === 0;
    $modalAddCart.textContent = product.stock === 0 ? "Sin stock" : "🛒 Agregar al carrito";

    // Thumbnails (multi-angle photos)
    const $thumbs = document.getElementById("modalThumbs");
    $thumbs.innerHTML = `<div class="modal-thumb active"><img src="${product.img}" alt="Vista 1"></div>
      <div class="modal-thumb"><img src="${product.img}" alt="Vista 2" style="filter:brightness(1.1)"></div>
      <div class="modal-thumb"><img src="${product.img}" alt="Vista 3" style="filter:saturate(1.3)"></div>`;

    // Audio sample
    const $audio = document.getElementById("audioSample");
    if (productAudio[product.id]) {
      $audio.hidden = false;
      $audio.querySelector(".audio-play-btn").textContent = "▶ " + productAudio[product.id];
      $audio.querySelector(".audio-play-btn").classList.remove("playing");
      $audio.querySelector(".audio-progress").style.width = "0";
    } else {
      $audio.hidden = true;
    }

    // Video link
    const $video = document.getElementById("videoLink");
    if (productVideo[product.id]) {
      $video.hidden = false;
      $video.innerHTML = `<a href="${productVideo[product.id]}" target="_blank" rel="noopener">🎬 Ver video demostrativo →</a>`;
    } else {
      $video.hidden = true;
    }

    // Technical specs
    const $specs = document.getElementById("specsSection");
    const specs = productSpecs[product.id];
    if (specs) {
      $specs.hidden = false;
      $specs.innerHTML = `<div class="specs-title">Especificaciones técnicas</div>
        <div class="specs-grid">${Object.entries(specs).map(([k, v]) =>
          `<div class="spec-row"><span class="spec-label">${k}</span><span class="spec-value">${v}</span></div>`
        ).join("")}</div>`;
    } else {
      $specs.hidden = true;
    }

    // Compare button state
    const $compareBtn = document.getElementById("modalCompareBtn");
    const isInCompare = compareList.some(c => c.id === product.id);
    $compareBtn.classList.toggle("active", isInCompare);
    $compareBtn.title = isInCompare ? "Quitar del comparador" : "Agregar al comparador";

    // Reviews
    const $reviews = document.getElementById("reviewsSection");
    const reviews = productReviews[product.id];
    if (reviews && reviews.length > 0) {
      const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
      const stars = "★".repeat(Math.round(avg)) + "☆".repeat(5 - Math.round(avg));
      $reviews.innerHTML = `<div class="reviews-title">Reseñas de clientes</div>
        <div class="reviews-summary">
          <span class="reviews-avg">${avg}</span>
          <div><div class="reviews-stars">${stars}</div>
          <div class="reviews-count">${reviews.length} reseña${reviews.length > 1 ? "s" : ""}</div></div>
        </div>
        <div class="reviews-list">${reviews.map(r => {
          const rStars = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
          const rDate = new Date(r.date).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
          return `<div class="review-card">
            <div class="review-header"><span class="review-author">${r.author}</span><span class="review-date">${rDate}</span></div>
            <div class="review-rating">${rStars}</div>
            <div class="review-text">${r.text}</div></div>`;
        }).join("")}</div>`;
    } else {
      $reviews.innerHTML = `<div class="reviews-title">Reseñas de clientes</div>
        <div class="reviews-summary"><span class="reviews-count" style="padding:12px">Aún no hay reseñas para este producto.</span></div>`;
    }

    $modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";

    // Dynamic close button listener
    document.getElementById("modalCloseBtn")?.addEventListener("click", closeModal);
  };

  const closeModal = () => {
    $modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
    modalProduct = null;
    stopAudio();
  };

  // Close modal on overlay click
  $modalOverlay.addEventListener("click", (e) => {
    if (e.target === $modalOverlay) closeModal();
  });

  // Close modals with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeAuth();
      closeCartSidebar();
      closeCheckout();
    }
  });

  // Quantity controls
  $qtyMinus.addEventListener("click", () => {
    if (modalQty > 1) {
      modalQty--;
      $qtyVal.textContent = modalQty;
    }
  });

  $qtyPlus.addEventListener("click", () => {
    if (modalProduct && modalQty < modalProduct.stock) {
      modalQty++;
      $qtyVal.textContent = modalQty;
    }
  });

  // Add to cart from modal
  $modalAddCart.addEventListener("click", () => {
    if (modalProduct && modalProduct.stock > 0) {
      addToCart(modalProduct, modalQty);
      closeModal();
    }
  });

  // ===== CART LOGIC — with localStorage persistence =====

  const addToCart = (product, qty = 1) => {
    if (product.stock === 0) return;

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        qty,
      });
    }

    saveCart();
    updateCartBadge();
    showToast(`${qty > 1 ? qty + "× " : ""}${product.name} agregado al carrito`);
  };

  // ===== AUTH SYSTEM (HU 01, 02, 03) =====

  /** Show a specific auth view */
  const showAuthView = (view) => {
    [$loginView, $registerView, $recoveryView, $recoverySuccess].forEach((v) => v.hidden = true);
    view.hidden = false;
    // Clear errors
    document.querySelectorAll(".form-error").forEach((e) => e.textContent = "");
    document.querySelectorAll(".input-error").forEach((e) => e.classList.remove("input-error"));
  };

  /** Open auth modal */
  const openAuth = (view = "login") => {
    closeUserMenu();
    if (view === "register") showAuthView($registerView);
    else if (view === "recovery") showAuthView($recoveryView);
    else showAuthView($loginView);
    $authOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  /** Close auth modal */
  const closeAuth = () => {
    $authOverlay.classList.remove("open");
    document.body.style.overflow = "";
    // Reset forms
    $loginForm.reset();
    $registerForm.reset();
    $recoveryForm.reset();
  };

  /** Update header to reflect login state */
  const updateAuthUI = () => {
    if (currentUser) {
      $accountBtn.classList.add("logged-in");
      $accountBtn.textContent = currentUser.name.charAt(0).toUpperCase();
      $accountBtn.title = `${currentUser.name} ${currentUser.lastName}`;
    } else {
      $accountBtn.classList.remove("logged-in");
      $accountBtn.textContent = "👤";
      $accountBtn.title = "Mi cuenta";
    }
  };

  /** Save session */
  const saveSession = (user) => {
    currentUser = user;
    localStorage.setItem("webmusic-session", JSON.stringify(user));
    updateAuthUI();
  };

  /** Close session */
  const logout = () => {
    currentUser = null;
    localStorage.removeItem("webmusic-session");
    updateAuthUI();
    closeUserMenu();
    showToast("Sesión cerrada");
  };

  // Auth close button
  $authClose.addEventListener("click", closeAuth);
  $authOverlay.addEventListener("click", (e) => {
    if (e.target === $authOverlay) closeAuth();
  });

  // Nav between auth views
  document.getElementById("goToRegister").addEventListener("click", (e) => { e.preventDefault(); showAuthView($registerView); });
  document.getElementById("goToLogin").addEventListener("click", (e) => { e.preventDefault(); showAuthView($loginView); });
  document.getElementById("goToRecovery").addEventListener("click", (e) => { e.preventDefault(); showAuthView($recoveryView); });
  document.getElementById("backToLogin").addEventListener("click", (e) => { e.preventDefault(); showAuthView($loginView); });
  document.getElementById("recoveryBackBtn").addEventListener("click", () => showAuthView($loginView));

  // Account button — show login or user menu
  $accountBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentUser) {
      toggleUserMenu();
    } else {
      openAuth("login");
    }
  });

  // User menu
  const toggleUserMenu = () => {
    if ($userMenu.hidden) {
      const rect = $accountBtn.getBoundingClientRect();
      $userMenu.style.top = (rect.bottom + 8) + "px";
      $userMenu.style.right = (window.innerWidth - rect.right) + "px";
      $userMenuHeader.textContent = `${currentUser.name} ${currentUser.lastName}`;
      $userMenu.hidden = false;
    } else {
      closeUserMenu();
    }
  };

  const closeUserMenu = () => {
    $userMenu.hidden = true;
  };

  document.addEventListener("click", (e) => {
    if (!$userMenu.hidden && !$userMenu.contains(e.target) && e.target !== $accountBtn) {
      closeUserMenu();
    }
  });

  document.getElementById("userMenuLogout").addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });

  // Footer auth links
  document.querySelectorAll(".footer-login-link").forEach((el) => {
    el.addEventListener("click", (e) => { e.preventDefault(); openAuth("login"); });
  });
  document.querySelectorAll(".footer-register-link").forEach((el) => {
    el.addEventListener("click", (e) => { e.preventDefault(); openAuth("register"); });
  });

  // ===== REGISTER FORM (HU 01) =====

  $registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById("regName").value.trim();
    const lastName = document.getElementById("regLastName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirm = document.getElementById("regConfirm").value;

    // Clear errors
    document.querySelectorAll("#registerView .form-error").forEach((el) => el.textContent = "");
    document.querySelectorAll("#registerView .input-error").forEach((el) => el.classList.remove("input-error"));

    if (!name) {
      document.getElementById("regNameError").textContent = "Ingresá tu nombre";
      document.getElementById("regName").classList.add("input-error");
      valid = false;
    }
    if (!lastName) {
      document.getElementById("regLastNameError").textContent = "Ingresá tu apellido";
      document.getElementById("regLastName").classList.add("input-error");
      valid = false;
    }
    if (!email || !isValidEmail(email)) {
      document.getElementById("regEmailError").textContent = "Ingresá un correo válido";
      document.getElementById("regEmail").classList.add("input-error");
      valid = false;
    }
    if (password.length < 6) {
      document.getElementById("regPasswordError").textContent = "Mínimo 6 caracteres";
      document.getElementById("regPassword").classList.add("input-error");
      valid = false;
    }
    if (password !== confirm) {
      document.getElementById("regConfirmError").textContent = "Las contraseñas no coinciden";
      document.getElementById("regConfirm").classList.add("input-error");
      valid = false;
    }

    // Check if email is already registered
    if (valid && users.some((u) => u.email === email)) {
      document.getElementById("regEmailError").textContent = "Este correo ya está registrado";
      document.getElementById("regEmail").classList.add("input-error");
      valid = false;
    }

    if (!valid) return;

    // Create user
    const newUser = { name, lastName, email, password };
    users.push(newUser);
    localStorage.setItem("webmusic-users", JSON.stringify(users));

    // Auto-login
    saveSession({ name, lastName, email });
    closeAuth();
    showToast(`¡Bienvenido/a, ${name}!`);
  });

  // ===== LOGIN FORM (HU 02) =====

  $loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    // Clear errors
    document.querySelectorAll("#loginView .form-error").forEach((el) => el.textContent = "");
    document.querySelectorAll("#loginView .input-error").forEach((el) => el.classList.remove("input-error"));

    if (!email || !isValidEmail(email)) {
      document.getElementById("loginEmailError").textContent = "Ingresá un correo válido";
      document.getElementById("loginEmail").classList.add("input-error");
      valid = false;
    }
    if (!password) {
      document.getElementById("loginPasswordError").textContent = "Ingresá tu contraseña";
      document.getElementById("loginPassword").classList.add("input-error");
      valid = false;
    }

    if (!valid) return;

    // Find user
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      document.getElementById("loginPasswordError").textContent = "Correo o contraseña incorrectos";
      document.getElementById("loginPassword").classList.add("input-error");
      return;
    }

    saveSession({ name: user.name, lastName: user.lastName, email: user.email });
    closeAuth();
    showToast(`¡Hola, ${user.name}!`);
  });

  // ===== PASSWORD RECOVERY FORM (HU 03) =====

  $recoveryForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("recoveryEmail").value.trim();

    // Clear errors
    document.getElementById("recoveryEmailError").textContent = "";
    document.getElementById("recoveryEmail").classList.remove("input-error");

    if (!email || !isValidEmail(email)) {
      document.getElementById("recoveryEmailError").textContent = "Ingresá un correo válido";
      document.getElementById("recoveryEmail").classList.add("input-error");
      return;
    }

    // Simulate sending recovery email (always succeeds — academic prototype)
    showAuthView($recoverySuccess);
  });

  // ===== CART SIDEBAR (HU 09) =====

  /** Open cart sidebar */
  const openCartSidebar = () => {
    renderCartSidebar();
    $cartOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  /** Close cart sidebar */
  const closeCartSidebar = () => {
    $cartOverlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  /** Render cart sidebar content */
  const renderCartSidebar = () => {
    if (cart.length === 0) {
      $cartItems.innerHTML = "";
      $cartEmpty.hidden = false;
      $cartFooter.style.display = "none";
      return;
    }

    $cartEmpty.hidden = true;
    $cartFooter.style.display = "";

    $cartItems.innerHTML = cart
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        const img = product ? product.img : "";
        return `
          <div class="cart-item" data-cart-id="${item.id}">
            <div class="cart-item-img">
              <img src="${img}" alt="${item.name}" loading="lazy">
            </div>
            <div class="cart-item-info">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-price">${formatPrice(item.price)} c/u</div>
              <div class="cart-item-controls">
                <button class="cart-qty-btn" data-cart-minus="${item.id}">−</button>
                <span class="cart-item-qty">${item.qty}</span>
                <button class="cart-qty-btn" data-cart-plus="${item.id}">+</button>
                <button class="cart-item-remove" data-cart-remove="${item.id}">Eliminar</button>
              </div>
            </div>
            <div class="cart-item-subtotal">${formatPrice(item.price * item.qty)}</div>
          </div>`;
      })
      .join("");

    // Update totals
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    $cartSubtotal.textContent = formatPrice(subtotal);
    $cartTotal.textContent = formatPrice(subtotal);
  };

  // Cart button opens sidebar
  $cartBtn.addEventListener("click", openCartSidebar);
  $cartClose.addEventListener("click", closeCartSidebar);
  $cartOverlay.addEventListener("click", (e) => {
    if (e.target === $cartOverlay) closeCartSidebar();
  });

  // Cart item controls (event delegation)
  $cartItems.addEventListener("click", (e) => {
    const minusBtn = e.target.closest("[data-cart-minus]");
    const plusBtn = e.target.closest("[data-cart-plus]");
    const removeBtn = e.target.closest("[data-cart-remove]");

    if (minusBtn) {
      const id = parseInt(minusBtn.dataset.cartMinus);
      const item = cart.find((i) => i.id === id);
      if (item) {
        item.qty--;
        if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
        saveCart();
        updateCartBadge();
        renderCartSidebar();
      }
    }

    if (plusBtn) {
      const id = parseInt(plusBtn.dataset.cartPlus);
      const item = cart.find((i) => i.id === id);
      const product = products.find((p) => p.id === id);
      if (item && product && item.qty < product.stock) {
        item.qty++;
        saveCart();
        updateCartBadge();
        renderCartSidebar();
      }
    }

    if (removeBtn) {
      const id = parseInt(removeBtn.dataset.cartRemove);
      const removed = cart.find((i) => i.id === id);
      cart = cart.filter((i) => i.id !== id);
      saveCart();
      updateCartBadge();
      renderCartSidebar();
      if (removed) showToast(`${removed.name} eliminado del carrito`);
    }
  });

  // ===== CHECKOUT (HU 10) =====

  /** Open checkout modal */
  const openCheckout = () => {
    if (cart.length === 0) return;

    // Must be logged in
    if (!currentUser) {
      closeCartSidebar();
      openAuth("login");
      showToast("Iniciá sesión para finalizar tu compra");
      return;
    }

    closeCartSidebar();

    // Populate checkout form with user data
    const $shipName = document.getElementById("shipName");
    $shipName.value = `${currentUser.name} ${currentUser.lastName}`;

    // Render order summary
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    $checkoutSummary.innerHTML = `
      <h4 class="checkout-section-title" style="margin-top:0">Resumen del pedido</h4>
      ${cart.map((item) => `
        <div class="checkout-summary-item">
          <span>${item.qty}× ${item.name}</span>
          <span>${formatPrice(item.price * item.qty)}</span>
        </div>`).join("")}
      <div class="checkout-summary-item">
        <span>Envío</span>
        <span style="color:var(--green);font-weight:500">Gratis</span>
      </div>
      <div class="checkout-summary-total">
        <span>Total</span>
        <span>${formatPrice(subtotal)}</span>
      </div>`;

    $checkoutFormView.hidden = false;
    $orderConfirmView.hidden = true;
    $checkoutOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  /** Close checkout modal */
  const closeCheckout = () => {
    $checkoutOverlay.classList.remove("open");
    document.body.style.overflow = "";
    $checkoutForm.reset();
  };

  $checkoutBtn.addEventListener("click", openCheckout);
  $checkoutClose.addEventListener("click", closeCheckout);
  $checkoutOverlay.addEventListener("click", (e) => {
    if (e.target === $checkoutOverlay) closeCheckout();
  });

  // Toggle card fields based on payment method
  document.querySelectorAll("input[name='payMethod']").forEach((radio) => {
    radio.addEventListener("change", () => {
      $cardFields.style.display = radio.value === "card" ? "" : "none";
    });
  });

  // Submit checkout
  $checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const deliveryMethod = document.querySelector("input[name='deliveryMethod']:checked")?.value || "shipping";
    const shipName = document.getElementById("shipName").value.trim();
    const shipPhone = document.getElementById("shipPhone").value.trim();
    const shipAddress = document.getElementById("shipAddress")?.value.trim() || "";
    const shipCity = document.getElementById("shipCity")?.value.trim() || "";
    const shipZip = document.getElementById("shipZip")?.value.trim() || "";

    if (deliveryMethod === "shipping" && (!shipName || !shipPhone || !shipAddress || !shipCity || !shipZip)) {
      showToast("Completá todos los campos de envío");
      return;
    }
    if (deliveryMethod === "pickup" && (!shipName || !shipPhone)) {
      showToast("Completá nombre y teléfono");
      return;
    }

    // Simulate payment processing
    const orderNumber = generateOrderNumber();
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const payMethod = document.querySelector("input[name='payMethod']:checked").value;
    const payLabels = { card: "Tarjeta de crédito/débito", transfer: "Transferencia bancaria", mp: "Mercado Pago" };

    // Save order
    const order = {
      orderNumber,
      date: new Date().toISOString(),
      items: [...cart],
      total: subtotal,
      delivery: deliveryMethod,
      shipping: deliveryMethod === "pickup"
        ? { name: shipName, phone: shipPhone, address: "Retiro en local — Av. Corrientes 1234, CABA" }
        : { name: shipName, phone: shipPhone, address: shipAddress, city: shipCity, zip: shipZip },
      payment: payMethod,
      user: currentUser.email,
    };
    orders.push(order);
    localStorage.setItem("webmusic-orders", JSON.stringify(orders));

    // Show confirmation
    document.getElementById("orderNumber").textContent = orderNumber;
    document.getElementById("orderConfirmDetails").innerHTML = `
      <div><strong>Dirección:</strong> ${shipAddress}, ${shipCity} (${shipZip})</div>
      <div><strong>Teléfono:</strong> ${shipPhone}</div>
      <div><strong>Método de pago:</strong> ${payLabels[payMethod]}</div>
      <div><strong>Total:</strong> ${formatPrice(subtotal)}</div>
      <div><strong>Productos:</strong> ${cart.length} (${getCartTotal()} unidades)</div>`;

    $checkoutFormView.hidden = true;
    $orderConfirmView.hidden = false;

    // Clear cart
    cart = [];
    saveCart();
    updateCartBadge();

    showToast("¡Pedido confirmado!");
  });

  // "Keep shopping" button after order
  document.getElementById("orderDoneBtn").addEventListener("click", () => {
    closeCheckout();
  });

  // ===== ORDERS HISTORY (HU 14) =====

  const $ordersOverlay = document.getElementById("ordersOverlay");
  const $ordersClose   = document.getElementById("ordersClose");
  const $ordersList    = document.getElementById("ordersList");
  const $ordersEmpty   = document.getElementById("ordersEmpty");

  const openOrders = () => {
    if (!currentUser) {
      openAuth("login");
      showToast("Iniciá sesión para ver tus pedidos");
      return;
    }
    closeUserMenu();
    renderOrdersHistoryWithTracking();
    $ordersOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeOrders = () => {
    $ordersOverlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  const renderOrdersHistory = () => {
    const userOrders = orders
      .filter((o) => o.user === currentUser.email)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (userOrders.length === 0) {
      $ordersList.innerHTML = "";
      $ordersEmpty.hidden = false;
      return;
    }

    $ordersEmpty.hidden = true;

    $ordersList.innerHTML = userOrders.map((o) => {
      const date = new Date(o.date);
      const dateStr = date.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
      const status = o.status || "pending";
      const statusLabels = { pending: "Pendiente", processing: "En proceso", shipped: "Enviado", delivered: "Entregado", cancelled: "Cancelado" };
      const itemsSummary = o.items.map((i) => `${i.qty}× ${i.name}`).join(", ");

      return `
        <div class="order-card">
          <div class="order-card-header">
            <span class="order-card-number">${o.orderNumber}</span>
            <span class="order-card-date">${dateStr}</span>
          </div>
          <div class="order-card-items">${itemsSummary}</div>
          <div class="order-card-footer">
            <span class="order-card-total">${formatPrice(o.total)}</span>
            <span class="order-status-badge ${status}">${statusLabels[status]}</span>
          </div>
        </div>`;
    }).join("");
  };

  $ordersClose.addEventListener("click", closeOrders);
  $ordersOverlay.addEventListener("click", (e) => {
    if (e.target === $ordersOverlay) closeOrders();
  });

  document.getElementById("userMenuOrders").addEventListener("click", (e) => {
    e.preventDefault();
    openOrders();
  });

  // ===== ADMIN PANEL (HU 15, 16, 17, 18) =====

  const $adminOverlay = document.getElementById("adminOverlay");
  const $adminClose   = document.getElementById("adminClose");

  const openAdmin = () => {
    if (!currentUser) {
      openAuth("login");
      showToast("Iniciá sesión para acceder al panel");
      return;
    }
    closeUserMenu();
    renderDashboard();
    $adminOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeAdmin = () => {
    $adminOverlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  $adminClose.addEventListener("click", closeAdmin);
  $adminOverlay.addEventListener("click", (e) => {
    if (e.target === $adminOverlay) closeAdmin();
  });

  document.getElementById("userMenuAdmin").addEventListener("click", (e) => {
    e.preventDefault();
    openAdmin();
  });

  // Admin tab switching
  document.querySelectorAll(".admin-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const panelId = tab.dataset.tab;
      document.querySelectorAll(".admin-panel").forEach((p) => p.hidden = true);

      if (panelId === "dashboard") {
        document.getElementById("panelDashboard").hidden = false;
        renderDashboard();
      } else if (panelId === "orders") {
        document.getElementById("panelOrders").hidden = false;
        renderAdminOrders();
      } else if (panelId === "sales") {
        document.getElementById("panelSales").hidden = false;
        renderSalesReport();
      } else if (panelId === "customers") {
        document.getElementById("panelCustomers").hidden = false;
        renderCustomersReport();
      }
    });
  });

  // Close all new overlays on Escape
  const origKeydown = document.onkeydown;
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeOrders();
      closeAdmin();
    }
  });

  // ===== HU 18 — Dashboard =====

  const renderDashboard = () => {
    const allOrders = orders;
    const totalRevenue = allOrders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = allOrders.length;
    const uniqueCustomers = new Set(allOrders.map((o) => o.user)).size;
    const totalUnits = allOrders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0), 0);
    const avgTicket = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    document.getElementById("kpiGrid").innerHTML = `
      <div class="kpi-card">
        <div class="kpi-icon">💰</div>
        <div class="kpi-value">${formatPrice(totalRevenue)}</div>
        <div class="kpi-label">Ingresos totales</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon">📦</div>
        <div class="kpi-value">${totalOrders}</div>
        <div class="kpi-label">Pedidos</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon">👥</div>
        <div class="kpi-value">${uniqueCustomers}</div>
        <div class="kpi-label">Clientes</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-icon">🎯</div>
        <div class="kpi-value">${formatPrice(avgTicket)}</div>
        <div class="kpi-label">Ticket promedio</div>
      </div>`;

    // Sales chart (last 7 days)
    renderSalesChart();

    // Top products
    renderTopProducts();
  };

  const renderSalesChart = () => {
    const canvas = document.getElementById("salesChart");
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = 220 * dpr;
    ctx.scale(dpr, dpr);
    const W = canvas.clientWidth;
    const H = 220;

    // Compute daily revenue for last 7 days
    const days = [];
    const dayLabels = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push(key);
      dayLabels.push(d.toLocaleDateString("es-AR", { weekday: "short" }));
    }

    const dailyRevenue = days.map((day) => {
      return orders
        .filter((o) => o.date.slice(0, 10) === day)
        .reduce((sum, o) => sum + o.total, 0);
    });

    const maxVal = Math.max(...dailyRevenue, 1);
    const padTop = 20, padBottom = 30, padLeft = 10, padRight = 10;
    const chartW = W - padLeft - padRight;
    const chartH = H - padTop - padBottom;

    // Read CSS variables for theming
    const style = getComputedStyle(document.documentElement);
    const textMuted = style.getPropertyValue("--text-muted").trim() || "#8c8172";
    const accent = style.getPropertyValue("--accent").trim() || "#b8860b";
    const accentSoft = style.getPropertyValue("--accent-soft").trim() || "rgba(184,134,11,.1)";

    ctx.clearRect(0, 0, W, H);

    // Draw bars
    const barWidth = chartW / days.length * 0.6;
    const gap = chartW / days.length;

    dailyRevenue.forEach((val, i) => {
      const barH = (val / maxVal) * chartH;
      const x = padLeft + i * gap + (gap - barWidth) / 2;
      const y = padTop + chartH - barH;

      ctx.fillStyle = accent;
      ctx.beginPath();
      const r = 4;
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + barWidth - r, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + r);
      ctx.lineTo(x + barWidth, y + barH);
      ctx.lineTo(x, y + barH);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.fill();

      // Value on top
      if (val > 0) {
        ctx.fillStyle = textMuted;
        ctx.font = "11px 'DM Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(formatPrice(val), x + barWidth / 2, y - 6);
      }
    });

    // Day labels
    ctx.fillStyle = textMuted;
    ctx.font = "12px 'DM Sans', sans-serif";
    ctx.textAlign = "center";
    dayLabels.forEach((label, i) => {
      const x = padLeft + i * gap + gap / 2;
      ctx.fillText(label, x, H - 8);
    });
  };

  const renderTopProducts = () => {
    const productSales = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        if (!productSales[item.id]) {
          productSales[item.id] = { name: item.name, qty: 0 };
        }
        productSales[item.id].qty += item.qty;
      });
    });

    const sorted = Object.values(productSales).sort((a, b) => b.qty - a.qty).slice(0, 5);

    const $topProducts = document.getElementById("topProducts");
    if (sorted.length === 0) {
      $topProducts.innerHTML = '<div class="admin-no-data">Sin datos de ventas</div>';
      return;
    }

    $topProducts.innerHTML = sorted.map((p, i) => `
      <div class="top-product-row">
        <span class="top-product-rank">${i + 1}</span>
        <span class="top-product-name">${p.name}</span>
        <span class="top-product-qty">${p.qty} un.</span>
      </div>`).join("");
  };

  // ===== HU 15 — Order Management =====

  const renderAdminOrders = () => {
    const allOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date));
    const $body = document.getElementById("adminOrdersBody");
    const $empty = document.getElementById("adminOrdersEmpty");

    if (allOrders.length === 0) {
      $body.innerHTML = "";
      $empty.hidden = false;
      return;
    }

    $empty.hidden = true;
    const statusLabels = { pending: "Pendiente", processing: "En proceso", shipped: "Enviado", delivered: "Entregado", cancelled: "Cancelado" };

    $body.innerHTML = allOrders.map((o) => {
      const date = new Date(o.date).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
      const status = o.status || "pending";
      const customerName = o.shipping ? o.shipping.name : o.user;

      return `
        <tr>
          <td><strong>${o.orderNumber}</strong></td>
          <td>${date}</td>
          <td>${customerName}</td>
          <td>${formatPrice(o.total)}</td>
          <td><span class="order-status-badge ${status}">${statusLabels[status]}</span></td>
          <td class="col-actions">
            <select class="admin-status-select" data-order="${o.orderNumber}">
              ${Object.entries(statusLabels).map(([val, label]) =>
                `<option value="${val}" ${val === status ? "selected" : ""}>${label}</option>`
              ).join("")}
            </select>
          </td>
        </tr>`;
    }).join("");
  };

  // Admin orders — status change + search + filter (event delegation)
  document.getElementById("adminOrdersBody").addEventListener("change", (e) => {
    const select = e.target.closest(".admin-status-select");
    if (!select) return;

    const orderNum = select.dataset.order;
    const newStatus = select.value;
    const order = orders.find((o) => o.orderNumber === orderNum);
    if (order) {
      order.status = newStatus;
      localStorage.setItem("webmusic-orders", JSON.stringify(orders));
      renderAdminOrders();
      showToast(`Pedido ${orderNum} → ${newStatus}`);
    }
  });

  // Search and filter for admin orders
  document.getElementById("adminOrderSearch").addEventListener("input", filterAdminOrders);
  document.getElementById("adminOrderFilter").addEventListener("change", filterAdminOrders);

  function filterAdminOrders() {
    const search = document.getElementById("adminOrderSearch").value.toLowerCase().trim();
    const filterStatus = document.getElementById("adminOrderFilter").value;
    const rows = document.querySelectorAll("#adminOrdersBody tr");

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      const statusBadge = row.querySelector(".order-status-badge");
      const status = statusBadge ? statusBadge.classList[1] : "";

      const matchesSearch = !search || text.includes(search);
      const matchesFilter = filterStatus === "all" || status === filterStatus;

      row.style.display = matchesSearch && matchesFilter ? "" : "none";
    });
  }

  // ===== HU 16 — Sales Report =====

  const renderSalesReport = () => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalUnits = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.qty, 0), 0);
    const totalOrders = orders.length;
    const avgTicket = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    document.getElementById("salesSummary").innerHTML = `
      <div class="report-tile">
        <div class="report-tile-value">${formatPrice(totalRevenue)}</div>
        <div class="report-tile-label">Ingresos totales</div>
      </div>
      <div class="report-tile">
        <div class="report-tile-value">${totalUnits}</div>
        <div class="report-tile-label">Unidades vendidas</div>
      </div>
      <div class="report-tile">
        <div class="report-tile-value">${totalOrders}</div>
        <div class="report-tile-label">Pedidos</div>
      </div>
      <div class="report-tile">
        <div class="report-tile-value">${formatPrice(avgTicket)}</div>
        <div class="report-tile-label">Ticket promedio</div>
      </div>`;

    // Revenue by category chart
    renderCategorySalesChart();

    // Sales detail table
    renderSalesDetailTable();
  };

  const renderCategorySalesChart = () => {
    const catRevenue = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        const cat = product ? product.cat : "otros";
        if (!catRevenue[cat]) catRevenue[cat] = 0;
        catRevenue[cat] += item.price * item.qty;
      });
    });

    const canvas = document.getElementById("categorySalesChart");
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = 250 * dpr;
    ctx.scale(dpr, dpr);
    const W = canvas.clientWidth;
    const H = 250;

    const entries = Object.entries(catRevenue).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text-muted").trim();
      ctx.font = "14px 'DM Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Sin datos de ventas", W / 2, H / 2);
      return;
    }

    const maxVal = Math.max(...entries.map((e) => e[1]), 1);
    const barH = 28;
    const gap = 10;
    const padLeft = 90, padRight = 80;
    const startY = 10;

    const style = getComputedStyle(document.documentElement);
    const textMuted = style.getPropertyValue("--text-muted").trim() || "#8c8172";
    const accent = style.getPropertyValue("--accent").trim() || "#b8860b";

    ctx.clearRect(0, 0, W, H);

    entries.forEach(([cat, revenue], i) => {
      const y = startY + i * (barH + gap);
      const barW = ((W - padLeft - padRight) * revenue) / maxVal;

      // Category label
      ctx.fillStyle = textMuted;
      ctx.font = "12px 'DM Sans', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(catNames[cat] || cat, padLeft - 10, y + barH / 2 + 4);

      // Bar
      ctx.fillStyle = accent;
      ctx.beginPath();
      const r = 4;
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + barW - r, y);
      ctx.quadraticCurveTo(padLeft + barW, y, padLeft + barW, y + r);
      ctx.lineTo(padLeft + barW, y + barH - r);
      ctx.quadraticCurveTo(padLeft + barW, y + barH, padLeft + barW - r, y + barH);
      ctx.lineTo(padLeft, y + barH);
      ctx.closePath();
      ctx.fill();

      // Value
      ctx.fillStyle = textMuted;
      ctx.font = "11px 'DM Sans', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(formatPrice(revenue), padLeft + barW + 8, y + barH / 2 + 4);
    });
  };

  const renderSalesDetailTable = () => {
    const productSales = {};
    orders.forEach((o) => {
      o.items.forEach((item) => {
        if (!productSales[item.id]) {
          const product = products.find((p) => p.id === item.id);
          productSales[item.id] = {
            name: item.name,
            cat: product ? catNames[product.cat] : "—",
            qty: 0,
            revenue: 0,
          };
        }
        productSales[item.id].qty += item.qty;
        productSales[item.id].revenue += item.price * item.qty;
      });
    });

    const sorted = Object.values(productSales).sort((a, b) => b.revenue - a.revenue);

    document.getElementById("salesDetailBody").innerHTML = sorted.map((p) => `
      <tr>
        <td>${p.name}</td>
        <td>${p.cat}</td>
        <td>${p.qty}</td>
        <td>${formatPrice(p.revenue)}</td>
      </tr>`).join("") || '<tr><td colspan="4" style="text-align:center;color:var(--text-muted)">Sin datos</td></tr>';
  };

  // ===== HU 17 — Customers Report =====

  const renderCustomersReport = () => {
    const customerData = {};
    orders.forEach((o) => {
      if (!customerData[o.user]) {
        customerData[o.user] = {
          email: o.user,
          name: o.shipping ? o.shipping.name : o.user,
          orders: 0,
          totalSpent: 0,
          lastOrder: o.date,
        };
      }
      customerData[o.user].orders++;
      customerData[o.user].totalSpent += o.total;
      if (new Date(o.date) > new Date(customerData[o.user].lastOrder)) {
        customerData[o.user].lastOrder = o.date;
      }
    });

    const customerList = Object.values(customerData).sort((a, b) => b.totalSpent - a.totalSpent);
    const totalCustomers = customerList.length;
    const totalRevenue = customerList.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgSpend = totalCustomers > 0 ? Math.round(totalRevenue / totalCustomers) : 0;
    const topCustomer = customerList[0] ? customerList[0].name : "—";

    document.getElementById("customersSummary").innerHTML = `
      <div class="report-tile">
        <div class="report-tile-value">${totalCustomers}</div>
        <div class="report-tile-label">Total clientes</div>
      </div>
      <div class="report-tile">
        <div class="report-tile-value">${formatPrice(avgSpend)}</div>
        <div class="report-tile-label">Gasto promedio</div>
      </div>
      <div class="report-tile">
        <div class="report-tile-value">${topCustomer}</div>
        <div class="report-tile-label">Mejor cliente</div>
      </div>`;

    const $body = document.getElementById("customersBody");
    const $empty = document.getElementById("customersEmpty");

    if (customerList.length === 0) {
      $body.innerHTML = "";
      $empty.hidden = false;
      return;
    }

    $empty.hidden = true;

    $body.innerHTML = customerList.map((c) => {
      const lastDate = new Date(c.lastOrder).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
      return `
        <tr>
          <td><strong>${c.name}</strong></td>
          <td>${c.email}</td>
          <td>${c.orders}</td>
          <td>${formatPrice(c.totalSpent)}</td>
          <td>${lastDate}</td>
        </tr>`;
    }).join("");
  };

  // ===== THUMBNAIL GALLERY (multi-angle photos) =====

  document.addEventListener("click", (e) => {
    const thumb = e.target.closest(".modal-thumb");
    if (!thumb) return;
    document.querySelectorAll(".modal-thumb").forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
    const mainImg = document.getElementById("modalMainImg");
    if (mainImg && thumb.querySelector("img")) {
      mainImg.src = thumb.querySelector("img").src;
      mainImg.style.filter = thumb.querySelector("img").style.filter || "";
    }
  });

  // ===== AUDIO SAMPLE PLAYER =====

  const stopAudio = () => {
    if (currentAudioInterval) { clearInterval(currentAudioInterval); currentAudioInterval = null; }
    currentAudioCtx = null;
  };

  document.addEventListener("click", (e) => {
    const playBtn = e.target.closest(".audio-play-btn");
    if (!playBtn) return;

    const bar = playBtn.parentElement.querySelector(".audio-bar");
    const progress = playBtn.parentElement.querySelector(".audio-progress");
    if (playBtn.classList.contains("playing")) {
      playBtn.classList.remove("playing");
      stopAudio();
      if (bar) bar.hidden = true;
      progress.style.width = "0";
      return;
    }

    playBtn.classList.add("playing");
    if (bar) bar.hidden = false;
    let pct = 0;
    currentAudioInterval = setInterval(() => {
      pct += 2;
      progress.style.width = pct + "%";
      if (pct >= 100) {
        clearInterval(currentAudioInterval);
        currentAudioInterval = null;
        playBtn.classList.remove("playing");
        if (bar) bar.hidden = true;
        progress.style.width = "0";
      }
    }, 100);
  });

  // ===== PRODUCT COMPARATOR =====

  const $compareBar = document.getElementById("compareBar");

  const updateCompareBar = () => {
    if (compareList.length === 0) {
      $compareBar.hidden = true;
      return;
    }
    $compareBar.hidden = false;
    const itemsHtml = compareList.map(p =>
      `<div class="compare-chip">${p.name}<button class="compare-chip-remove" data-compare-remove="${p.id}">✕</button></div>`
    ).join("");
    $compareBar.querySelector(".compare-items").innerHTML = itemsHtml;
  };

  const addToCompare = (product) => {
    if (compareList.length >= 4) { showToast("Máximo 4 productos para comparar"); return; }
    if (compareList.some(c => c.id === product.id)) return;
    compareList.push(product);
    updateCompareBar();
    showToast(`${product.name} agregado al comparador`);
  };

  const removeFromCompare = (id) => {
    compareList = compareList.filter(c => c.id !== id);
    updateCompareBar();
  };

  // Compare button in modal
  document.addEventListener("click", (e) => {
    if (e.target.closest("#modalCompareBtn")) {
      if (!modalProduct) return;
      const isIn = compareList.some(c => c.id === modalProduct.id);
      if (isIn) {
        removeFromCompare(modalProduct.id);
        e.target.closest("#modalCompareBtn").classList.remove("active");
      } else {
        addToCompare(modalProduct);
        e.target.closest("#modalCompareBtn").classList.add("active");
      }
    }
  });

  // Compare bar events
  $compareBar.addEventListener("click", (e) => {
    const removeBtn = e.target.closest("[data-compare-remove]");
    if (removeBtn) {
      removeFromCompare(parseInt(removeBtn.dataset.compareRemove));
      return;
    }
    if (e.target.closest(".compare-clear")) {
      compareList = [];
      updateCompareBar();
      return;
    }
    if (e.target.closest(".compare-btn")) {
      openCompareModal();
    }
  });

  const openCompareModal = () => {
    if (compareList.length < 2) { showToast("Seleccioná al menos 2 productos"); return; }
    const $overlay = document.getElementById("compareOverlay");
    const specKeys = new Set();
    compareList.forEach(p => {
      const specs = productSpecs[p.id];
      if (specs) Object.keys(specs).forEach(k => specKeys.add(k));
    });

    let tableHtml = `<table class="compare-table"><thead><tr><th></th>`;
    compareList.forEach(p => { tableHtml += `<th>${p.name}</th>`; });
    tableHtml += `</tr></thead><tbody>`;
    tableHtml += `<tr><td>Imagen</td>`;
    compareList.forEach(p => { tableHtml += `<td><img class="compare-img" src="${p.img}" alt="${p.name}"></td>`; });
    tableHtml += `</tr><tr><td>Precio</td>`;
    compareList.forEach(p => { tableHtml += `<td><strong>${formatPrice(p.price)}</strong></td>`; });
    tableHtml += `</tr><tr><td>Marca</td>`;
    compareList.forEach(p => { tableHtml += `<td>${p.brand}</td>`; });
    tableHtml += `</tr><tr><td>Stock</td>`;
    compareList.forEach(p => { tableHtml += `<td>${stockLabel(p.stock).text}</td>`; });
    tableHtml += `</tr>`;
    specKeys.forEach(key => {
      tableHtml += `<tr><td>${key}</td>`;
      compareList.forEach(p => {
        const specs = productSpecs[p.id];
        tableHtml += `<td>${specs && specs[key] ? specs[key] : "—"}</td>`;
      });
      tableHtml += `</tr>`;
    });
    tableHtml += `</tbody></table>`;

    $overlay.querySelector(".compare-table-wrap").innerHTML = tableHtml;
    $overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  document.getElementById("compareOverlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("compareOverlay")) {
      document.getElementById("compareOverlay").classList.remove("open");
      document.body.style.overflow = "";
    }
  });
  document.getElementById("compareClose")?.addEventListener("click", () => {
    document.getElementById("compareOverlay").classList.remove("open");
    document.body.style.overflow = "";
  });

  // ===== WARRANTY / RETURNS MODAL =====

  const $warrantyOverlay = document.getElementById("warrantyOverlay");
  const openWarranty = () => {
    $warrantyOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const closeWarranty = () => {
    $warrantyOverlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  document.getElementById("warrantyCloseBtn")?.addEventListener("click", closeWarranty);
  $warrantyOverlay?.addEventListener("click", (e) => {
    if (e.target === $warrantyOverlay) closeWarranty();
  });
  document.getElementById("footerWarrantyLink")?.addEventListener("click", (e) => {
    e.preventDefault();
    openWarranty();
  });

  // ===== NEWSLETTER FORM =====

  document.querySelector(".newsletter-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target.querySelector("input[type='email']");
    if (input && input.value.trim() && isValidEmail(input.value.trim())) {
      showToast("¡Gracias por suscribirte! Recibirás nuestras novedades.");
      input.value = "";
    } else {
      showToast("Ingresá un correo válido para suscribirte.");
    }
  });

  // ===== DELIVERY METHOD TOGGLE (checkout) =====

  document.addEventListener("change", (e) => {
    if (e.target.name === "deliveryMethod") {
      const shippingFields = document.getElementById("shippingFields");
      const pickupInfo = document.getElementById("pickupInfo");
      if (e.target.value === "pickup") {
        if (shippingFields) shippingFields.style.display = "none";
        if (pickupInfo) pickupInfo.hidden = false;
      } else {
        if (shippingFields) shippingFields.style.display = "";
        if (pickupInfo) pickupInfo.hidden = true;
      }
    }
  });

  // ===== ORDER TRACKING in order history =====

  const getTrackingSteps = (status) => {
    const steps = ["pending", "processing", "shipped", "delivered"];
    const labels = { pending: "Confirmado", processing: "Preparando", shipped: "Enviado", delivered: "Entregado" };
    const currentIdx = steps.indexOf(status || "pending");
    return steps.map((s, i) => {
      let cls = "";
      if (i < currentIdx) cls = "done";
      else if (i === currentIdx) cls = "current";
      return `<div class="tracking-step ${cls}">
        <div class="tracking-dot">${i < currentIdx ? "✓" : (i + 1)}</div>
        <div class="tracking-label">${labels[s]}</div>
      </div>`;
    }).join("");
  };

  // Override renderOrdersHistory to include tracking
  const _origRenderOrders = renderOrdersHistory;

  // Redefine to add tracking steps
  const renderOrdersHistoryWithTracking = () => {
    const userOrders = orders
      .filter((o) => o.user === currentUser.email)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    if (userOrders.length === 0) {
      $ordersList.innerHTML = "";
      $ordersEmpty.hidden = false;
      return;
    }

    $ordersEmpty.hidden = true;

    $ordersList.innerHTML = userOrders.map((o) => {
      const date = new Date(o.date);
      const dateStr = date.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
      const status = o.status || "pending";
      const statusLabels = { pending: "Pendiente", processing: "En proceso", shipped: "Enviado", delivered: "Entregado", cancelled: "Cancelado" };
      const itemsSummary = o.items.map((i) => `${i.qty}× ${i.name}`).join(", ");
      const deliveryMethod = o.delivery === "pickup" ? "Retiro en local" : "Envío a domicilio";

      return `
        <div class="order-card">
          <div class="order-card-header">
            <span class="order-card-number">${o.orderNumber}</span>
            <span class="order-card-date">${dateStr}</span>
          </div>
          <div class="order-card-items">${itemsSummary}</div>
          <div class="order-card-footer">
            <span class="order-card-total">${formatPrice(o.total)}</span>
            <span class="order-status-badge ${status}">${statusLabels[status]}</span>
          </div>
          ${status !== "cancelled" ? `<div class="order-tracking">${getTrackingSteps(status)}</div>` : ""}
        </div>`;
    }).join("");
  };

  // Close new modals on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeWarranty();
      const $compareOv = document.getElementById("compareOverlay");
      if ($compareOv.classList.contains("open")) {
        $compareOv.classList.remove("open");
        document.body.style.overflow = "";
      }
    }
  });

  // ===== INITIALIZATION =====

  updateAuthUI();     // Restore auth state from localStorage
  updateCartBadge();  // Restore cart state from localStorage
  renderProducts();   // Render initial catalog

});
