import { Badge } from "@alluxi/design-system";

export function Variants() {
  return (
    <div
      style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}
    >
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="success">On track</Badge>
      <Badge variant="warning">At risk</Badge>
      <Badge variant="danger">Blocked</Badge>
    </div>
  );
}
