import { Table, TotalRow } from "@alluxi/design-system";

export function InTable() {
  return (
    <Table>
      <tbody>
        <tr>
          <td>Subtotal</td>
          <td>$12,400.00</td>
        </tr>
        <tr>
          <td>Tax (16%)</td>
          <td>$1,984.00</td>
        </tr>
        <TotalRow>
          <td>Total</td>
          <td>$14,384.00</td>
        </TotalRow>
      </tbody>
    </Table>
  );
}
