import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

/** Surface container with the brand border, radius, padding and shadow (`.alluxi-card`). */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => (
    <div ref={ref} className={`alluxi-card ${className}`.trim()} {...props} />
  ),
);
Card.displayName = "Card";
