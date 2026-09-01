# 🎸 WebMusic — E-commerce de Instrumentos Musicales

**Prototipo funcional** desarrollado como parte del Trabajo Práctico N.º 1 de la materia **Práctica Profesionalizante I (PPI)** en el **IFTS N.º 18**, Buenos Aires.

## 📋 Contexto académico

| Campo | Detalle |
|-------|---------|
| Materia | Práctica Profesionalizante I |
| Tema | Gobernanza, Planificación y Arquitectura de Procesos |
| Empresa ficticia | WebMusic Solutions |
| Metodología | Scrum — Sprint 1 |

## 🚀 User Stories implementadas (Sprint 1)

| US | Título | Descripción |
|----|--------|-------------|
| US04 | Catálogo de productos | Visualización de productos en grilla responsiva con imagen, nombre, precio y stock |
| US05 | Filtro por categoría | Navegación por 7 categorías: Guitarras, Bajos, Teclados, Baterías, Viento, Audio, Accesorios |
| US06 | Búsqueda de productos | Búsqueda en tiempo real por nombre, marca, categoría y descripción |
| US07 | Detalle de producto | Modal con imagen ampliada, descripción completa, precio, marca, SKU y selector de cantidad |
| US08 | Gestión de stock | Indicadores visuales: "En stock" (verde), "Últimas N un." (naranja), "Sin stock" (rojo) |

## 🗂️ Estructura del proyecto

```
webmusic-project/
├── index.html          ← Estructura HTML (maquetado semántico)
├── css/
│   └── styles.css      ← Estilos (design tokens, layout, responsive, dark mode)
├── js/
│   └── app.js          ← Lógica (datos, renderizado, filtros, modal, carrito)
└── README.md           ← Este archivo
```

La separación sigue el principio de **separación de responsabilidades** (Separation of Concerns):

- **HTML** → Estructura y semántica
- **CSS** → Presentación visual
- **JavaScript** → Comportamiento e interactividad

## 💻 Tecnologías

- HTML5 semántico
- CSS3 con Custom Properties (design tokens)
- JavaScript vanilla (ES6+)
- CSS Grid + Flexbox (layout responsivo)
- Google Fonts (Playfair Display + DM Sans)
- Imágenes de [Pexels](https://www.pexels.com/) (stock gratuito)

## 🎨 Características técnicas

- **Responsive design** con breakpoints en 768px y 480px
- **Dark mode** automático (respeta `prefers-color-scheme`) y con toggle manual
- **Design tokens** centralizados en CSS custom properties
- **Accesibilidad**: navegación por teclado (Escape cierra modal), atributos `alt` en imágenes
- **Performance**: imágenes con `loading="lazy"`, transiciones CSS optimizadas

## 🔧 Cómo ejecutar localmente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/webmusic-ecommerce.git
   ```
2. Abrir `index.html` en el navegador, o usar un servidor local:
   ```bash
   npx serve .
   ```

## 📄 Licencia

Proyecto académico — IFTS N.º 18, 2026.
