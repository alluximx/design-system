import * as React from "react";

export type TableProps = React.TableHTMLAttributes<HTMLTableElement>;

/**
 * Brand data table (`.alluxi-table`): navy header, zebra rows, rounded border.
 * Compose with standard `thead`/`tbody`/`tr`/`th`/`td`; use {@link TotalRow}
 * for an emphasized summary row.
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className = "", children, ...props }, ref) => (
    <table ref={ref} className={`alluxi-table ${className}`.trim()} {...props}>
      {children}
    </table>
  ),
);
Table.displayName = "Table";

/** Emphasized summary row (`.alluxi-total-row`) for totals inside a {@link Table}. */
export function TotalRow({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={`alluxi-total-row ${className}`.trim()} {...props} />;
}
