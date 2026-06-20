import { ConfirmDialog } from "@alluxi/design-system";

// ConfirmDialog renders a `position: fixed inset-0` overlay. A transformed,
// bounded box becomes the containing block for that fixed layer, so the real
// dialog renders centered inside the card instead of escaping to the page.
const stage = {
  position: "relative" as const,
  transform: "translateZ(0)",
  height: 340,
  width: 560,
  borderRadius: 12,
  overflow: "hidden" as const,
};

export function Danger() {
  return (
    <div style={stage}>
      <ConfirmDialog
        open
        title="Delete project?"
        message="This permanently removes “Atlas Migration” and all of its tasks. This action cannot be undone."
        confirmLabel="Delete project"
        cancelLabel="Keep it"
        variant="danger"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
}

export function Warning() {
  return (
    <div style={stage}>
      <ConfirmDialog
        open
        title="Discard unsaved changes?"
        message="You have unsaved edits to this report. Leaving now will discard them."
        confirmLabel="Discard"
        cancelLabel="Back to editing"
        variant="warning"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  );
}
