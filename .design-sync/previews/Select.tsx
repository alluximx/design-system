import { Select } from "@alluxi/design-system";

export function Default() {
  return (
    <div style={{ width: 240 }}>
      <Select defaultValue="active">
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="done">Completed</option>
      </Select>
    </div>
  );
}
