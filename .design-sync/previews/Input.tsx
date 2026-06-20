import { Input } from "@alluxi/design-system";

export function Default() {
  return (
    <div style={{ width: 280 }}>
      <Input placeholder="Search projects…" />
    </div>
  );
}

export function WithValue() {
  return (
    <div style={{ width: 280 }}>
      <Input defaultValue="Atlas Migration" />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: 280 }}>
      <Input defaultValue="Locked field" disabled />
    </div>
  );
}
