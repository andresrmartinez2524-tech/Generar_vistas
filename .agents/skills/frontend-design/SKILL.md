# Apple Aesthetic UI — Master Design Skill

## 1. PROPÓSITO

Esta Skill define cómo transformar, diseñar, implementar y mantener interfaces de aplicaciones con una estética:

* Premium
* Minimalista
* Apple-inspired
* Aesthetic
* Moderna
* Elegante
* Limpia
* Sofisticada
* Consistente
* Responsive
* Accesible
* Visualmente equilibrada

La prioridad absoluta es:

> **MEJORAR LA EXPERIENCIA VISUAL SIN ALTERAR LA FUNCIONALIDAD EXISTENTE.**

El agente debe tratar la lógica existente como una zona protegida.

No debe eliminar, reemplazar, desactivar, simplificar ni alterar funcionalidades existentes salvo que el usuario lo solicite explícitamente.

---

# 2. REGLA PRINCIPAL: NO ROMPER NADA

Antes de modificar cualquier interfaz:

1. Inspeccionar el proyecto.
2. Identificar el framework.
3. Identificar el sistema de estilos existente.
4. Identificar componentes reutilizables.
5. Identificar rutas.
6. Identificar formularios.
7. Identificar estados.
8. Identificar llamadas API.
9. Identificar autenticación.
10. Identificar navegación.
11. Identificar validaciones.
12. Identificar modales.
13. Identificar tablas.
14. Identificar filtros.
15. Identificar búsquedas.
16. Identificar acciones críticas.
17. Identificar estados loading/error/empty/success.
18. Identificar responsive behavior.

Después de esto:

> Cambiar solamente presentación, layout, estilo, jerarquía visual, componentes visuales y experiencia de interacción.

Nunca asumir que una parte aparentemente innecesaria puede eliminarse.

---

# 3. PRINCIPIO "FUNCTIONALITY LOCK"

Toda funcionalidad existente debe considerarse bloqueada.

El agente NO debe:

* Eliminar botones funcionales.
* Eliminar inputs.
* Eliminar campos.
* Eliminar formularios.
* Eliminar rutas.
* Cambiar endpoints.
* Cambiar métodos HTTP.
* Cambiar nombres de variables de negocio.
* Cambiar modelos de datos.
* Cambiar esquemas.
* Cambiar autenticación.
* Cambiar permisos.
* Cambiar roles.
* Cambiar lógica de negocio.
* Cambiar validaciones.
* Cambiar cálculos.
* Cambiar estados.
* Cambiar almacenamiento.
* Cambiar consultas.
* Cambiar comportamiento de API.
* Cambiar estructura de base de datos.
* Cambiar navegación funcional.
* Cambiar eventos funcionales.

Si una modificación visual requiere tocar lógica:

1. Intentar aislarla.
2. Crear una capa visual.
3. Mantener la lógica original.
4. Reutilizar handlers existentes.
5. Reutilizar estados existentes.
6. Reutilizar props existentes.
7. Reutilizar servicios existentes.

---

# 4. OBJETIVO VISUAL

La aplicación debe transmitir:

* Calidad
* Precisión
* Tranquilidad
* Simplicidad
* Tecnología
* Elegancia
* Claridad
* Confianza
* Modernidad

La interfaz debe sentirse:

> "Simple por fuera, sofisticada por dentro."

Evitar interfaces visualmente saturadas.

---

# 5. REFERENCIA VISUAL

Utilizar principios de diseño asociados a productos premium y al lenguaje visual moderno de Apple, sin copiar literalmente interfaces propietarias.

Inspiración:

* Apple
* iOS
* macOS
* visionOS
* Apple Settings
* Apple Health
* Apple Music
* Apple Wallet
* Apple.com
* Linear
* Arc
* Vercel
* Notion
* Raycast

No copiar componentes literalmente.

Extraer principios:

* Espaciado generoso
* Jerarquía clara
* Tipografía limpia
* Superficies suaves
* Contraste controlado
* Bordes sutiles
* Sombras extremadamente suaves
* Animaciones discretas
* Iconografía consistente
* Estados claros
* Controles táctiles cómodos
* Minimalismo

---

# 6. PROHIBICIÓN DE EMOJIS

La interfaz NO debe utilizar emojis.

Nunca utilizar:

* Emojis como iconos.
* Emojis en botones.
* Emojis en navegación.
* Emojis en títulos.
* Emojis en cards.
* Emojis como indicadores.
* Emojis decorativos.

Usar iconos profesionales.

Preferencia:

* SF Symbols cuando corresponda a plataformas Apple.
* Lucide.
* Phosphor.
* Iconos SVG consistentes.

No mezclar múltiples familias de iconos.

---

# 7. SISTEMA DE DOS TEMAS

Toda aplicación debe soportar:

## LIGHT MODE

Debe sentirse:

* Blanca
* Limpia
* Ligera
* Elegante
* Premium

Paleta conceptual:

