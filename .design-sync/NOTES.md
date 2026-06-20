# axionix-ds — design-sync notes

Synced to claude.ai/design project **Lernora Design System** (`97baa4a8-1914-46ba-a318-b040c81d5938`), `window.AxionixDS`, 17 components.

## Build gotchas
- **Always run the full `npm run build`** (cfg.buildCmd) before the converter. tsup's `clean: true` wipes `dist/` on `build:js`, so running `build:js` alone deletes `dist/styles.css`; the converter then can't find `cssEntry` and falls back to a self-styling stub (`[CSS_RUNTIME]`) → an unstyled bundle. `npm run build` runs `build:js && build:css` and always ends with `styles.css` present. Re-syncs run buildCmd automatically.
- The **full brand token vocabulary** is force-emitted into the standalone `dist/styles.css` via `@source inline(...)` blocks in `src/styles/index.css` (designs in claude.ai/design consume only that compiled CSS, so utilities Tailwind didn't otherwise use must be safelisted). Apps do NOT import that entry — they import `theme.css` and stay lean. If you rename a token in `theme.css`, update the inline safelist too or it won't ship.

## Component previews
- **ConfirmDialog** renders a `position: fixed inset-0` overlay. Its preview wraps each story in a `transform: translateZ(0)` bounded box so the fixed layer is contained inside the card (otherwise it escapes to the page top and clips the title). Override: `cardMode: column`.
- **SearchableSelect** open dropdown is interaction-driven; previews show the closed selected/empty states only.
- **ThemeProvider** ships the floor card by design (non-visual provider). **UnassignedAvatar** auto-renders from default props (no authored preview needed).

## Known render warns
- None outstanding (render check 17/17 clean; 0 bad / 0 thin / 0 variants-identical).

## Re-sync risks (watch-list)
- **Fonts load via a remote Google Fonts `@import`** in `styles.css` (Open Sans + Manrope) — they are NOT bundled as files (`[FONT_REMOTE]`, expected). If offline/sandboxed rendering ever matters, vendor the woff2s via `cfg.extraFonts`.
- The bundle inlines **React** and **lucide-react** (the latter is a package dep; only ConfirmDialog uses it). A lucide-react major bump could change those icons.
- `globalName` is **AxionixDS** — keep stable across syncs.
- Grades are carried forward via the project's `_ds_sync.json`. A major DS version bump warrants a `--force` re-grade.
- The `alluxi-*` CSS prefix is the company brand (intentionally not renamed for the Lernora marketing rebrand).
