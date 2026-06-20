import * as React from "react";

function initials(
  name: string | null | undefined,
  email: string | null | undefined,
): string {
  const source = (name && name.trim()) || (email ?? "");
  if (!source) return "?";
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

// Deterministic background color from the name/email so each person keeps a
// stable avatar color (Jira-style).
const COLORS = [
  "#0086ff", "#6554c0", "#00857a", "#e8601c", "#bf2600",
  "#403294", "#008da6", "#2a7e2e", "#a54800", "#5243aa",
];
function colorFor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1)
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return COLORS[hash % COLORS.length];
}

export interface AvatarProps {
  name?: string | null;
  email?: string | null;
  /** Optional image URL; falls back to colored initials when absent. */
  image?: string | null;
  /** Pixel size of the square avatar. */
  size?: number;
  title?: string;
}

/** Round user avatar: renders the image when given, else stable colored initials. */
export function Avatar({ name, email, image, size = 24, title }: AvatarProps) {
  const label = title ?? name ?? email ?? "Unassigned";
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={label}
        title={label}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  const seed = (email || name || "?").toLowerCase();
  return (
    <span
      title={label}
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        background: colorFor(seed),
        fontSize: size * 0.42,
      }}
    >
      {initials(name, email)}
    </span>
  );
}

/** Empty/unassigned placeholder ring. */
export function UnassignedAvatar({ size = 24 }: { size?: number }) {
  return (
    <span
      title="Unassigned"
      className="inline-flex shrink-0 items-center justify-center rounded-full border border-dashed border-stroke-input text-foreground/40"
      style={{ width: size, height: size, fontSize: size * 0.5 }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.6}
        height={size * 0.6}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
      </svg>
    </span>
  );
}
