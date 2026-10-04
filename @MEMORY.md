# MEMORIA DEL PROYECTO

## Project Scope
Generador de Vistas 360° (Configuración JSON). Es una herramienta interna / panel de control ("Estación Pro de Configuración JSON") para generar configuraciones de vistas y zonas comunes de manera automatizada.

## Tech Stack
- Frontend: React (Vite)
- Iconografía: Lucide Icons
- Estilos: Vanilla CSS

## Design System
El proyecto sigue estrictamente el workflow `/estilo` (Apple HIG / Nu Style) con las siguientes adaptaciones personalizadas:
- **Iconografía (Premium Duotone):** Los iconos no deben tener bordes ni fondos circulares. Son iconos lineales (SVG en código) con trazo de 1.5px y opacidades sutiles (30%). No hay iconos al lado de los títulos.
- **Geometría (Squircles Suaves):** Las tarjetas y ventanas no deben ser muy redondeadas ni muy rectas (radios suaves y sutiles de `8px` a `14px`, evitando `999px` excesivos).
- **Fondos (Planos y Limpios):** No usar iluminaciones, destellos o brillos radiales/gradientes en el fondo de la app; deben ser colores planos que den prioridad a la legibilidad y sobriedad.
- **Glassmorphism:** Usado para profundidad (Header con backdrop-filter) pero sin exagerar efectos de resplandor.
- **Modos:** Soporte completo para Modo Claro y Modo Oscuro con `color-scheme` nativo para UI del SO.
- **Tipografía:** Sistema tipográfico estilo Apple (`var(--font-apple)` y `var(--font-mono)` para el código).
- **Código Limpio:** Zero inline styles, todo se gestiona a través de CSS puro.

## Estructura de Datos
- **Configuraciones Globales:** Proyecto, Subcarpeta, Carpeta, Extensión, Cámara (Rotación, Zoom, Límites X/Y).
- **Secciones Principales:**
  - **Vistas 360:** Generación de bloques JSON5 para assets, duplicación vertical (pisos) y duplicación lateral (vecinos).
  - **Zonas Comunes:** Generación de bloques JSON5 para configuraciones de galería/tour virtual con soporte para traducción automática (ES/EN).
  - **Generación Condicional:** Soporte para comentar condicionalmente (`//`) los bloques de `viewRestrictions` en la salida JSON.
  - **Galería:** Generación de bloques JSON5 organizando por categorías ("Renders" y "Plantas"), ajustando rutas dinámicamente con extensiones independientes (ej. `jpg`) y soporte para prefijos condicionales (`LOW_`).

## Current State
- Refactorización completada para eliminar inline styles en `App.jsx`.
- Se introdujeron animaciones sutiles (microinteracciones) en el renderizado de JSON y estados vacíos.
- Se unificó el sistema de espaciado en múltiplos de 4/8 en todo `index.css`.
