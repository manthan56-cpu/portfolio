# Original asset pack

Every file in this folder was generated in-house for this portfolio prototype. There is no
third-party or festival artwork here, so these files are free to publish with the site.

## Ownership and usage

| Folder | Contents | Publishable? |
| :--- | :--- | :--- |
| `assets/original/` (this folder) | Original SVG artwork made for this portfolio | **Yes** |
| `assets/` (parent) | Rendezvous IIT Delhi reference material downloaded for design study | **No — reference only** |

The parent `assets/` folder still holds the 56 festival files. They are kept so the reference
audit stays reproducible, but nothing in `index.html` links to them any more. Do not deploy them.

## File inventory

| File | Used as | Replaces (festival reference) |
| :--- | :--- | :--- |
| `clouds.svg` | Hero drifting cloud band | `Clouds-*.webp` |
| `skyline.svg` | Hero mid-ground city block | `back_tree-*.webp` |
| `skyline-front.svg` | Hero foreground + journey backdrop | `tree-*.webp`, `redfort-*.svg` |
| `sunburst.svg` | Hero burst layer, teal emblem, journey backdrop | `flame-*.webp` |
| `desk.svg` | Hero rising centrepiece, journey object | `India_Gate-*.webp` |
| `data-train.svg` | Hero data train crossing the cable | `Metro-*.webp` |
| `foreground.svg` | Hero framing silhouette | `Front_Trees-*.webp` |
| `terminal.svg` | Cobalt drawer object | `radio-*.webp` |
| `mug.svg` | Crimson drawer object | `chai-*.webp` |
| `paper-top.svg`, `paper-bottom.svg` | Crimson torn-paper edges | `paper-top-*.webp`, `paper-bottom-*.webp` |
| `halftone-waves.svg` | Parchment drawer base | `crowd-*-aligned.webp` |
| `card-1.svg` … `card-4.svg` | Featured-work deck artwork | `tech-art-*.webp`, `business-art-*.webp`, `gaming-art-*.webp`, `lifestyle-art-*.webp` |

The hero cable (the truss the data train runs behind) is drawn in CSS in `styles.css`
(`.cable`) rather than as a file.

## Regenerating or extending

These are hand-authored SVGs using the palette tokens defined at the top of `styles.css`:
`#fad68e`, `#a1001a`, `#7a1c1c`, `#0f0029`, `#011d25`, `#103b8e`, `#f5edd8`, `#f5c928`, `#fbff00`, `#ed4b23`.

Keep to that palette and the 8-10px dark outline convention so new artwork matches the set.
