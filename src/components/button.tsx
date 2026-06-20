import * as React from "react";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` is the filled navy action; `secondary` is the bordered surface action. */
  variant?: ButtonVariant;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "alluxi-btn-primary",
  secondary: "alluxi-btn-secondary",
};

/**
 * Brand button. Wraps the `.alluxi-btn-primary` / `.alluxi-btn-secondary`
 * idiom. Renders an icon (e.g. a lucide glyph) inline via children.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={`${variantClass[variant]} ${className}`.trim()}
      {...props}
    />
  ),
);
Button.displayName = "Button";
