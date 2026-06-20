import { Heading, CoverTitle, CoverSubtitle } from "@alluxi/design-system";

export function Levels() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        maxWidth: 440,
      }}
    >
      <Heading level={1}>Quarterly report</Heading>
      <Heading level={2}>Revenue by client</Heading>
      <Heading level={3}>Top engagements</Heading>
    </div>
  );
}

export function Cover() {
  return (
    <div style={{ maxWidth: 440 }}>
      <CoverTitle>Lernora — Q3 Review</CoverTitle>
      <CoverSubtitle>Projects, hours and revenue</CoverSubtitle>
    </div>
  );
}
