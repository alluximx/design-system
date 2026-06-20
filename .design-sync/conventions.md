# Lernora / Axionix Design System — how to build with it

The **Alluxi** brand library (package `@alluxi/design-system`) used across the Lernora/Axionix product suite. Build with the exported React components; use the brand **token utility classes** for your own layout glue. It is a **Tailwind CSS v4** system — the tokens below are real Tailwind utilities generated from the bundled `styles.css`, not arbitrary names.

## Setup & wrapping

No provider is required for styling — the tokens are global CSS custom properties and apply as soon as `styles.css` is loaded. Components render correctly on their own.

**Dark mode** is driven by a `dark` class on a root element (`<html>` or a wrapper). Every token below is dark-aware and flips automatically. To make it interactive, wrap the tree in `ThemeProvider` (it toggles the `dark` class and exposes `useTheme()` → `{ theme, toggleTheme, setTheme }`); pass `initialTheme="light" | "dark"`. Without it, the UI is light by default — that's fine.

```tsx
import { ThemeProvider } from "@alluxi/design-system"; // optional, only for dark-mode toggling
<ThemeProvider initialTheme="light">{children}</ThemeProvider>
```

## Styling idiom — use the token utilities, never hard-coded colors

Style your own layout with these Tailwind utilities (real names from the compiled stylesheet). They are the design language — prefer them over raw hex or Tailwind palette colors like `zinc-*`:

| Role | Utilities |
|---|---|
| Page / surfaces | `bg-background`, `bg-surface`, `bg-surface-alt`, `bg-surface-hover`, `bg-surface-subtle`, `bg-surface-raised` |
| Text | `text-foreground` (primary), `text-secondary`, `text-dim` (muted), `text-accent` (brand blue) |
| Borders / dividers | `border-stroke`, `border-stroke-light`, `divide-stroke` |
| Brand fills | `bg-primary` (navy), `text-primary`, `bg-badge-bg`, `text-accent-orange` |
| Status (bg+text pairs) | `bg-success-bg`/`text-success-text`, `bg-warning-bg`/`text-warning-text`, `bg-danger-bg`/`text-danger-text` |
| Type | `font-sans` (Open Sans, body), `font-heading` (Manrope) |

When a brand token covers a case, **drop the `dark:` variant** — the token already handles both themes (`bg-surface`, not `bg-white dark:bg-zinc-900`).

## Components over classes

The library wraps the brand's component idioms — reach for the component, not the raw class:

- **Actions:** `Button` (`variant="primary" | "secondary"`)
- **Containers / type:** `Card`, `Heading` (`level={1|2|3}`), `Text`, `CoverTitle`, `CoverSubtitle`
- **Forms:** `Input`, `Textarea`, `Select`, `SearchableSelect` (type-to-filter)
- **Data:** `Table` + `TotalRow` (navy header, zebra rows, emphasized totals)
- **Status / identity:** `Badge` (`variant="neutral" | "success" | "warning" | "danger"`), `Avatar` / `UnassignedAvatar`
- **Overlay:** `ConfirmDialog` (`variant="danger" | "warning"`, drive with `open`)

## Where the truth lives

The bound `styles.css` (and its `@import "./_ds_bundle.css"`) is the full token + class source — read it before inventing styles. Each component ships a `<Name>.d.ts` (its prop contract) and `<Name>.prompt.md` (usage). Lean on those.

## One idiomatic snippet

```tsx
import { Card, Heading, Text, Badge, Button } from "@alluxi/design-system";

<Card>
  <div className="flex items-center justify-between gap-3">
    <Heading level={3}>Atlas Migration</Heading>
    <Badge variant="success">On track</Badge>
  </div>
  <Text className="mt-1">Database cutover for the EU region, due end of Q3.</Text>
  <div className="mt-4 flex justify-end gap-2 border-t border-stroke pt-3">
    <Button variant="secondary">View report</Button>
    <Button>Open project</Button>
  </div>
</Card>
```
