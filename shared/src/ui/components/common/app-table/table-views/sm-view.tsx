// SmTableView.tsx
// for mobile version row rendering
import { flexRender, Table as ReactTable } from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/ui-components';
import { AppColumnDef } from '../app-table-types';
import React from 'react';

interface SmTableViewProps<TData> {
  table: ReactTable<TData>;
  titleKey: string; // Key for the title column
  actionKey: string; // Key for the action column
}

export function SmTableView<TData>({
  table,
  titleKey,
  actionKey
}: SmTableViewProps<TData>) {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const columnDef = header.column.columnDef as AppColumnDef<TData>;
              // Hide the title in mobile if `hideTitleInMobile` is true
              if (columnDef.hideTitleInMobile) return null;
              return (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => {
            const titleCell = row
              .getVisibleCells()
              .find((cell) => cell.column.id === titleKey);
            const actionCell = row
              .getVisibleCells()
              .find((cell) => cell.column.id === actionKey);
            const descriptionCells = row.getVisibleCells().filter((cell) => {
              const columnDef = cell.column.columnDef as AppColumnDef<TData>;
              return columnDef.descriptionColumn;
            });
            const otherCells = row.getVisibleCells().filter((cell) => {
              const columnDef = cell.column.columnDef as AppColumnDef<TData>;
              return (
                cell.column.id !== titleKey &&
                cell.column.id !== actionKey &&
                !columnDef.descriptionColumn
              );
            });

            return (
              <React.Fragment key={row.id}>
                {/* First Sub-row: Title, Descriptions, and Action */}
                <TableRow className='border-x border-b-0'>
                  {titleCell && (
                    <TableCell colSpan={descriptionCells.length + 1}>
                      {flexRender(
                        titleCell.column.columnDef.cell,
                        titleCell.getContext()
                      )}
                    </TableCell>
                  )}
                  {descriptionCells.map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {actionCell && (
                    <TableCell>
                      {flexRender(
                        actionCell.column.columnDef.cell,
                        actionCell.getContext()
                      )}
                    </TableCell>
                  )}
                </TableRow>

                {/* Second Sub-row: Remaining Columns */}
                <TableRow className='border-x'>
                  {otherCells.map((cell) => (
                    <TableCell key={cell.id}>
                      <span className='flex flex-col'>
                        <span className='text-xs/4 font-medium text-muted-foreground'>
                          {String(cell.column.columnDef.header)}
                        </span>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </span>
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
            );
          })
        ) : (
          <TableRow>
            <TableCell
              colSpan={table.getAllColumns().length}
              className='text-center'
            >
              No results found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
