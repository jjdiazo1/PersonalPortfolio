# Sistema de Diseño: Terminal Editorial
> Portafolio personal — Swiss grid con alma de developer. Monocromático, animado, mobile-first.

**Theme:** light

Terminal Editorial es un sistema de portafolio construido sobre la intersección de dos disciplinas: el rigor tipográfico del diseño editorial suizo y la precisión semántica del desarrollo de software. El chrome es estrictamente acromático — blanco, `#292929`, negro — y los gridlines visibles actúan como la única ornamentación estructural. La energía founder se inyecta no con color sino con vocabulario: timestamps reales, métricas de proyecto, un cursor parpadeante, monospace para metadata. Las animaciones son físicas pero contenidas — spring con damping alto, nunca espectaculares, siempre funcionales. El resultado es un portafolio que se lee como una publicación de diseño hecha por alguien que construye productos reales.

---

## Colors

| Name | Value | Role |
|------|-------|------|
| Paper | `#ffffff` | Canvas de página, superficies de card, fondo de imagen — la única superficie del sistema |
| Charcoal | `#292929` | Texto primario, borders, gridlines, labels, botones — hace el 90% del trabajo visual |
| Ink | `#000000` | Énfasis máximo, fills SVG, el cursor parpadeante, metadata de mayor jerarquía |
| Graphite | `#888888` | Texto secundario, timestamps, metadata de menor jerarquía, placeholder text, estados inactivos |
| Surface Dim | `#f5f5f5` | Fondo de hover state en cards de proyecto — el único cambio de superficie permitido |

---

## Typography

### NH (Inter como sustituto) — La voz editorial del sistema. Ultra-light en el hero (weight 100–200), regular en body. El headline del hero en 100 weight debe leerse como una impresión fantasma — presencia sin peso. Nunca bold.
- **Substitute:** Inter
- **Weights:** 100, 200, 300, 400
- **Sizes:** 13px, 16px, 24px, 32px, 48px, 64px
- **Line height:** 1.10–1.50
- **Letter spacing:** -0.02em en display, -0.01em en body

### JetBrains Mono (o cualquier monospace del sistema) — Exclusivamente para metadata de developer: timestamps, stack tags, contadores, el cursor. No para body ni para headings. El contraste entre NH y monospace es la firma del sistema.
- **Substitute:** `ui-monospace`, `SFMono-Regular`, `Menlo`
- **Weights:** 400
- **Sizes:** 11px, 13px
- **Line height:** 1.34
- **Letter spacing:** 0em (monospace no necesita ajuste)

### Condensed Sans (Barlow Condensed como sustituto) — Para labels de sección, navegación, botones, y el ticker del hero. Tracking positivo en tamaños pequeños crea la voz de "etiqueta" que contrasta con NH.
- **Substitute:** Barlow Condensed
- **Weights:** 300, 400, 500
- **Sizes:** 11px, 13px, 14px, 40px
- **Line height:** 1.00–1.34
- **Letter spacing:** 0.12em en 11–14px, 0.06em en 40px

### Type Scale

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| hero-xl | NH | 64px | 100 | 1.00 | -0.04em |
| hero-lg | NH | 48px | 100–200 | 1.10 | -0.03em |
| heading | NH | 32px | 300 | 1.20 | -0.02em |
| subheading | NH | 24px | 300 | 1.30 | -0.02em |
| body | NH | 16px | 400 | 1.50 | -0.01em |
| label | Condensed | 13px | 500 | 1.34 | 0.12em |
| caption | Condensed | 11px | 400 | 1.34 | 0.12em |
| meta | Mono | 11px | 400 | 1.34 | 0em |
| meta-lg | Mono | 13px | 400 | 1.34 | 0em |

---

## Colors — Uso semántico extendido

