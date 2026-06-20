# @alluxi/design-system

Shared design system for the Alluxi / Axionix suite — the canonical brand tokens
and a small set of React primitives that every app (and the marketing site)
builds on. It is the single source of truth for the Alluxi palette, type scale,
and the `.alluxi-*` component idioms.

- **Tokens** — the full brand vocabulary (colors, surfaces, borders, status
  tones, fonts) as CSS custom properties, mapped into Tailwind v4 with light and
  dark variants.
- **Components** — accessible, ref-forwarding React primitives styled with those
  tokens: buttons, cards, form controls, tables, badges, avatars, dialogs and a
  theme provider.

## Install

```sh
npm install @alluxi/design-system
```

React 18 or 19 is a peer dependency:

```sh
npm install react react-dom
```

## Usage

### 1. Wire up the styles

There are two entry points depending on how you render.

**Apps (Tailwind v4)** — import the source `theme.css` through your own Tailwind
entry so you only ship the utilities you actually use. Point Tailwind at the
package's compiled components so their classes are emitted:

```css
/* app/globals.css */
@import "tailwindcss";
@import "@alluxi/design-system/theme.css";
@source "../../node_modules/@alluxi/design-system/dist";
```

`theme.css` deliberately does **not** pull in `@import "tailwindcss"` or load
fonts — your app owns those. With `next/font`, set `--font-open-sans` and
`--font-manrope`; the tokens defer to them.

**Standalone (no Tailwind build)** — for isolated rendering (previews, docs,
[claude.ai/design](https://claude.ai/design)), import the prebuilt stylesheet,
which carries the full token vocabulary and the fonts:

```ts
import "@alluxi/design-system/styles.css";
```

### 2. Use the components

```tsx
import { Button, Card, Heading, Text, Badge } from "@alluxi/design-system";

export function Example() {
  return (
    <Card>
      <Heading level={2}>Invoices</Heading>
      <Text>Everything billed this period.</Text>
      <Badge variant="success">Paid</Badge>
      <Button variant="primary">New invoice</Button>
    </Card>
  );
}
```

### 3. Dark mode

`ThemeProvider` toggles the `.dark` class on `<html>` and shares the current
theme through context. Persistence is intentionally not built in — bring your
own via `onThemeChange` so the provider stays framework-agnostic:

```tsx
import { ThemeProvider, useTheme } from "@alluxi/design-system";

function App({ children }) {
  return (
    <ThemeProvider
      initialTheme="light"
      onThemeChange={(theme) => document.cookie = `theme=${theme}; path=/`}
    >
      {children}
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return <Button onClick={toggleTheme}>{theme === "dark" ? "Light" : "Dark"}</Button>;
}
```

## Components

| Export | Description |
| --- | --- |
| `Button` | Brand button — `primary` (filled navy) or `secondary` (bordered surface). |
| `Card` | Surface container with the brand border, radius, padding and shadow. |
| `Input` / `Textarea` / `Select` | Form controls on the `.alluxi-form-input` idiom (the brand chevron replaces the native `Select` arrow). |
| `SearchableSelect` | Type-to-filter single select with keyboard navigation. |
| `Heading` | Section heading in the brand type scale (`level` 1–3). |
| `CoverTitle` / `CoverSubtitle` | Large Manrope hero/report headers. |
| `Text` | Body copy in the brand secondary color and size. |
| `Table` / `TotalRow` | Brand data table (navy header, zebra rows) with an emphasized summary row. |
| `Badge` | Status pill — `neutral`, `success`, `warning`, `danger`. |
| `Avatar` / `UnassignedAvatar` | Round avatar with image fallback to stable colored initials. |
| `ConfirmDialog` | Modal confirmation with `danger` / `warning` treatment; self-managed focus and Escape. |
| `ThemeProvider` / `useTheme` | Light/dark theme context (bring your own persistence). |

Every component forwards its native props (and `className`), so you can extend
any of them with Tailwind utilities or standard attributes.

## Develop

```sh
npm run build      # build JS (tsup) + CSS (tailwind) into dist/
npm run dev        # tsup in watch mode
npm run typecheck  # tsc --noEmit
```

Source lives in `src/components` (primitives) and `src/styles` (`theme.css`
tokens + idioms, `index.css` standalone entry). The published package ships
`dist/` plus the source `src/styles`.

## License

MIT © [Alluxi](https://www.alluxi.com)
