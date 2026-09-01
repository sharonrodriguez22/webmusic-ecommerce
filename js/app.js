/**
 * WebMusic — E-commerce de Instrumentos Musicales
 * Lógica principal de la aplicación
 * TP1 PPI · IFTS N.º 18 · Sprint 1
 *
 * User Stories implementadas:
 *   US04 — Catálogo de productos
 *   US05 — Filtro por categoría
 *   US06 — Búsqueda de productos
 *   US07 — Detalle de producto (modal)
 *   US08 — Gestión de stock visible
 */

// ===== DATOS DE PRODUCTOS (simulación de API / base de datos) =====

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

// ===== NOMBRES DE CATEGORÍAS =====

const catNames = {
  guitarras: "Guitarras",
  bajos: "Bajos",
  teclados: "Teclados",
  baterias: "Baterías",
  viento: "Viento",
  audio: "Audio",
  accesorios: "Accesorios",
};

// ===================================================================
//  EJECUCIÓN PRINCIPAL — se dispara cuando el DOM está listo
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {

  // ===== REFERENCIAS AL DOM (cacheadas) =====

  const $productGrid  = document.getElementById("productGrid");
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

  // ===== ESTADO DE LA APLICACIÓN =====

  let currentCat   = "all";
  let searchTerm   = "";
  let modalQty     = 1;
  let modalProduct = null;

  // Carrito persistente con localStorage
  let cart = JSON.parse(localStorage.getItem("webmusic-cart")) || [];

  // ===== FUNCIONES AUXILIARES =====

  /** Formatea un precio en pesos argentinos */
  const formatPrice = (precio) => `$${precio.toLocaleString("es-AR")}`;

  /** Devuelve etiqueta y clase CSS según nivel de stock (US08) */
  const stockLabel = (stock) => {
    if (stock === 0) return { text: "Sin stock", cls: "no-stock" };
    if (stock <= 3) return { text: `Últimas ${stock} un.`, cls: "low-stock" };
    return { text: "En stock", cls: "in-stock" };
  };

  /** Guarda el carrito en localStorage */
  const saveCart = () => {
    localStorage.setItem("webmusic-cart", JSON.stringify(cart));
  };

  /** Calcula la cantidad total de ítems en el carrito */
  const getCartTotal = () => cart.reduce((acc, item) => acc + item.qty, 0);

  /** Actualiza el badge del carrito en el header */
  const updateCartBadge = () => {
    const total = getCartTotal();
    $cartCount.textContent = total;
    $cartCount.hidden = total === 0;
  };

  // ===== TOAST — Notificaciones =====

  let toastTimer = null;

  const showToast = (msg) => {
    $toast.textContent = msg;
    $toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $toast.classList.remove("show"), 2500);
  };

  // ===== RENDERIZADO DE PRODUCTOS (US04) =====

  const renderProducts = () => {
    // Filtrado por categoría (US05)
    let filtered = currentCat === "all"
      ? [...products]
      : products.filter((p) => p.cat === currentCat);

    // Filtrado por búsqueda (US06)
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(({ name, brand, cat, desc }) =>
        name.toLowerCase().includes(q) ||
        brand.toLowerCase().includes(q) ||
        cat.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q)
      );
    }

    // Actualizar contador de resultados
    $productCount.textContent = `${filtered.length} ${filtered.length === 1 ? "producto" : "productos"}`;

    // Sin resultados
    if (filtered.length === 0) {
      $productGrid.innerHTML = "";
      $noResults.hidden = false;
      return;
    }

    $noResults.hidden = true;

    // Generar tarjetas de producto (US04 + US08 badges de stock)
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

  // ===== EVENTOS — Filtro por categoría (US05) =====

  $catNav.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;

    document.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentCat = btn.dataset.cat;
    renderProducts();
  });

  // ===== EVENTOS — Búsqueda en tiempo real (US06) =====

  $searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.trim();
    renderProducts();
  });

  // ===== EVENTOS — Click en grilla (delegación de eventos) =====

  $productGrid.addEventListener("click", (e) => {
    // Click en botón "Agregar" rápido
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

    // Click en tarjeta → abrir modal (US07)
    const card = e.target.closest(".product-card");
    if (card) {
      const id = parseInt(card.dataset.id);
      openModal(id);
    }
  });

  // ===== MODAL — Detalle de producto (US07) =====

  const openModal = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    modalProduct = product;
    modalQty = 1;

    const { text, cls } = stockLabel(product.stock);
    const stockColor = cls === "in-stock" ? "green" : cls === "low-stock" ? "orange" : "red";

    $modalImg.innerHTML = `
      <button class="modal-close" id="modalCloseBtn">✕</button>
      <img src="${product.img}" alt="${product.name}">`;
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

    $modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";

    // Listener para el botón cerrar dinámico
    document.getElementById("modalCloseBtn")?.addEventListener("click", closeModal);
  };

  const closeModal = () => {
    $modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
    modalProduct = null;
  };

  // Cerrar modal al hacer click fuera
  $modalOverlay.addEventListener("click", (e) => {
    if (e.target === $modalOverlay) closeModal();
  });

  // Cerrar modal con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Controles de cantidad
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

  // Agregar al carrito desde el modal
  $modalAddCart.addEventListener("click", () => {
    if (modalProduct && modalProduct.stock > 0) {
      addToCart(modalProduct, modalQty);
      closeModal();
    }
  });

  // ===== CARRITO — con persistencia en localStorage =====

  const addToCart = (product, qty = 1) => {
    if (product.stock === 0) return;

    // Buscar si el producto ya existe en el carrito
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty,
      });
    }

    saveCart();
    updateCartBadge();
    showToast(`${qty > 1 ? qty + "× " : ""}${product.name} agregado al carrito`);
  };

  // ===== INICIALIZACIÓN =====

  updateCartBadge();  // Recuperar estado del carrito desde localStorage
  renderProducts();   // Renderizar catálogo inicial

});