```text
Text primary        → #292929  (NH, body y headings)
Text secondary      → #888888  (timestamps, metadata baja jerarquía)
Text emphasis       → #000000  (métricas clave, cursor, SVG fills)
Border primary      → #292929  (gridlines, card borders, inputs)
Border secondary    → #888888  (separadores suaves, estados inactivos)
Background          → #ffffff  (única superficie base)
Background hover    → #f5f5f5  (hover en cards — el único fill secundario)
Background inverted → #292929  (hover en botones — texto se vuelve #ffffff)
```

---

## Spacing & Layout

**Base unit:** 4px

**Density:** comfortable-compact — más denso que Mono, menos que Alt–Border

**Page max-width:** 1120px centrado con padding lateral de 20px en mobile, 48px en desktop

**Grid visible:** 12 columnas con borders `1px solid #292929` marcando las divisiones estructurales principales. No todas las columnas tienen border — solo las que actúan como contenedores mayores.

| Token | Value | Uso |
|-------|-------|-----|
| `space-1` | 4px | Gap mínimo entre elementos inline |
| `space-2` | 8px | Gap entre label y su contenido |
| `space-3` | 16px | Padding interno de cards y filas de metadata |
| `space-4` | 24px | Gap entre secciones pequeñas |
| `space-5` | 40px | Gap entre secciones mayores |
| `space-6` | 64px | Separación entre bloques de página |
| `space-7` | 96px | Padding top del hero |

### Border Radius

**Todo: 0px.** Sin excepción. Imágenes, botones, inputs, cards, tags — todo es cuadrado. El sistema es anti-redondeado por definición.

---

## Animaciones — El sistema nervioso del diseño

Esta es la sección más importante del sistema. Las animaciones no son decorativas — son la forma en que el contenido cobra presencia sin abandonar la austeridad.

### Principios de animación

- **Spring sobre ease:** Toda animación de UI usa spring con damping alto (damping 20–30, stiffness 200–300). Nunca `ease-in-out` para elementos de interfaz.
- **Duración corta:** 150ms–400ms. Nada se arrastra.
- **Un eje a la vez:** Translate Y o translate X, nunca ambos simultáneamente en el mismo elemento.
- **Sin bounce visible:** El spring tiene overshoot máximo de 2px — se siente físico pero no juguetón.
- **Stagger controlado:** Cuando múltiples elementos entran juntos, stagger de 40–60ms entre ítems.

### Tokens de animación

```text
spring-ui        → stiffness: 280, damping: 24, mass: 1
spring-page      → stiffness: 200, damping: 28, mass: 1
spring-heavy     → stiffness: 160, damping: 30, mass: 1.2
duration-fast    → 150ms
duration-base    → 250ms
duration-slow    → 400ms
easing-out       → cubic-bezier(0.16, 1, 0.3, 1)   ← para CSS transitions
easing-in-out    → cubic-bezier(0.4, 0, 0.2, 1)    ← solo para página transitions
stagger-items    → 50ms
stagger-chars    → 18ms
```

### Catálogo de animaciones

#### 1. Gridline Draw — entrada de página
Las líneas verticales del grid se dibujan de arriba hacia abajo con stagger entre columnas. Da la sensación de que la estructura se construye ante el usuario.

```text
Propiedad:    scaleY  0 → 1
Transform-origin: top
Duración:     400ms por línea
Stagger:      80ms entre columnas
Easing:       easing-out
Trigger:      onMount, una sola vez
```

#### 2. Hero Text Reveal — entrada del nombre
Las líneas del hero entran con clip-path, no con fade. El texto emerge desde abajo como si una regla tipográfica lo desvela.

```text
Propiedad:    clipPath  inset(100% 0 0 0) → inset(0% 0 0 0)
              translateY  12px → 0px
Duración:     400ms
Stagger:      80ms entre líneas del headline
Easing:       spring-page
Trigger:      onMount, después de gridline draw (delay 200ms)
```

