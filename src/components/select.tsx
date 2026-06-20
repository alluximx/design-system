import * as React from "react";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Native select styled with `.alluxi-form-input`. The brand chevron replaces
 * the OS arrow automatically via the `select.alluxi-form-input` rule.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => (
    <select
      ref={ref}
      className={`alluxi-form-input ${className}`.trim()}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";
