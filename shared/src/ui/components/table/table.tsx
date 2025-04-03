import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from '@tanstack/react-table';
import { TableFilters } from './table-filters';
import { TablePagination } from './table-pagination';
import { renderDesktopTable } from './table-desktop-view';
import { renderMobileTable } from './table-mobile-view';
import { type TableProps } from './table-types';

export function Table<TData>({
  data,
  columns,
  pagination,
  sorting,
  filtering,
  mobile,
  className,
}: TableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sortingState, setSortingState] = React.useState<SortingState>(
    sorting?.initialSort || []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingState,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination: {
        pageIndex: pagination?.pageIndex || 0,
        pageSize: pagination?.pageSize || 10,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updatedSorting) => {
      const newSorting = updatedSorting instanceof Function
        ? updatedSorting(sortingState)
        : updatedSorting;
      setSortingState(newSorting);
      sorting?.onSortChange?.(newSorting);
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const isMobile = mobile?.enabled && (
    mobile.breakpoint
      ? window.innerWidth <= mobile.breakpoint
      : window.innerWidth <= 768
  );

  return (
    <div className={className}>
      {filtering && (
        <TableFilters
          table={table}
          filterOptions={filtering.filterOptions}
        />
      )}
      {isMobile ? renderMobileTable(table, columns) : renderDesktopTable(table, columns)}
      {pagination && (
        <TablePagination
          table={table}
          pageCount={pagination.pageCount}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}
