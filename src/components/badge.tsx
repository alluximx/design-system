import * as React from "react";

export type BadgeVariant = "neutral" | "success" | "warning" | "danger";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Status tone, mapped to the brand status tokens. */
  variant?: BadgeVariant;
}

const variantClass: Record<BadgeVariant, string> = {
  neutral: "bg-badge-bg text-accent",
  success: "bg-success-bg text-success-text",
  warning: "bg-warning-bg text-warning-text",
  danger: "bg-danger-bg text-danger-text",
};

/** Small status pill using the brand status background/text token pairs. */
export function Badge({
  variant = "neutral",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${variantClass[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
