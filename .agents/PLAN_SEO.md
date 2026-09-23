# PLAN DE MEJORA SEO Y CONVERSIÓN — casadmer.com

> Hotel Casa D'mer — Taganga, Santa Marta, Colombia
> Última revisión: Septiembre 2026

---

## FASE 1 — Prioridad Alta (Impacto inmediato)

### 1.1 Activar Google Tag Manager con ID real
- Reemplazar `GTM-XXXXXXX` por el ID real del contenedor GTM.
- Verificar que los eventos `room_interest`, `generate_lead` y `view_room_gallery` lleguen a GA4.

### 1.2 Reclamar y optimizar Google Business Profile
- Reclamar el perfil en [business.google.com](https://business.google.com).
- Completar: nombre exacto ("Casa D'mer"), dirección, horarios, teléfono, sitio web, categoría "Hotel".
- Subir 10-15 fotos profesional (fachada, habitaciones, piscina, terraza, playa cercana).
- Solicitar reseñas a huéspedes y responder todas las reseñas (positivas y negativas).
- Publicar actualizaciones regulares (nuevas fotos, ofertas, eventos locales).

### 1.3 Agregar AggregateRating schema
- Agregar un tercer bloque `<script type="application/ld+json">` con tipo `Hotel` y propiedad `aggregateRating`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Casa D'mer Taganga",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "397",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
  ```
- Esto habilita rich snippets con estrellas en Google.

### 1.4 Agregar precios visibles
- Agregar un elemento en la sección de habitaciones: "Desde $XX.XXX/noche".
- Opcionalmente agregar `priceRange` y `offers` al schema Hotel:
  ```json
  "priceRange": "$$",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "COP",
    "lowPrice": "XXXXX",
    "highPrice": "XXXXX",
    "availability": "https://schema.org/InStock"
  }
  ```
- Reducir fricción: el usuario sabe si es budget antes de escribir por WhatsApp.

### 1.5 Corregir hreflang en versión EN
- En `en/index.html`, agregar `hreflang="x-default"` apuntando a `https://casadmer.com/`:
  ```html
  <link rel="alternate" hreflang="x-default" href="https://casadmer.com/">
  ```
- Cambiar canonical de EN a `https://casadmer.com/` para concentrar autoridad en la homepage.

---

## FASE 2 — Prioridad Media (Visibilidad y contenido)

### 2.1 Crear landing page de Taganga
- Crear `taganga.html` (ES) con contenido optimizado para keywords:
  - "hotel en Taganga", "hospedaje Taganga Santa Marta", "hotel cerca playa Taganga"
  - Contenido: qué es Taganga, cómo llegar, qué hacer, playas, dónde comer, clima, vida nocturna.
  - Incluir CTA a WhatsApp al final.
  - Agregar al sitemap.xml.
  - Agregar hreflang correspondiente si se crea versión EN.

### 2.2 Crear landing page de habitaciones
- Crear `habitaciones.html` (ES) con detalle de cada tipo de habitación:
  - Fotos de cada habitación (ya hay galerías en JS).
  - Amenities específicas por tipo (aire acondicionado, vista, etc.).
  - Precios si aplica.
  - Schema `HotelRoom` o `Room` para cada una.
  - CTA por WhatsApp por habitación.

### 2.3 Agregar botón de llamada telefónica
- Agregar en el header y en la sección final un enlace `tel:+573177805842` como alternativa a WhatsApp.
- Esto capta usuarios que prefieren llamar directamente (común en Colombia).

### 2.4 Agregar geo coordinates al schema Hotel
- En el schema existente, agregar:
  ```json
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.2676,
    "longitude": -74.1633
  }
  ```

### 2.5 Mejorar alt tags de imágenes
- Cambiar los `alt` genéricos para incluir keywords relevantes:
  - `"Habitación doble con cama amplia y mesa"` → `"Habitación doble hotel Casa D'mer en Taganga, Santa Marta"`
  - `"Habitación doble luminosa"` → `"Habitación luminosa con vista al patio, hotel en Taganga"`

### 2.6 Agregar ancho y alto a todas las imágenes
- Agregar atributos `width` y `height` a todas las `<img>` para mejorar CLS (Cumulative Layout Shift).
- Esto mejora Core Web Vitals.

### 2.7 Corregir imagen rota en EN
- En `en/index.html`, la galería familiar referencia `room1.jpg`. Verificar si debe ser `room1a.webp` o `room1.jpg`.

---

## FASE 3 — Prioridad Baja (Optimización avanzada)

### 3.1 Lead magnet para captura de email
- Crear un PDF descargable: "Guía secreta de Taganga" o "Los 10 spots imperdibles de Taganga".
- Agregar formulario de captura (nombre + email → link a descarga).
- Permite nurturing por email para quienes no reservan inmediatamente.

### 3.2 Self-host Google Fonts
- Descargar DM Sans y Playfair Display localmente en `assets/fonts/`.
- Eliminar la carga externa de Google Fonts.
- Reduce una conexión externa y mejora LCP.

### 3.3 Agregar más contenido de soporte
- Blog o secciones estáticas:
  - "Cómo llegar a Taganga desde el aeropuerto"
  - "Mejor época para visitar Taganga"
  - "Taganga vs Santa Marta: qué elegir"
- Cada página long-tail atrae tráfico orgánico.

### 3.4 Agregar schema BreadcrumbList
- Implementar migas de pan estructuradas para mejorar la apariencia en SERPs.

### 3.5 Optimizar meta description de EN
- La meta description de EN es más corta que ES. Unificar longitud (~155 caracteres).

### 3.6 Implementar preloading de imagen hero
- Agregar `<link rel="preload" as="image" href="assets/imagenes/intro.jpg">` para mejorar LCP.

### 3.7 Verificar y crear 404 page
- GitHub Pages muestra una página genérica de 404. Crear una página personalizada con CTA a WhatsApp.

---

## Resumen de impacto

| Fase | Acciones | Impacto esperado |
|------|----------|------------------|
| 1 - Alta | GTM, GBP, Schema reviews, Precios, Hreflang | Rich snippets, medición, conversión |
| 2 - Media | Landing Taganga, Habitaciones, Teléfono, Geo, Alt tags | Tráfico orgánico, conversión |
| 3 - Baja | Lead magnet, Fonts locales, Contenido soporte, Breadcrumbs | Retención, performance, long-tail |