```text
Background:
#FFFFFF

Secondary Background:
#F7F7F8

Elevated Surface:
#FFFFFF

Primary Text:
#111111

Secondary Text:
#6B6B6F

Muted Text:
#8E8E93

Border:
#E5E5EA

Divider:
#EBEBF0
```

Estos valores son referencias y deben adaptarse al proyecto.

---

## DARK MODE

Debe sentirse:

* Profunda
* Elegante
* Suave
* Premium
* No completamente negra por defecto

Paleta conceptual:

```text
Background:
#0B0B0F

Secondary Background:
#111116

Elevated Surface:
#18181D

Primary Text:
#F5F5F7

Secondary Text:
#A1A1A6

Muted Text:
#8E8E93

Border:
#2A2A30

Divider:
#25252B
```

Evitar:

```text
#000000
```

como fondo general salvo que exista una razón específica.

---

# 8. DARK MODE NO ES INVERTIR COLORES

Nunca implementar Dark Mode simplemente invirtiendo colores.

Cada elemento debe tener un significado semántico.

Usar tokens:

```text
background
background-secondary
surface
surface-elevated
text-primary
text-secondary
text-muted
border
divider
accent
success
warning
error
info
```

Los componentes deben consumir tokens, nunca depender de colores hardcodeados.

---

# 9. DESIGN TOKENS

Crear un sistema centralizado.

Ejemplo:

```css
:root {
  --background: #ffffff;
  --surface: #ffffff;
  --surface-secondary: #f7f7f8;

  --text-primary: #111111;
  --text-secondary: #6b6b6f;
  --text-muted: #8e8e93;

  --border: #e5e5ea;
  --divider: #ebebf0;

  --accent: #007aff;

  --success: #34c759;
  --warning: #ff9f0a;
  --error: #ff3b30;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 22px;

  --shadow-sm: 0 1px 3px rgba(0,0,0,.04);
  --shadow-md: 0 8px 24px rgba(0,0,0,.06);
}
```

Dark:

```css
.dark {
  --background: #0b0b0f;
  --surface: #18181d;
  --surface-secondary: #111116;

  --text-primary: #f5f5f7;
  --text-secondary: #a1a1a6;
  --text-muted: #8e8e93;

  --border: #2a2a30;
  --divider: #25252b;
}
```

Adaptar al sistema existente antes de crear otro.

---

# 10. TIPOGRAFÍA

Prioridad:

1. SF Pro cuando sea apropiado y legalmente/licencialmente disponible.
2. Inter.
3. System UI.
4. Fuente existente del proyecto si ya forma parte de su identidad.

Nunca introducir una fuente solamente por moda si perjudica consistencia.

Jerarquía:

```text
Display
32–48px

Heading
24–32px

Title
18–24px

Body
15–17px

Secondary
13–15px

Caption
11–13px
```

No utilizar demasiados tamaños.

Preferir una escala tipográfica coherente.

---

# 11. PESOS TIPOGRÁFICOS

Usar:

```text
Regular
Medium
Semibold
Bold
```

Evitar abusar de:

* Bold
* Black
* ExtraBold

Los títulos deben destacar principalmente mediante:

* Tamaño
* Espaciado
* Posición
* Contraste

No mediante peso excesivo.

---

# 12. LETTER SPACING

Títulos grandes:

Ligero tracking negativo.

Body:

Tracking neutral.

Labels pequeños:

Puede utilizarse tracking ligeramente positivo.

Nunca aplicar letter-spacing arbitrariamente.

---

# 13. ESPACIADO

Utilizar sistema consistente basado preferentemente en múltiplos de 4 u 8.

Ejemplo:

```text
4
8
12
16
20
24
32
40
48
64
80
96
```

Evitar:

```text
13px
17px
23px
29px
```

salvo que exista una necesidad concreta.

---

# 14. WHITESPACE

El espacio vacío es parte del diseño.

No llenar espacios simplemente porque existen.

Prioridad:

```text
claridad > densidad
```

La aplicación debe respirar.

---

# 15. CARDS

Las cards deben ser:

* Simples
* Limpias
* Consistentes
* Con suficiente padding
* Con bordes suaves
* Con radios moderados

Evitar:

* Sombras fuertes
* Gradientes innecesarios
* Bordes gruesos
* Excessive glassmorphism
* Demasiados elementos internos

Una card premium puede funcionar perfectamente con:

```text
background
border
radius
spacing
```

sin necesidad de sombra.

---

# 16. BORDER RADIUS

Sistema recomendado:

```text
Small:
8px

Medium:
12px

Large:
16px

XL:
20–24px

Pills:
9999px
```

No utilizar un radius diferente para cada componente sin razón.

---

# 17. SOMBRAS

Las sombras deben ser casi imperceptibles.

Evitar:

```css
box-shadow: 0 20px 50px rgba(0,0,0,.3);
```

Preferir:

```css
box-shadow:
0 1px 3px rgba(0,0,0,.04),
0 8px 24px rgba(0,0,0,.04);
```