#### 3. Typewriter — subtítulo del hero
El rol/subtítulo debajo del nombre se escribe carácter por carácter. Rápido — no cinematográfico.

```text
Velocidad:    35ms por carácter
Cursor:       | parpadeante en #000000, 530ms blink interval
Trigger:      después del hero text reveal (delay 100ms)
Contenido:    "Systems Engineer · Founder · Building in public"
```

#### 4. Viewport Entry — proyectos y secciones
Cada elemento que entra al viewport se anima una sola vez. No repite al hacer scroll hacia arriba.

```text
Propiedad:    opacity  0 → 1
              translateY  16px → 0px
Duración:     300ms
Easing:       spring-ui
Stagger:      50ms entre cards en una fila
Threshold:    0.15 (el elemento necesita estar 15% visible)
```

#### 5. Image Clip Reveal — imágenes de proyecto
Las imágenes de proyecto no hacen fade — se revelan con clip-path desde el borde inferior, como si se desarrollaran desde un negativo.

```text
Propiedad:    clipPath  inset(0 0 100% 0) → inset(0 0 0% 0)
Duración:     500ms
Easing:       easing-out
Stagger:      80ms si hay múltiples imágenes en vista
```

#### 6. Project Card Hover
Mobile no tiene hover, pero en desktop las cards de proyecto responden con un cambio de fondo y un micro-movimiento del label.

```text
Background:   #ffffff → #f5f5f5  (150ms, easing-out)
Label:        translateX  0 → 4px  (150ms, spring-ui)
Image:        scale  1.0 → 1.02  (300ms, spring-ui)
              overflow: hidden en el contenedor para clip el scale
```

#### 7. Page Transition — shared element
Cuando el usuario navega a un proyecto, la imagen de la card hace morphing hasta cubrir la pantalla. Implementado con `layoutId` en Framer Motion o View Transitions API.

```text
Elemento compartido: la imagen cuadrada del proyecto
Estado A:     tamaño y posición de la card en el grid
Estado B:     full-width, top de la página de detalle
Duración:     350ms
Easing:       spring-heavy
```

#### 8. Ticker Scroll — barra de estado
Loop infinito horizontal con las métricas y el estado actual. Pausa en tap (mobile) o hover (desktop).

```text
Velocidad:    40px/s
Dirección:    right to left
Pausa:        onTouchStart / onMouseEnter
Resume:       onTouchEnd / onMouseLeave  (con 300ms delay)
Separador:    " · " entre ítems
```

---

## Componentes

### Navigation Bar
**Role:** Top bar mínima — identidad y acceso.

Full-width, sin background fill, sin border top. Altura 48px en mobile, 56px en desktop. Tres zonas:

- **Izquierda:** Nombre o initiales en Condensed 13px weight 500, tracking 0.12em, uppercase, `#292929`
- **Centro:** Vacío en mobile. En desktop: label monospace `11px` con estado actual `"available for projects"` en `#888888`
- **Derecha:** Dos links de texto `WORK` y `ABOUT` en Condensed 13px weight 400, tracking 0.12em, uppercase. En hover: `border-bottom: 1px solid #292929`

Un `1px solid #292929` hairline debajo de la barra. La barra no es sticky — desaparece en scroll y reaparece solo si el usuario hace scroll hacia arriba, con una transición de `translateY -100% → 0` en 200ms.

```text
Height:       48px mobile / 56px desktop
Padding:      0 20px mobile / 0 48px desktop
Border-bottom: 1px solid #292929
Background:   #ffffff (no cambia)
Position:     fixed top, hide-on-scroll-down / show-on-scroll-up
```

### Hero Block
**Role:** Primera impresión — nombre, rol, y estado en tiempo real.

Ocupa el 85–90% del viewport height en mobile. Estructura vertical:

