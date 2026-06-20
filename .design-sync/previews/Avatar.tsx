import { Avatar, UnassignedAvatar } from "@alluxi/design-system";

export function Initials() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="María López" size={40} />
      <Avatar name="James Carter" size={40} />
      <Avatar name="Sofía Romero" size={40} />
      <Avatar name="Wei Chen" size={40} />
    </div>
  );
}

export function Unassigned() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar name="María López" size={40} />
      <UnassignedAvatar size={40} />
    </div>
  );
}