En Dark Mode reducir aún más la dependencia de sombras.

Usar:

* Elevación
* Contraste
* Bordes
* Cambios de superficie

para crear profundidad.

---

# 18. GLASSMORPHISM

Puede utilizarse, pero con moderación.

NO convertir toda la aplicación en vidrio.

Usar únicamente cuando tenga sentido:

* Navigation
* Floating controls
* Overlays
* Modals
* Toolbars
* Floating panels

Nunca sacrificar legibilidad por estética.

---

# 19. BOTONES

Los botones deben sentirse físicos y precisos.

Estados obligatorios:

```text
Default
Hover
Active
Focus
Disabled
Loading
```

Primary:

* Alto contraste.
* Texto claramente legible.
* Radius consistente.

Secondary:

* Menos contraste.
* Bordes/superficie.

Ghost:

* Sin peso visual innecesario.

Destructive:

* Usar rojo semántico.
* No abusar del rojo.

---

# 20. ICONOS

Todos los iconos deben:

* Tener el mismo estilo.
* Tener pesos similares.
* Estar visualmente alineados.
* Tener tamaños consistentes.

Escala:

```text
14px
16px
18px
20px
24px
28px
32px
```

Nunca utilizar iconos decorativos que no tengan propósito.

---

# 21. NAVEGACIÓN

La navegación debe ser inmediatamente comprensible.

Desktop:

* Sidebar cuando la aplicación tenga múltiples secciones.
* Top navigation cuando el producto lo requiera.
* Evitar duplicar navegación sin necesidad.

Mobile:

* Bottom navigation cuando existan pocas áreas principales.
* Menú contextual cuando corresponda.
* Evitar sidebars imposibles de usar.

La navegación existente debe conservar todas sus rutas.

---

# 22. SIDEBAR

El sidebar debe ser:

* Limpio
* Compacto
* Elegante
* Fácil de escanear

Debe diferenciar:

```text
Active
Hover
Inactive
Disabled
```

No usar colores demasiado fuertes para cada sección.

Un único accent suele ser suficiente.

---

# 23. HEADER

Debe tener:

* Jerarquía
* Contexto
* Acciones principales
* Espaciado adecuado

Evitar headers gigantes.

Debe responder al contexto de cada página.

---

# 24. DASHBOARDS

Un dashboard no debe parecer un tablero de avión.

Prioridad:

1. Información importante.
2. Acción principal.
3. Estado.
4. Métricas.
5. Detalles secundarios.

Usar:

* Cards
* Charts
* Tables
* Sections
* Filters

pero únicamente cuando tengan utilidad.

---

# 25. TABLAS

Las tablas deben priorizar legibilidad.

Características:

* Header claro.
* Row spacing adecuado.
* Divisores suaves.
* Hover sutil.
* Acciones accesibles.
* Responsive behavior.

No sobrecargar con bordes.

---

# 26. FORMULARIOS

Los formularios deben sentirse simples.

Cada input:

```text
Label
Input
Helper text
Error
```

Debe soportar:

```text
Default
Focus
Filled
Disabled
Error
Success
Loading
```

Focus state debe ser visible.

Nunca depender exclusivamente del color.

---

# 27. INPUTS

Preferir:

* Alto suficiente.
* Padding cómodo.
* Border sutil.
* Radius consistente.
* Tipografía legible.

Evitar inputs extremadamente pequeños.

---

# 28. MODALES

Los modales deben:

* Tener jerarquía.
* Tener backdrop.
* Tener padding consistente.
* Tener cierre claro.
* Respetar teclado.
* Respetar responsive.

No utilizar modales para todo.

---

# 29. DRAWERS

Usar drawers cuando permitan mantener contexto.

Especialmente para:

* Filtros
* Detalles
* Configuración
* Edición secundaria

En móvil deben convertirse en bottom sheets cuando corresponda.

---

# 30. TOASTS

Los toasts deben ser:

* Discretos
* Claros
* Temporales
* No invasivos

No utilizar emojis.

Ejemplo:

```text
Cambios guardados
```

No:

```text
Cambios guardados!!!
```

---

# 31. LOADING STATES

Nunca dejar pantallas congeladas.

Usar:

* Skeleton
* Spinner
* Progress
* Disabled state

Preferir Skeleton para contenido estructurado.

Evitar loaders enormes.

---

# 32. EMPTY STATES

Un empty state debe explicar:

1. Qué está vacío.
2. Por qué puede estar vacío.
3. Qué puede hacer el usuario.

Ejemplo:

```text
No hay proyectos todavía

Crea tu primer proyecto para comenzar.

[Crear proyecto]
```

Sin emojis.

---

# 33. ERROR STATES

Debe existir:

* Mensaje claro.
* Acción recuperable.
* Información suficiente.
* No mostrar errores técnicos innecesarios al usuario.

Ejemplo:

```text
No pudimos cargar esta información

Intenta nuevamente.

[Reintentar]
```

---

# 34. MICROINTERACCIONES

