import { Textarea } from "@alluxi/design-system";

export function Default() {
  return (
    <div style={{ width: 320 }}>
      <Textarea
        rows={3}
        defaultValue="Kickoff scheduled for Monday. Waiting on the data export from the client before we start the migration dry run."
      />
    </div>
  );
}

export function Placeholder() {
  return (
    <div style={{ width: 320 }}>
      <Textarea rows={3} placeholder="Add a note…" />
    </div>
  );
}
