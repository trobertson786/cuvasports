# CUVA Sports - mobile handoff package

Everything Claude Code needs to implement mobile, 320-767px.

## Start here

`MOBILE_HANDOFF.md` - paste everything below the rule into Claude Code. It is the brief:
breakpoint table, the ten defects and their fixes, type, targets, performance, house
rules, tokens, known content issues, definition of done.

## Files

| File | What it is |
| --- | --- |
| `CUVA Mobile.dc.html` | The board. Both screens at 390 and 430 side by side, the four components that change shape shown desktop beside mobile, and the breakpoint spec in section 3. Open this first. |
| `CUVA Mobile Home.dc.html` | The mobile homepage as a real page. Resize the window to 390 and 430. |
| `CUVA Mobile Report.dc.html` | The mobile match report as a real page. |
| `desktop-reference/` | The settled desktop templates. Reference only. Desktop must be pixel-identical at 1024px and above after the mobile work. |
| `assets/` | Logo lockups. Screenshot PNGs, to be replaced with `cuva-mark.svg` and `cuva-mark-white.svg` before launch. |
| `support.js`, `image-slot.js` | Runtime for the reference files so they open in a browser. Not part of the implementation. |

Open the HTML files directly in a browser. No build step, no server.

## How to read the designs

They are written with inline styles so every value reads straight from the markup:
sizes, colours, spacing, aspect ratios, target heights. Read the values out and
implement against the existing components as Tailwind breakpoints. Do not port the
reference markup as-is.

The board sets `--cuva-h1` on each frame, 32px at 390 and 34px at 430. That is the only
value that differs between the two widths.

## Not solved by layout

- Twelve of eighty-one reports have no photograph. The text-forward card makes that
  degrade honestly, but Football will keep looking thinner than Cricket until there are
  real pictures.
- Logos are screenshot crops. The compact lockup runs at 38px on mobile, where a bitmap
  softens most.
- The MDX source records eleven goalkeeper saves. The prose and both designs say ten.
  Correct the source, not the designs.