```text
[96px padding-top]
[NOMBRE EN NH 100 WEIGHT]        ← hero-xl: 48px mobile / 64px desktop
[rol con cursor parpadeante]     ← body NH 16px + cursor mono
[16px gap]
[ticker de estado]               ← Condensed 11px tracking 0.12em
[espacio flexible]
[scroll indicator]               ← "↓ WORK" Condensed 11px
```

El nombre usa `font-weight: 100` — la presencia viene del tamaño, no del peso. En mobile a 48px con line-height 1.00 el nombre ocupa 2–3 líneas naturalmente.

El rol debajo del nombre es una sola línea con el cursor parpadeante al final:
`Systems Engineer · Founder ·` `|` (cursor en `#000000`, blink 530ms)

El ticker de estado es una fila de metadata en loop:
`"3 proyectos en producción · 2 en construcción · Bogotá · Q2 2025 · Disponible"`

Un `1px solid #292929` hairline separa el hero del contenido siguiente.

### Project Grid — Vista de lista (mobile default)
**Role:** Proyectos visibles desde el primer scroll — el objetivo central del portafolio.

En mobile: una columna, cada proyecto ocupa el ancho completo con su imagen en aspect ratio `4:3`. Las cards se apilan verticalmente con `1px solid #292929` como separador entre ellas — no hay gap de espacio, la línea ES la separación.

En desktop: 2 columnas con `1px solid #292929` como columna divisoria central. El grid tiene borde exterior en los cuatro lados.

Cada card tiene:

```text
[Imagen 4:3, object-fit cover, 0px radius, clip reveal en viewport]
[1px solid #292929 hairline]
[Metadata row: 16px padding]
  [Izquierda: nombre del proyecto, NH 16px weight 300]
  [Derecha: año + tipo, Mono 11px #888888]
[Stack tags row: 8px padding-bottom 16px padding-horizontal]
  [Tags en Condensed 11px, uppercase, tracking 0.12em]
  [Separados por " · " no por chips]
```

No hay botón de "ver más". El tap en cualquier parte de la card abre el proyecto con la page transition de shared element.

### Project Card — Variante destacada
**Role:** Para el primer proyecto o proyectos featured — más presencia.

Ocupa ancho completo (single column incluso en desktop). Imagen en aspect ratio `16:9`. El nombre del proyecto en NH 32px weight 300. Una línea de descripción en NH 16px weight 400 `#888888` debajo del nombre.

```text
[Imagen 16:9 full-width, clip reveal]
[1px border-bottom]
[24px padding]
  [Nombre: NH 32px weight 300 #292929]
  [Descripción: NH 16px weight 400 #888888 — una línea máximo]
  [8px gap]
  [Metadata: Mono 11px #888888 — "Fundador · 2024 · 12k usuarios"]
```

### Section Label
**Role:** Apertura de cada sección — el patrón canónico de Mono adaptado.

Una fila horizontal con el label de sección a la izquierda y un número de sección a la derecha. Seguido de `1px solid #292929`.

```text
[WORK]                                    [01]
────────────────────────────────────────────
```

- Label: Condensed 11px weight 500, uppercase, tracking 0.12em, `#292929`
- Número: Mono 11px, `#888888`
- La línea es el `border-bottom` del contenedor, no un elemento separado

### Metadata Strip
**Role:** Fila de datos de proyecto — métricas reales visibles en el portafolio.

Una fila horizontal de datos separados por `·` en tipografía monospace. Aparece debajo de la imagen en las cards y en la página de detalle del proyecto.

```text
Fundador  ·  Q3 2024  ·  12 400 usuarios  ·  React · Node.js
```

- Font: Mono 11px weight 400
- Color: `#888888` para labels, `#292929` para valores numéricos
- Sin border, sin background
- En mobile: puede romper en dos líneas, alineado a la izquierda

### Stack Tag
**Role:** Tecnologías usadas en un proyecto.

Texto plano en Condensed 11px uppercase, tracking 0.12em, `#888888`. Separados por `·` inline. **No hay chips, no hay pills, no hay background, no hay border.** Los tags son texto, no elementos.

