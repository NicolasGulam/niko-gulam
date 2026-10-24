# Cómo agregar un proyecto

No hace falta tocar componentes. En desarrollo, al guardar se recarga solo.

## 1. Imagen (y video, si hay)

Poné los archivos en `public/projects/`:

- Foto o captura: `.webp` (ideal) o `.jpg` / `.png`
- Video del preview (opcional): `.mp4` corto, silenciado, pensado para loop

Nombres en minúsculas, sin espacios: `mi-proyecto.webp`

## 2. Cargá el proyecto

Abrí `src/content/projects.json` y sumá un objeto al array (el orden es el de la grilla; el número 01, 02, 03 se arma solo).

Campos:

| Campo | Qué es |
| --- | --- |
| `id` | Identificador único, en kebab-case (`mi-proyecto`) |
| `title` | Nombre del proyecto (igual en los dos idiomas) |
| `kind` | `"web"` o `"game"` (cambia el fondo de la card) |
| `category` | `es` / `en` — etiqueta naranja |
| `meta` | `es` / `en` — texto chico arriba a la derecha de la captura |
| `description` | `es` / `en` — párrafo de la card |
| `tags` | Tecnologías **reales** del repo (no inventar) |
| `image.src` | Ruta pública, empieza con `/projects/` |
| `image.alt` | `es` / `en` — describe lo que se ve, no el nombre del archivo |
| `image.width` / `height` | Tamaño real del archivo |
| `image.video` | Opcional. Si está, la captura pasa a ser el poster |
| `image.overlay` | Opcional. Logo encima del preview (como Insanity) |
| `href` | URL pública. **Si todavía no hay, no lo pongas** |
| `note` | `es` / `en` — se muestra en lugar del link cuando no hay `href` |

Ejemplo mínimo sin link:

```json
{
  "id": "mi-proyecto",
  "title": "Mi proyecto",
  "kind": "web",
  "category": { "es": "DESARROLLO WEB", "en": "WEB DEVELOPMENT" },
  "meta": { "es": "EN CURSO", "en": "IN PROGRESS" },
  "description": {
    "es": "Qué es y para quién.",
    "en": "What it is and who it is for."
  },
  "tags": ["Next.js", "TypeScript"],
  "image": {
    "src": "/projects/mi-proyecto.webp",
    "alt": {
      "es": "Descripción de la captura.",
      "en": "Description of the screenshot."
    },
    "width": 1440,
    "height": 900
  },
  "note": {
    "es": "AÚN NO PUBLICADO",
    "en": "NOT PUBLISHED YET"
  }
}
```

Cuando tenga URL pública, agregá `"href": "https://…"` y sacá `note`.

## 3. Otros textos

- Trayectoria: `src/content/career.json`
- Sobre mí: `src/content/about.json`
- Textos de la interfaz (nav, form, botones): `src/i18n/copy.ts`

Identidad y links (email, LinkedIn, NTK): `src/data/site.ts`

## Reglas de contenido

- No inventar tecnologías, fechas ni URLs.
- Si no hay link público, no pongas `href`.
- Cada texto con `es` / `en` tiene que existir en los dos idiomas.
- Un JSON inválido (coma de más, comillas mal cerradas) rompe el sitio: el error de `next dev` te marca la línea.
