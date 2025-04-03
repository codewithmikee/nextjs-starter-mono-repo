'use client';

import * as React from 'react';
import {
  ColumnFiltersState,
  PaginationState,
  SortDirection,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender
} from '@tanstack/react-table';

import { AppTableProps } from './table-types';
import { renderMobileCards } from './mobile-table-utils';
import { renderDesktopTable } from './desktop-table-utils';
import { renderDesktopFilters, renderFiltersMobile } from './table-filters';
import { TablePagination } from './table-pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export function FlexibleTable<T extends object>({
  data,
  columns,
  mobileConfig,
  filters = [],
  defaultPageSize = 10,
  className = '',
  initialSort,
  backendPagination,
  showColumnFilter = false,
  searchInput
}: AppTableProps<T>) {
  const { desktop: desktopColumns, mobile: mobileColumns } = columns;

  const initialSorting: SortingState = initialSort
    ? [
        {
          id: String(initialSort.column),
          desc: initialSort.direction === 'desc'
        }
      ]
    : [];

  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize
  });

  // Create tables for both desktop and mobile
  const desktopTable = useReactTable({
    data,
    columns: desktopColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  const mobileTable = useReactTable({
    data,
    columns: mobileColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
      columnFilters
    }
  });

  // Handle mobile sorting
  const [mobileSortColumn, setMobileSortColumn] = React.useState<string | null>(
    initialSort ? String(initialSort.column) : null
  );
  const [mobileSortDirection, setMobileSortDirection] =
    React.useState<SortDirection>(initialSort?.direction || 'asc');

  const handleMobileSortColumnChange = (columnId: string) => {
    setMobileSortColumn(columnId);
    setSorting([{ id: columnId, desc: mobileSortDirection === 'desc' }]);
  };

  const handleMobileSortDirectionChange = (direction: SortDirection) => {
    setMobileSortDirection(direction);
    if (mobileSortColumn) {
      setSorting([{ id: mobileSortColumn, desc: direction === 'desc' }]);
    }
  };

  const [isDescending, setIsDescending] = React.useState<boolean>(
    initialSort?.direction === 'desc'
  );
  const handleDirectionToggle = (checked: boolean) => {
    setIsDescending(checked);
    if (mobileSortColumn) {
      setSorting([{ id: mobileSortColumn, desc: checked }]);
    }
  };

  const columnsToHide = desktopTable
    .getAllColumns()
    .filter((column) => column.getCanHide());
  const isAllSelected = columnsToHide.every((column) => column.getIsVisible());
  const onAllToggle = () =>
    columnsToHide.forEach((column) => column.toggleVisibility(!isAllSelected));

  const showFilterOrColumn = searchInput || showColumnFilter;
  return (
    <div className={`flex w-full flex-col ${className}`}>
      {/* Desktop Table */}
      <div className='hidden w-full flex-col rounded-md border px-2 md:flex'>
        {renderDesktopFilters(filters, desktopTable)}

        {showFilterOrColumn && (
          <div className='flex w-full items-center px-4'>
            {searchInput}

            {showColumnFilter && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='ml-auto'>
                    Columns <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuCheckboxItem
                    className='capitalize'
                    checked={isAllSelected}
                    onCheckedChange={(value: boolean) => onAllToggle()}
                  >
                    All
                  </DropdownMenuCheckboxItem>
                  {desktopTable
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className='capitalize'
                          checked={column.getIsVisible()}
                          onCheckedChange={(value: boolean) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.columnDef.header &&
                          typeof column.columnDef.header == 'string'
                            ? column.columnDef.header?.toString()
                            : column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
        {renderDesktopTable(desktopTable, desktopColumns)}
      </div>

      {/* Mobile Cards */}
      <div className='flex w-full flex-col md:hidden'>
        {renderFiltersMobile(
          filters,
          mobileTable,
          mobileConfig,
          mobileSortColumn,
          setSorting,
          isDescending,
          handleDirectionToggle,
          columnFilters
        )}
        {renderMobileCards(mobileTable, mobileConfig, sorting)}
      </div>

      {/* Pagination for both views */}
      <div className='my-4 flex w-full'>
        {backendPagination ? (
          <QueryBasedPagination
            backendPagination={backendPagination}
            pagination={pagination}
            setPagination={setPagination}
            totalFetchedRecords={data.length}
          />
        ) : (
          <TablePagination
            pagination={pagination}
            setPagination={setPagination}
            defaultItemsPerPage={defaultPageSize}
            total={data.length}
          />
        )}
      </div>
    </div>
  );
}
