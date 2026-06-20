import * as React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Multi-line input sharing the brand `.alluxi-form-input` idiom. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`alluxi-form-input ${className}`.trim()}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