```text
REACT  ·  NODE.JS  ·  POSTGRESQL  ·  STRIPE
```

Si se quiere dar más presencia a un tag específico (tecnología principal): `#292929` en lugar de `#888888`.

### Cursor Blink
**Role:** El único elemento "vivo" del hero — marca el carácter de developer.

Un carácter `|` en JetBrains Mono 16px weight 400, `#000000`. Animación CSS pura:

```css
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.cursor {
  animation: cursor-blink 530ms step-end infinite;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 16px;
  color: #000000;
  margin-left: 2px;
}
```

### Ticker Bar
**Role:** Fila de estado en loop — métricas y disponibilidad en tiempo real.

Una fila de texto en loop infinito horizontal. Implementado con dos copias del contenido para el loop sin glitch.

```text
Contenido ejemplo:
"3 proyectos en producción · Bogotá, Colombia · Disponible para proyectos · Q2 2025 · 2 productos propios"
```

- Font: Condensed 11px weight 400, uppercase, tracking 0.12em
- Color: `#888888`
- Velocidad: 35px/s
- Separador visual entre la última y primera iteración: `" ·· "`
- `border-top: 1px solid #292929` y `border-bottom: 1px solid #292929`
- Padding vertical: 8px

### Gridline Frame
**Role:** Contenedor estructural visible — los "huesos" de la página.

Un `div` con `border: 1px solid #292929` en los cuatro lados. No tiene padding propio — el contenido interno define su propio espaciado. Los frames pueden anidarse: un frame exterior de sección puede contener frames de card.

La animación de entrada del gridline frame es la de "Gridline Draw" — `scaleY 0 → 1` desde el top.

### About / Manifesto Block
**Role:** Texto de identidad — quién eres y qué construyes.

Un bloque de texto de ancho completo con la descripción personal. Dos partes:

**Parte A — Statement grande:**
NH 32px weight 200, `#292929`, line-height 1.20. Una o dos oraciones máximo. Sin entrecomillado, sin decoración.

```text
Construyo productos digitales desde
los fundamentos — código, arquitectura,
y el momento en que la idea se vuelve real.
```

**Parte B — Bio corta:**
NH 16px weight 400, `#888888`, line-height 1.50. Dos párrafos máximo. Alineado a la izquierda siempre.

En desktop: layout de dos columnas con `1px solid #292929` divisorio. Parte A en la columna izquierda (60%), Parte B en la derecha (40%).

### Project Detail — Página interna
**Role:** Vista completa de un proyecto individual.

La imagen de la card hace morphing a full-width en la parte superior (shared element transition). Debajo, el layout es:

```text
[Imagen full-width, aspect ratio 16:9 o 3:2]
[1px border-bottom]
[Layout de dos columnas en desktop / single en mobile]
  [Columna izquierda 65%]
    [Nombre: NH 32px weight 300]
    [Descripción: NH 16px weight 400, máx 3 párrafos]
  [Columna derecha 35%, border-left: 1px solid #292929]
    [Metadata: Mono 13px]
    [Stack: Condensed 11px]
    [Links: Condensed 13px con → prefijo]
[Gap 40px]
[Galería de imágenes adicionales: grid 2 columnas, 1px gap]
```

La galería de imágenes adicionales es el lugar donde se aprovechan las imágenes de cada proyecto. Grid de 2 columnas con `1px solid #292929` entre ellas. Sin gap de espacio — la línea es la separación.

### Footer
**Role:** Cierre mínimo — contacto y links.

Una sola fila con `border-top: 1px solid #292929`. Padding vertical 20px.

```text
[Nombre initiales o wordmark]         [Email · GitHub · LinkedIn]
```

- Izquierda: Condensed 13px weight 500, uppercase, tracking 0.12em
- Derecha: links en Condensed 11px weight 400, uppercase, tracking 0.12em, separados por `·`
- Hover en links: `border-bottom: 1px solid #292929`
- Sin copyright, sin año, sin texto adicional