Las animaciones deben sentirse naturales.

Duraciones recomendadas:

```text
100ms
150ms
200ms
250ms
300ms
```

Evitar animaciones lentas.

Usar easing suave.

Ejemplo conceptual:

```css
transition:
  background-color 180ms ease,
  border-color 180ms ease,
  transform 180ms ease,
  opacity 180ms ease;
```

---

# 35. HOVER

Hover debe ser sutil.

Nunca:

* Cambiar radicalmente de color.
* Saltar demasiado.
* Agrandar exageradamente.

Preferir:

```text
opacity
background
border
shadow
translateY(-1px)
```

---

# 36. ACTIVE

El estado active debe dar feedback inmediato.

Puede utilizar:

```text
scale(.98)
```

o una pequeña modificación de superficie.

No hacer rebotes exagerados.

---

# 37. REDUCED MOTION

Respetar:

```css
@media (prefers-reduced-motion: reduce)
```

Reducir o eliminar animaciones no esenciales.

Nunca hacer que una animación sea necesaria para comprender una acción.

---

# 38. RESPONSIVE DESIGN

Toda pantalla debe funcionar en:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
1920px+
```

No diseñar solamente para desktop.

---

# 39. MOBILE FIRST CUANDO SEA APROPIADO

En mobile:

* Reducir densidad.
* Aumentar áreas táctiles.
* Simplificar navegación.
* Reorganizar grids.
* Convertir tablas cuando sea necesario.
* Mantener funciones existentes.

Nunca eliminar funcionalidad solamente porque el viewport es pequeño.

---

# 40. TOUCH TARGETS

Los controles interactivos deben tener un área cómoda.

Objetivo aproximado:

```text
44px × 44px
```

especialmente en mobile.

---

# 41. ACCESIBILIDAD

La estética nunca debe superar la accesibilidad.

Comprobar:

* Contraste.
* Focus visible.
* Keyboard navigation.
* Labels.
* Aria cuando corresponda.
* Touch targets.
* Screen readers.
* Reduced motion.
* Estados disabled.
* Errores comprensibles.

---

# 42. CONTRASTE

No usar gris claro sobre blanco solamente porque "se ve aesthetic".

Todo texto importante debe mantener contraste suficiente.

En Dark Mode:

No usar:

```text
#555
```

para texto principal sobre fondo oscuro.

---

# 43. COLOR

La interfaz debe utilizar pocos colores.

Estructura recomendada:

```text
Neutral base
+
1 accent principal
+
semantic colors
```

Evitar rainbow UI.

---

# 44. ACCENT COLOR

El accent puede ser:

* Azul Apple-like
* Rosa
* Purple
* Green
* Otra identidad de marca

Pero debe utilizarse consistentemente.

No cambiar el accent arbitrariamente por sección.

---

# 45. AESTHETIC

"Aesthetic" NO significa:

* Saturado
* Lleno de gradientes
* Neon
* Glassmorphism extremo
* Sombras gigantes
* Animaciones exageradas

Aesthetic significa:

> Coherencia visual + composición + proporción + tipografía + color + espacio.

---

# 46. APPLE-LIKE COMPOSITION

Priorizar:

```text
Large whitespace
Strong typography
Soft surfaces
Subtle borders
Clear hierarchy
Minimal controls
Precise alignment
Smooth transitions
```

---

# 47. GRID

Utilizar grids consistentes.

Desktop:

```text
12 columns
```

o el sistema equivalente del proyecto.

Mantener:

* gutters
* margins
* max-width
* alignment

consistentes.

---

# 48. MAX WIDTH

El contenido no debe extenderse indefinidamente.

Utilizar contenedores como:

```text
1024px
1200px
1280px
1440px
```

dependiendo de la aplicación.

---

# 49. ALINEACIÓN

Elementos relacionados deben compartir:

* Eje.
* Padding.
* Baseline.
* Grid.

La sensación premium depende mucho más de la alineación que de efectos visuales.

---

# 50. JERARQUÍA

Cada pantalla debe responder visualmente:

```text
¿Qué estoy viendo?
¿Qué es importante?
¿Qué puedo hacer?
¿Qué acaba de suceder?
```

Si todo tiene el mismo peso visual:

> El diseño está mal jerarquizado.

---

# 51. COMPONENTIZACIÓN

No duplicar estilos innecesariamente.

Crear/reutilizar:

```text
Button
Input
Select
Checkbox
Radio
Switch
Card
Badge
Avatar
Modal
Drawer
Toast
Tooltip
Dropdown
Tabs
Table
Navigation
Sidebar
Header
EmptyState
ErrorState
Skeleton
```

cuando sean necesarios.

---

# 52. DESIGN SYSTEM

Si el proyecto ya tiene design system:

> Adaptarlo.

No reemplazarlo innecesariamente.

Si no existe:

> Crear uno ligero y escalable.

Debe centralizar:

* Colors
* Typography
* Spacing
* Radius
* Shadows
* Motion
* Components
* Breakpoints

---

# 53. NO DUPLICAR TOKENS

Antes de crear un nuevo token:

1. Buscar si existe.
2. Reutilizarlo.
3. Sólo crear uno nuevo si realmente es necesario.

Evitar:

```text
gray-500
neutral-500
text-gray
muted-gray
secondary-gray
soft-gray
```

si todos representan prácticamente lo mismo.

---

# 54. ICON LIBRARY

Elegir una sola librería principal.

Preferencia:

```text
Lucide
```

o la librería existente.

No mezclar:

```text
Lucide + FontAwesome + Material Icons + custom SVG
```

sin una razón.

---

# 55. IMÁGENES

Las imágenes deben:

* Mantener proporciones.
* Tener object-fit correcto.
* Tener border radius consistente.
* Evitar distorsión.
* Cargar progresivamente cuando sea apropiado.

No cambiar URLs de imágenes existentes sin necesidad.

---

# 56. ASSETS

Nunca eliminar assets existentes solamente porque no aparecen inicialmente.

Verificar si son usados por:

* rutas
* componentes
* configuraciones
* APIs
* JSON
* lazy loading

---

# 57. PERFORMANCE

La mejora visual no debe destruir performance.

Evitar:

* Animaciones pesadas.
* Blur excesivo.
* Shadows gigantes.
* Backgrounds innecesarios.
* Librerías nuevas sin necesidad.
* Imágenes enormes.
* Re-renders innecesarios.

---

# 58. NO AÑADIR DEPENDENCIAS SIN NECESIDAD

Antes de instalar una librería:

1. Revisar package.json.
2. Revisar dependencias existentes.
3. Determinar si ya existe una solución.
4. Reutilizarla.

No agregar dependencias simplemente para conseguir un efecto visual.

---

# 59. MANTENER STACK

No cambiar:

```text
React
Next.js
Vue
Angular
Tailwind
CSS
TypeScript
JavaScript
etc.
```

si el usuario no lo solicitó.

La Skill es visual.

No convertir una tarea de diseño en una migración tecnológica.

---

# 60. PRESERVAR API

Nunca modificar:

```text
fetch
axios
services
API routes
webhooks
WebSockets
authentication
authorization
```

para realizar un rediseño.

---

# 61. PRESERVAR ESTADOS

Mantener exactamente la lógica existente de:

```text
loading
error
success
empty
data
selected
open
closed
authenticated
unauthenticated
```

Cambiar únicamente cómo se representan visualmente.

---

# 62. PRESERVAR EVENTOS

No cambiar:

```text
onClick
onSubmit
onChange
onBlur
onFocus
onKeyDown
```

salvo que sea estrictamente necesario para corregir un problema visual/interactivo y sin cambiar su resultado funcional.

---

# 63. PRESERVAR RUTAS

Nunca eliminar o modificar rutas existentes durante un rediseño.

---

# 64. PRESERVAR URLS

No cambiar endpoints ni URLs de recursos salvo solicitud explícita.

---

# 65. PRESERVAR DATOS

No modificar:

* JSON
* DB
* schemas
* DTOs
* interfaces
* models
* API responses

para conseguir un cambio visual.

---

# 66. ANTES DE CODIFICAR

El agente debe inspeccionar:

```text
package.json
src/
app/
components/
pages/
styles/
public/
assets/
config/
```

y cualquier estructura equivalente.

Debe identificar:

```text
Framework
Styling system
Component system
Theme system
Routing
State management
API layer
Authentication
Existing design tokens
```

---

# 67. AUDITORÍA VISUAL

Antes de rediseñar una pantalla, identificar:

```text
Header
Navigation
Main content
Cards
Forms
Tables
Buttons
Actions
Empty states
Loading states
Error states
Modals
Footer
```

---

# 68. PLAN DE REDISEÑO

El agente debe trabajar en este orden:

### Fase 1

Auditar.

### Fase 2

Preservar funcionalidad.

### Fase 3

Crear/normalizar tokens.

### Fase 4

Implementar Light Mode.

### Fase 5

Implementar Dark Mode.

### Fase 6

Actualizar componentes base.

### Fase 7

Actualizar layouts.

### Fase 8

Actualizar páginas.

### Fase 9

Responsive.

### Fase 10

Accessibility.

### Fase 11

Motion.

### Fase 12

QA.

---

# 69. COMPONENTES BASE PRIMERO

Nunca rediseñar 30 páginas individualmente si todos utilizan los mismos componentes.

Primero:

```text
Button
Input
Card
Modal
Tabs
Navigation
Typography
Badge
Table
```

Después:

```text
Pages
```

Esto garantiza consistencia.

---

# 70. LIGHT/DARK SWITCH

El selector de tema debe:

* Ser accesible.
* Mantener preferencia.
* No provocar errores.
* No recargar innecesariamente.
* Respetar preferencia del sistema cuando corresponda.

Estados:

```text
Light
Dark
System
```

si el proyecto lo permite.

---

# 71. THEME PERSISTENCE

Si la aplicación ya guarda preferencias:

> Mantener el sistema existente.

Si no existe y el usuario solicita persistencia:

> Implementarla sin alterar la lógica restante.

---

# 72. FLASH OF UNSTYLED THEME

Evitar que la aplicación aparezca en Light y después cambie a Dark.

Cuando el stack lo permita:

* Resolver theme antes del render.
* Usar estrategia SSR/hydration adecuada.
* Evitar flickering.

---

# 73. DARK MODE COMPONENT CHECK

Cada componente debe revisarse individualmente.

Nunca asumir que cambiar variables globales es suficiente.

Revisar:

```text
Cards
Inputs
Tables
Charts
Modals
Dropdowns
Tooltips
Navigation
Buttons
Images
Dividers
Icons
```

---

# 74. CHARTS

Los gráficos deben tener versión Light y Dark.

Mantener:

* Contraste.
* Legibilidad.
* Grid sutil.
* Tooltips.
* Labels.

No utilizar colores aleatorios.

---

# 75. STATUS COLORS

Semántica consistente:

```text
Success
Warning
Error
Info
Neutral
```

Nunca utilizar verde/rojo únicamente como información crítica sin texto o iconografía adicional.

---

# 76. NOTIFICACIONES

Mantener funcionalidad existente.

Rediseñar únicamente:

* Posición
* Tamaño
* Tipografía
* Icono
* Contraste
* Animación

---

# 77. RESPONSIVE TABLES

Si una tabla no cabe:

Preferir:

1. Horizontal scrolling.
2. Column prioritization.
3. Responsive row/card transformation.

Nunca eliminar información funcional silenciosamente.

---

# 78. MOBILE NAVIGATION

No eliminar opciones.

Si no caben:

* Agruparlas.
* Moverlas a menú.
* Utilizar overflow.
* Mantener accesibilidad.

---

# 79. DESKTOP DENSITY

En desktop puede existir mayor densidad.

Pero:

> Densidad no significa saturación.

Mantener separación visual.

---

# 80. MICROCOPY

No modificar textos funcionales solamente por diseño.

Si el usuario no pidió copywriting:

> Mantener contenido existente.

---

# 81. ID Y SELECTORS

No cambiar innecesariamente:

```text
id
name
data-testid
aria-label
selectors
```

porque pueden romper:

* Tests
* Automatizaciones
* Integraciones
* JavaScript existente

---

# 82. TESTS

Después del rediseño verificar:

```text
Build
Lint
Typecheck
Tests
Routes
Forms
Authentication
API
Responsive
Theme
```

No considerar terminado solamente porque "se ve bonito".

---

# 83. QA FUNCIONAL

Verificar manualmente:

```text
Crear
Editar
Eliminar
Guardar
Buscar
Filtrar
Ordenar
Navegar
Login
Logout
Modal
Dropdown
Formulario
Upload
Download
```

según las funciones que existan.

---

# 84. QA VISUAL

Revisar:

```text
Alignment
Spacing
Typography
Contrast
Overflow
Clipping
Responsive
Dark mode
Light mode
Loading
Empty
Error
Success
```

---

# 85. QA EN DARK MODE

No aceptar simplemente que:

> "El fondo cambió a negro."

Debe revisarse toda la jerarquía.

---

# 86. QA EN MOBILE

Probar al menos:

```text
320px
375px
390px
430px
768px
```

cuando sea posible.

---

# 87. NO HACER CAMBIOS DE LÓGICA DISFRAZADOS

Ejemplos prohibidos:

```text
"Voy a quitar este botón porque se ve feo."
```

```text
"Voy a eliminar esta columna porque ocupa mucho."
```

```text
"Voy a cambiar este flujo porque queda más Apple."
```

```text
"Voy a simplificar el formulario eliminando campos."
```

Eso NO es un rediseño visual.

---

# 88. SI UNA FUNCIÓN SE VE MAL

No eliminarla.

Buscar:

```text
Re-layout
Collapse
Accordion
Drawer
Modal
Responsive transformation
Overflow
Tooltip
Progressive disclosure
```

Manteniendo la función.

---

# 89. PROGRESSIVE DISCLOSURE

Cuando una pantalla tenga demasiada información:

No eliminarla.

Ocultarla inicialmente mediante:

* Sections
* Tabs
* Accordion
* Details
* Drawer
* Modal

manteniendo acceso a toda la funcionalidad.

---

# 90. ESTÉTICA PREMIUM

Una pantalla premium debe tener:

```text
Consistencia
+
Espacio
+
Tipografía
+
Contraste
+
Alineación
+
Movimiento
+
Detalles
```

No simplemente:

```text
Gradients
+
Blur
+
Rounded corners
```

---

# 91. REGLA DE SIMPLICIDAD

Si un elemento visual no aporta:

* información
* interacción
* jerarquía
* orientación
* feedback

considerar eliminarlo.

Pero únicamente si es puramente decorativo.

Nunca eliminar elementos funcionales.

---

# 92. REGLA DE CONSISTENCIA

Un mismo concepto debe verse igual en toda la aplicación.

Ejemplo:

Si un botón primario utiliza:

```text
16px height
12px radius
medium weight
accent background
```

no crear otro botón primario visualmente diferente sin una razón.

---

# 93. REGLA DE CONTEXTO

No todos los componentes deben verse iguales.

Una:

```text
Dashboard
Settings
Profile
Login
Checkout
Admin
Detail page
```

puede tener distinta composición.

Pero deben compartir el mismo Design System.

---

# 94. LOGIN

Login debe ser especialmente limpio.

Priorizar:

```text
Brand
Title
Description
Fields
Primary action
Secondary action
Recovery
```

No saturar.

---

# 95. SETTINGS

Settings debe sentirse como una aplicación nativa moderna:

```text
Sections
Rows
Labels
Values
Disclosure
Toggles
```

Usar agrupaciones claras.

---

# 96. PERFIL

Priorizar:

```text
Identity
Primary information
Actions
Sections
```

Evitar cards innecesarias.

---

# 97. LISTADOS

Un listado debe tener:

```text
Title
Context
Search/filter
Content
Actions
```

No poner todos los controles en primera línea si no son necesarios.

---

# 98. DETAIL PAGES

Usar jerarquía:

```text
Breadcrumb/context
Title
Primary action
Summary
Details
Secondary information
```

---

# 99. ANIMACIONES DE PÁGINA

No animar todo.

Priorizar:

* Entry subtle
* Modal
* Dropdown
* Navigation
* Feedback
* Loading

Evitar:

* Bounce
* Excessive parallax
* Constant movement
* Attention-grabbing loops

---

# 100. TRANSICIONES

Las transiciones deben sentirse:

```text
Fast
Smooth
Predictable
Natural
```

Nunca bloquear interacción.

---

# 101. NO USE EMOJIS COMO FALLBACK

Si no existe un icono:

> Buscar una alternativa de iconografía consistente.

Nunca reemplazarlo por un emoji.

---

# 102. ICON BUTTONS

Todo icon-only button debe tener:

```text
aria-label
tooltip cuando sea útil
focus state
adequate touch target
```

---

# 103. FOCUS

Focus debe ser claramente visible.

No eliminar:

```css
outline: none;
```

sin proporcionar una alternativa accesible.

---

# 104. FORMS Y KEYBOARD

Los formularios deben permitir:

* Tab
* Enter
* Escape
* Navegación lógica

cuando corresponda.

---

# 105. MODALS Y ESCAPE

Si el modal existente soporta Escape:

> Mantenerlo.

El rediseño no debe romper keyboard behavior.

---

# 106. OVERFLOW

Revisar especialmente:

```text
Long names
Long emails
Large numbers
Translations
Small screens
Tables
Cards
Buttons
```

No permitir que texto crítico rompa el layout.

---

# 107. INTERNATIONALIZATION

Si el proyecto soporta varios idiomas:

> No diseñar dependiendo de una longitud fija de texto.

El layout debe soportar expansión.

---

# 108. RTL

Si el proyecto soporta RTL:

> Mantener compatibilidad.

No hardcodear posiciones que rompan RTL.

---

# 109. SEO

Si la aplicación tiene páginas públicas:

No romper:

```text
title
meta
heading structure
links
semantic HTML
```

durante el rediseño.

---

# 110. SEMANTIC HTML

Preferir:

```html
header
nav
main
section
article
footer
button
form
label
```

sobre divs innecesarios.

---

# 111. NO SOBRE-ENGINEER

No convertir un simple cambio de UI en una arquitectura gigantesca.

El código debe ser:

* Limpio
* Simple
* Reutilizable
* Mantenible

---

# 112. NO REESCRIBIR SIN NECESIDAD

Si un componente existente funciona:

> Mejorarlo.

No reescribirlo completamente solamente porque el código no es "bonito".

---

# 113. CAMBIOS INCREMENTALES

Preferir:

```text
Audit
→ Tokens
→ Base components
→ Layout
→ Pages
→ Responsive
→ QA
```

en lugar de reemplazar todo de una vez.

---

# 114. BACKUP MENTAL

Antes de modificar un componente importante:

Identificar:

```text
Props
State
Events
Dependencies
API
Consumers
```

No romper contratos existentes.

---

# 115. COMPONENT CONTRACT

Si un componente recibe:

```tsx
<Button
  onClick={handleSubmit}
  disabled={loading}
