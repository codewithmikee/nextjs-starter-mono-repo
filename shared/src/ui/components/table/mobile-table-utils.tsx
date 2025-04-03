import * as React from 'react';
import { Table, ColumnDef, flexRender } from '@tanstack/react-table';
import { MobileConfig } from './table-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function renderMobileCards<TData>(
  table: Table<TData>,
  mobileConfig?: MobileConfig<TData>,
  sorting?: any
) {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {table.getRowModel().rows.map((row) => {
        const title = row.getValue(mobileConfig?.titleKey as string) as string;
        return (
          <Card key={row.id}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {mobileConfig?.sortableColumns?.map((column) => {
                  const value = row.getValue(column.key as string);
                  return (
                    <div key={column.key as string} className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {column.label}
                      </p>
                      <p className="text-sm">{String(value)}</p>
                    </div>
                  );
                })}
              </div>
              <Button
                variant="ghost"
                className="mt-4 w-full"
                onClick={() => row.toggleSelected(!row.getIsSelected())}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

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

export function renderMobileSortButton<TData>(
  column: any,
  label: string
) {
  return (
    <Button
      variant="ghost"
      onClick={column.getToggleSortingHandler()}
      className="w-full justify-between"
    >
      {label}
      {column.getIsSorted() === 'asc' ? (
        <ChevronUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === 'desc' ? (
        <ChevronDown className="ml-2 h-4 w-4" />
      ) : (
        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
      )}
    </Button>
  );
}
