import * as React from 'react';
import { Table } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TablePaginationProps<TData> {
  table: Table<TData>;
  pageCount?: number;
  onPageChange?: (page: number) => void;
}

export function TablePagination<TData>({
  table,
  pageCount,
  onPageChange,
}: TablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = pageCount || Math.ceil(table.getFilteredRowModel().rows.length / table.getState().pagination.pageSize);

  const handlePageChange = (page: number) => {
    table.setPageIndex(page - 1);
    onPageChange?.(page);
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
