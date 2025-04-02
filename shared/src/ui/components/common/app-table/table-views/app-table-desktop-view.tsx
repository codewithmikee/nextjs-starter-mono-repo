// MobileTableView.tsx
// for mobile version row rendering
import { flexRender, Table as ReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/ui-components';
import { AppColumnDef } from '../app-table-types';

interface DesktopTableViewProps<TData> {
  table: ReactTable<TData>;
  columns: AppColumnDef<TData>[];
}

export default function DesktopTableView<TData>({
  table,
  columns
}: DesktopTableViewProps<TData>) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='text-center'>
              No results found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