---

## Elevation

**Cero.** Sin `box-shadow`, sin `drop-shadow`, sin `filter: blur`. La jerarquía viene de:
1. Peso tipográfico (NH 100 vs NH 400 vs Condensed 500)
2. Color de texto (`#000000` vs `#292929` vs `#888888`)
3. Tamaño tipográfico
4. Posición en el gridline frame
5. Animación de entrada — lo que se anima primero percibe más jerarquía

---

## Surfaces

- **Paper** `#ffffff` — El único fondo. Toda la página es esta superficie.
- **Charcoal** `#292929` — Superficie invertida, solo en hover de botones. Texto becomes `#ffffff`.
- **Dim** `#f5f5f5` — Hover state de cards en desktop. El único cambio de superficie que no es inversión.

---

## Do's and Don'ts

### Do
- Usar NH weight 100–200 para el headline del hero. El tamaño da presencia, no el peso.
- Usar JetBrains Mono exclusivamente para metadata de developer: timestamps, contadores, stack cuando aparece como dato técnico.
- Mantener todos los radios en 0px — imágenes, inputs, tags, todo.
- Implementar spring con damping alto (22–28) para todas las animaciones de UI. Que se sienta físico, no rebotante.
- Hacer que los proyectos sean visibles antes del primer scroll en mobile — ese es el objetivo del diseño.
- Usar `1px solid #292929` como único elemento ornamental estructural.
- Mostrar métricas reales de los proyectos (usuarios, fechas, rol). Es parte de la identidad founder.
- Animar el clip-path de las imágenes al entrar al viewport — no fade, reveal.

### Don't
- No introducir ningún color cromático. Si un proyecto tiene un color de marca fuerte, aparece solo dentro de la imagen.
- No usar border-radius mayor a 0px en ningún elemento del chrome.
- No usar `ease-in-out` genérico para animaciones de UI — siempre spring o `cubic-bezier(0.16, 1, 0.3, 1)`.
- No hacer la barra de navegación sticky permanente — esconde en scroll down, muestra en scroll up.
- No poner más de 4 proyectos visibles antes del fold en mobile — 2 es el número ideal.
- No usar NH weight 700 o superior. Si necesitas énfasis tipográfico, cambias de fuente (a Condensed o Mono), no de peso.
- No agregar separadores visuales que no sean líneas de 1px — sin backgrounds de sección, sin cards con shadow, sin gradientes.
- No animar más de 3 propiedades simultáneamente en un mismo elemento.
- No usar el typewriter effect en más de un lugar — solo en el subtítulo del hero.

---

## Mobile-Specific Behavior

El sistema es diseñado mobile-first. Estas son las reglas que aplican solo en viewports menores a 768px:

### Navegación mobile
La nav top se colapsa a solo el nombre/initiales a la izquierda y un ícono de menú a la derecha. El menú abre un bottom sheet con spring animation (`translateY 100% → 0`, spring-heavy) con los links de navegación en Condensed 14px uppercase, separados por hairlines.

### Hero mobile
El nombre ocupa 2–3 líneas naturalmente a 48px. La línea del rol con cursor va debajo. El ticker de estado va debajo de un hairline. El indicador de scroll `↓ WORK` va pegado al bottom del viewport con `position: absolute, bottom: 24px`.

### Touch interactions
- **Tap en card:** Inicia inmediatamente la page transition (sin delay de hover)
- **Swipe en galería de proyecto:** Navegación horizontal entre imágenes adicionales con momentum
- **Tap en ticker:** Pausa el loop mientras el dedo está presionado

### Imágenes en mobile
Las imágenes de proyecto en la lista ocupan el 100% del ancho con aspect ratio `4:3`. La imagen destacada (primer proyecto) usa `3:2`. En la página de detalle, la imagen hero es `16:9` o la proporción nativa de la imagen, lo que sea más alto.

