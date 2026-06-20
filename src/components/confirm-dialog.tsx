import * as React from "react";
import { useEffect, useRef } from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

export type ConfirmVariant = "danger" | "warning";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantConfig: Record<
  ConfirmVariant,
  {
    icon: typeof Trash2;
    iconWrapperClass: string;
    iconClass: string;
    confirmButtonClass: string;
  }
> = {
  danger: {
    icon: Trash2,
    iconWrapperClass: "bg-red-50 text-red-600",
    iconClass: "h-6 w-6",
    confirmButtonClass:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/30",
  },
  warning: {
    icon: AlertTriangle,
    iconWrapperClass: "bg-amber-50 text-amber-600",
    iconClass: "h-6 w-6",
    confirmButtonClass:
      "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500/30",
  },
};

/**
 * Modal confirmation dialog with a danger/warning treatment. Self-managed
 * focus and Escape handling; render it conditionally and drive with `open`.
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const config = variantConfig[variant];
  const Icon = config.icon;

  useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onCancel();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-message"
    >
      <div className="w-full max-w-md animate-[dialog-enter_150ms_ease-out] overflow-hidden rounded-2xl bg-surface shadow-2xl">
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.iconWrapperClass}`}
            >
              <Icon className={config.iconClass} />
            </div>
            <div className="min-w-0 pt-0.5">
              <h3
                id="confirm-dialog-title"
                className="text-[11pt] font-bold text-foreground"
              >
                {title}
              </h3>
              <p
                id="confirm-dialog-message"
                className="mt-1.5 text-[10pt] leading-relaxed text-secondary"
              >
                {message}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-stroke bg-surface-alt px-6 py-4">
          <button
            ref={cancelRef}
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-stroke bg-surface px-4 py-2 text-[10pt] font-semibold text-foreground transition hover:bg-surface-hover disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[10pt] font-semibold transition focus:outline-none focus:ring-2 disabled:opacity-60 ${config.confirmButtonClass}`}
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
