import { Table, TotalRow } from "@alluxi/design-system";

export function ProjectHours() {
  return (
    <Table>
      <thead>
        <tr>
          <th>Project</th>
          <th>Consultant</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Atlas Migration</td>
          <td>María López</td>
          <td>32.50</td>
        </tr>
        <tr>
          <td>Pelican CRM</td>
          <td>James Carter</td>
          <td>18.00</td>
        </tr>
        <tr>
          <td>Northwind Audit</td>
          <td>Sofía Romero</td>
          <td>27.25</td>
        </tr>
        <TotalRow>
          <td>Total</td>
          <td></td>
          <td>77.75</td>
        </TotalRow>
      </tbody>
    </Table>
  );
}
