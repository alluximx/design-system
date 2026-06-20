import * as React from "react";

export type TextProps = React.HTMLAttributes<HTMLParagraphElement>;

/** Body copy in the brand secondary color and type size (`.alluxi-body`). */
export function Text({ className = "", ...props }: TextProps) {
  return <p className={`alluxi-body ${className}`.trim()} {...props} />;
}