>
  Guardar
</Button>
```

el rediseño debe preservar:

```text
onClick
disabled
children
```

y cualquier otra API existente.

---

# 116. DATA CONTRACT

Si una página recibe:

```text
projects
users
transactions
products
```

no cambiar la estructura de esos datos para adaptar el diseño.

---

# 117. FINAL VISUAL STANDARD

Antes de terminar, preguntar internamente:

### ¿Se ve premium?

### ¿Se entiende inmediatamente?

### ¿Hay demasiado ruido?

### ¿Hay suficiente espacio?

### ¿La tipografía tiene jerarquía?

### ¿Light y Dark parecen el mismo producto?

### ¿Los componentes son consistentes?

### ¿Mobile funciona?

### ¿Los estados funcionan?

### ¿Los botones siguen funcionando?

### ¿Se mantuvo toda la funcionalidad?

---

# 118. CHECKLIST FINAL

Antes de entregar:

## Funcionalidad

* [ ] No se eliminó ninguna función.
* [ ] No se eliminaron rutas.
* [ ] No se cambiaron APIs.
* [ ] No se cambiaron datos.
* [ ] No se rompieron formularios.
* [ ] No se rompieron eventos.
* [ ] No se rompió autenticación.
* [ ] No se rompió navegación.

## Diseño

* [ ] Apple-inspired.
* [ ] Aesthetic.
* [ ] Minimalista.
* [ ] Premium.
* [ ] Consistente.
* [ ] Buena jerarquía.
* [ ] Buen whitespace.
* [ ] Tipografía consistente.
* [ ] Iconografía consistente.

## Temas

* [ ] Light Mode.
* [ ] Dark Mode.
* [ ] Todos los componentes soportan ambos.
* [ ] Contraste correcto.
* [ ] No hay colores hardcodeados innecesarios.

## Responsive

* [ ] Mobile.
* [ ] Tablet.
* [ ] Desktop.
* [ ] No overflow.
* [ ] No elementos cortados.
* [ ] Touch targets correctos.

## Accesibilidad

* [ ] Keyboard.
* [ ] Focus.
* [ ] Labels.
* [ ] Contraste.
* [ ] Reduced motion.
* [ ] Screen readers donde corresponda.

## Calidad

* [ ] No hay errores de consola.
* [ ] Build funciona.
* [ ] Lint funciona si existe.
* [ ] Typecheck funciona si existe.
* [ ] Tests existentes siguen funcionando.
* [ ] No se añadieron dependencias innecesarias.

---

# 119. REGLA ABSOLUTA DEL AGENTE

Cuando el usuario diga:

> "Rediseña mi app"

interpretar:

```text
CAMBIAR:
UI
UX VISUAL
LAYOUT
COLORES
TIPOGRAFÍA
ESPACIADO
COMPONENTES VISUALES
ANIMACIONES
RESPONSIVE
LIGHT MODE
DARK MODE
```

NO CAMBIAR:

```text
LÓGICA
DATOS
API
BASE DE DATOS
AUTENTICACIÓN
RUTAS
FUNCIONALIDADES
REGLAS DE NEGOCIO
INTEGRACIONES
EVENTOS
```

salvo que el usuario lo solicite explícitamente.

---

# 120. REGLA DE ORO

> **La aplicación debe verse como una aplicación completamente nueva, pero funcionar exactamente como antes.**

El resultado final debe hacer que el usuario piense:

> "La aplicación cambió completamente."

pero al utilizarla:

> "Todo sigue funcionando como antes."

---

# 121. CRITERIO FINAL

La calidad no se mide por la cantidad de CSS.

Se mide por:

```text
Claridad
Consistencia
Jerarquía
Precisión
Accesibilidad
Performance
Responsive
Elegancia
Mantenibilidad
Preservación funcional
```

La estética debe sentirse intencional.

Nada debe parecer accidental.

Nada debe moverse sin propósito.

Nada debe existir solamente para decorar.

Nada funcional debe desaparecer por estética.

---

# 122. MODO DE EJECUCIÓN DEL AGENTE

Para cada solicitud de rediseño:

```text
1. INSPECT
2. UNDERSTAND
3. PROTECT FUNCTIONALITY
4. AUDIT UI
5. ESTABLISH TOKENS
6. BUILD LIGHT THEME
7. BUILD DARK THEME
8. UPDATE COMPONENTS
9. UPDATE LAYOUTS
10. UPDATE PAGES
11. RESPONSIVE
12. ACCESSIBILITY
13. MOTION
14. QA
15. VERIFY FUNCTIONALITY
16. FINAL POLISH
```

No saltarse la fase de auditoría.

No comenzar modificando páginas al azar.

---

# 123. FRASE OPERATIVA

Ante cualquier duda entre:

```text
hacerlo más bonito
```

y

```text
mantener la funcionalidad
```

la prioridad es:

```text
FUNCIONALIDAD
>
USABILIDAD
>
ACCESIBILIDAD
>
CONSISTENCIA
>
ESTÉTICA
```

La estética nunca justifica romper funcionalidad.

---

# 124. RESULTADO ESPERADO

El agente debe producir interfaces:

* Apple-inspired
* Aesthetic
* Premium
* Minimalistas
* Modernas
* Responsive
* Accesibles
* Light/Dark
* Consistentes
* Rápidas
* Mantenibles

sin eliminar ni romper funcionalidades existentes.

END OF SKILL
