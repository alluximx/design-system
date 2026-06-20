import { Button } from "@alluxi/design-system";

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export function Primary() {
  return <Button>Save changes</Button>;
}

export function Secondary() {
  return <Button variant="secondary">Cancel</Button>;
}

export function WithIcon() {
  return (
    <Button>
      <PlusIcon /> New project
    </Button>
  );
}

export function Disabled() {
  return <Button disabled>Saving…</Button>;
}
