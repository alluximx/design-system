import { SearchableSelect } from "@alluxi/design-system";

const OPTIONS = [
  { value: "atlas", label: "Atlas Migration" },
  { value: "pelican", label: "Pelican CRM" },
  { value: "northwind", label: "Northwind Audit" },
];

export function Selected() {
  return (
    <div style={{ width: 280 }}>
      <SearchableSelect
        value="atlas"
        onChange={() => {}}
        options={OPTIONS}
        placeholder="Select a project…"
      />
    </div>
  );
}

export function Empty() {
  return (
    <div style={{ width: 280 }}>
      <SearchableSelect
        value=""
        onChange={() => {}}
        options={OPTIONS}
        placeholder="Select a project…"
      />
    </div>
  );
}
