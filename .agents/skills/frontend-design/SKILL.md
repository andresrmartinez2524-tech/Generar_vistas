---
name: frontend-design
description: Directrices de diseño de interfaz de usuario con estética Apple moderna: minimalista, refinada, con tipografía precisa, espaciado generoso, materiales translúcidos (frosted glass) e interacción fluida.
license: Complete terms in LICENSE.txt
---

# Apple Aesthetic Frontend Design

Actúa como el Lead Designer siguiendo los estándares del Human Interface Guidelines (HIG) de Apple. El objetivo es crear interfaces web pulidas, sobrias, visualmente ligeras y con un acabado de producto premium. Cada decisión visual debe sentirse intencional, priorizando el espacio, la tipografía de alta fidelidad y el tratamiento de materiales físicos translúcidos.

---

## 1. Fundamentos Visuales (Apple DNA)

### Espaciado y Composición
- Generosidad de aire y respiración: El espacio en blanco no es vacío, es orden y jerarquía. Usa paddings de contenedor holgados (4rem a 8rem en desktop, 1.5rem a 2.5rem en mobile) y gaps estructurados (1.5rem a 3rem).
- Simetría y orden balanceado: Secciones Hero con alineación centrada o dividida con armonía de pesos, encabezados contundentes y llamadas a la acción en cápsula perfectamente delimitadas.
- Curvatura Squircle continua: Emplea radios suaves y continuos:
  - Tarjetas y paneles: border-radius de 20px a 28px
  - Botones y pills: border-radius de 980px
  - Modales flotantes: border-radius de 24px a 32px

### Tipografía Precisa
- Pila tipográfica del sistema:
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

- Tracking y pesos:
  - Encabezados grandes (font-weight: 600 o 700): tracking negativo (letter-spacing: -0.025em a -0.04em).
  - Textos secundarios / Body (font-weight: 400): tracking neutro (letter-spacing: -0.01em).
  - Subtítulos o labels: tono atenuado con alto contraste de legibilidad (rgba(0, 0, 0, 0.56) o #86868B).

### Paleta de Color y Materiales
- Tema Claro (Light Canvas):
  - Fondo base: #FFFFFF o #F5F5F7 (gris Apple característico).
  - Texto primario: #1D1D1F.
  - Texto secundario: #86868B.
  - Bordes y líneas divisorias: rgba(0, 0, 0, 0.08).

- Tema Oscuro / Pro (Dark Slate):
  - Fondo base: #000000 o #161617.
  - Tarjetas / Paneles: #1C1C1E con borde suave rgba(255, 255, 255, 0.08).
  - Texto primario: #F5F5F7.
  - Texto secundario: #86868B).

- Acento de Marca:
  - Azul icónico: #0071E3 (hover: #0077ED, active: #0062C4).

- Material Translúcido (Frosted Glass / Vibrancy):
  - Barras superiores, navbars y menús flotantes:
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);

---

## 2. Componentes

### Botones en Cápsula (Pill Buttons)
.btn-apple-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #0071e3;
  color: #ffffff;
  padding: 10px 22px;
  border-radius: 980px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.btn-apple-primary:hover {
  background-color: #0077ed;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.25);
}

.btn-apple-primary:active {
  transform: scale(0.97);
}

.btn-apple-secondary {
  background: rgba(0, 0, 0, 0.04);
  color: #0071e3;
  border: 1px solid rgba(0, 113, 227, 0.2);
  border-radius: 980px;
  padding: 10px 22px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

### Tarjetas y Elevación
.apple-card {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease;
}

.apple-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
}

---

## 3. Microinteracciones y Movimiento
- Emplea transiciones físicas suaves con curvas bezier naturales:
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
- En elementos accionables (botones, tarjetas clickeables), responde a la interacción :active con una compresión sutil (transform: scale(0.98)).
- Evita animaciones continuas de rebote, giros innecesarios o entradas estridentes.

---

## 4. Filtro de Calidad y Restricciones
- NO utilices sombras negras oscuras, densas o sin difusión.
- NO satures interfaces con bordes de más de 1px.
- NO emplees gradientes estridentes multicolor. Si requieres gradiente, usa transiciones tonales monocromáticas o fondos neutros degradados muy sutiles.
- NO uses texto en mayúsculas sostenidas de forma indiscriminada.