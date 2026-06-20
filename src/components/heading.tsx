import * as React from "react";

export type HeadingLevel = 1 | 2 | 3;

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 1 → `.alluxi-h1` (underlined section title), 2 → `.alluxi-h2`, 3 → `.alluxi-h3`. */
  level?: HeadingLevel;
}

const levelClass: Record<HeadingLevel, string> = {
  1: "alluxi-h1",
  2: "alluxi-h2",
  3: "alluxi-h3",
};

/** Section heading in the brand type scale. Renders the matching `h1`–`h3` tag. */
export function Heading({ level = 1, className = "", ...props }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return (
    <Tag className={`${levelClass[level]} ${className}`.trim()} {...props} />
  );
}

/** Large Manrope cover title (`.alluxi-cover-title`) for hero/report headers. */
export function CoverTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={`alluxi-cover-title ${className}`.trim()} {...props} />
  );
}

/** Blue Manrope cover subtitle (`.alluxi-cover-subtitle`). */
export function CoverSubtitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`alluxi-cover-subtitle ${className}`.trim()} {...props} />
  );
}
