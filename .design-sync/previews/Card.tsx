import { Card, Heading, Text, Badge } from "@alluxi/design-system";

export function Default() {
  return (
    <Card style={{ maxWidth: 320 }}>
      <Heading level={3}>Atlas Migration</Heading>
      <Text style={{ marginTop: 4 }}>
        Database cutover for the EU region, targeted for the end of Q3.
      </Text>
    </Card>
  );
}

export function WithBadge() {
  return (
    <Card style={{ maxWidth: 320 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <Heading level={3}>Pelican CRM</Heading>
        <Badge variant="success">On track</Badge>
      </div>
      <Text style={{ marginTop: 4 }}>
        Lead-scoring rollout for the inside-sales team.
      </Text>
    </Card>
  );
}
