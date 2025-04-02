import * as React from 'react';
import { Input } from '@/ui-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/ui-components';
import {
  ColumnDef,
  flexRender,
  Table as ReactTable
} from '@tanstack/react-table';
import { TableFilterConfig } from './flexible-table-types';

export const renderDesktopTable = <T,>(
  desktopTable: ReactTable<T>,
  desktopColumns: ColumnDef<T>[]
) => {
  return (
    <Table>
      <TableHeader>
        {desktopTable.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} className='text-center'>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {desktopTable.getRowModel().rows.length ? (
          desktopTable.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className='items-center !text-center align-middle'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={desktopColumns.length}
              className='py-16 text-center'
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