---

## Implementación — Stack recomendado

```text
Framework:        Next.js (App Router)
Animaciones:      Framer Motion
  - layoutId para page transitions
  - useInView para viewport reveals
  - useVelocity + useSpring para el ticker
  - motion.div con variants para stagger
Fuentes:          next/font (Google Fonts: Inter + Barlow Condensed)
                  JetBrains Mono vía Google Fonts o local
Estilos:          Tailwind CSS con tokens personalizados en tailwind.config
Grid visible:     CSS Grid con border en los contenedores (no outline)
Ticker:           CSS animation con @keyframes translate para el loop
Cursor blink:     CSS animation pura (no JS)
View Transitions: Framer Motion layoutId (más compatible que View Transitions API nativa)
```

### Tokens de Tailwind sugeridos

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        paper: "#ffffff",
        charcoal: "#292929",
        ink: "#000000",
        graphite: "#888888",
        dim: "#f5f5f5",
      },
      fontFamily: {
        editorial: ["Inter", "sans-serif"],
        condensed: ["Barlow Condensed", "sans-serif"],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      fontSize: {
        "hero-xl": ["64px", { lineHeight: "1.00", letterSpacing: "-0.04em" }],
        "hero-lg": ["48px", { lineHeight: "1.10", letterSpacing: "-0.03em" }],
        heading: ["32px", { lineHeight: "1.20", letterSpacing: "-0.02em" }],
        subheading: ["24px", { lineHeight: "1.30", letterSpacing: "-0.02em" }],
        body: ["16px", { lineHeight: "1.50", letterSpacing: "-0.01em" }],
        label: ["13px", { lineHeight: "1.34", letterSpacing: "0.12em" }],
        caption: ["11px", { lineHeight: "1.34", letterSpacing: "0.12em" }],
        meta: ["11px", { lineHeight: "1.34", letterSpacing: "0em" }],
      },
      borderWidth: {
        hairline: "1px",
      },
      borderRadius: {
        none: "0px",
        DEFAULT: "0px",
      },
    },
  },
}
```

---

## Jerarquía de página — Estructura completa

```text
┌─────────────────────────────────────────┐
│  NAV BAR  (48px, hairline bottom)        │
├─────────────────────────────────────────┤
│                                          │
│  HERO                                    │
│  ─ Nombre NH 100 48–64px                 │
│  ─ Rol + cursor parpadeante              │
│  ─ Ticker de estado (hairlines arriba    │
│    y abajo)                              │
│  ─ ↓ WORK (bottom del viewport)          │
│                                          │
├─────────────────────────────────────────┤  ← 1px #292929
│  SECTION LABEL: WORK [01]                │
├──────────────────────┬──────────────────┤  ← gridline vertical
│                      │                  │
│  PROYECTO DESTACADO  │  PROYECTO 2      │
│  (featured, 16:9)    │  (card, 4:3)     │
│                      │                  │
│  ─ Nombre 32px       │  ─ Nombre 16px   │
│  ─ Descripción       │  ─ Metadata      │
│  ─ Metadata          │  ─ Stack         │
│                      │                  │
├──────────────────────┴──────────────────┤  ← 1px #292929
│  PROYECTO 3           │  PROYECTO 4     │
│  (card, 4:3)          │  (card, 4:3)    │
├───────────────────────┴─────────────────┤  ← 1px #292929
│  SECTION LABEL: ABOUT [02]              │
├─────────────────────────────────────────┤
│                                          │
│  ABOUT / MANIFESTO                       │
│  ─ Statement NH 32px weight 200          │
│  ─ Bio NH 16px #888888                   │
│                                          │
├─────────────────────────────────────────┤  ← 1px #292929
│  FOOTER  (hairline top)                  │
│  Initials                    Email · GH  │
└─────────────────────────────────────────┘
```
