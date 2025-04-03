import * as React from 'react';
import { Table, type ColumnDef, flexRender } from '@tanstack/react-table';
import { Card, CardContent } from '../ui/card';

export function renderMobileTable<TData>(
  table: Table<TData>,
  columns: ColumnDef<TData>[]
) {
  return (
    <div className="space-y-4">
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <Card key={row.id}>
            <CardContent className="p-4">
              <div className="space-y-2">
                {columns.map((column) => {
                  const cell = row.getVisibleCells().find(
                    (cell) => cell.column.id === column.id
                  );
                  if (!cell) return null;

                  return (
                    <div key={column.id} className="flex justify-between">
                      <span className="font-medium">
                        {typeof column.header === 'function'
                          ? column.header({} as any)
                          : column.header}
                      </span>
                      <span>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8">No results.</div>
      )}
    </div>
  );
}
