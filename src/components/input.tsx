import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Text input styled with the brand `.alluxi-form-input` idiom (border, focus ring, padding). */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={`alluxi-form-input ${className}`.trim()}
      {...props}
    />
  ),
);
Input.displayName = "Input";
