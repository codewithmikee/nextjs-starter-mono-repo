import React, { Dispatch, SetStateAction } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/ui-components';
import { Button } from '@/ui-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  AppTableFilterDataProps,
  AppTableFilterProps
} from '../../app-table-types';
import { useTableFilter } from '../../useTableFilter';
import { PaginationState } from '@tanstack/react-table';

type AppTablePaginationProps<T> = {
  itemsPerPageOptions?: number[];
  defaultItemsPerPage: number;

  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;

  total: number;
};

function AppTablePagination<TData>({
  defaultItemsPerPage,
  itemsPerPageOptions = [],
  pagination,
  setPagination,
  total
}: AppTablePaginationProps<TData>) {
  if (defaultItemsPerPage >= total) return;

  return (
    <div className='flex w-full items-center justify-center py-2'>
      {itemsPerPageOptions && itemsPerPageOptions.length > 0 && (
        <Select
          onValueChange={(val) =>
            setPagination((prev) => ({ ...prev, pageSize: Number(val) }))
          }
          defaultValue={String(pagination.pageSize)}
        >
          <SelectTrigger className='w-24'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {itemsPerPageOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex: Math.max(0, prev.pageIndex - 1)
            }))
          }
          disabled={pagination.pageIndex === 0}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <span className='text-sm'>
          Page {pagination.pageIndex + 1} of{' '}
          {Math.ceil(total / pagination.pageSize)}
        </span>
        <Button
          variant='outline'
          size='sm'
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex: prev.pageIndex + 1
            }))
          }
          disabled={
            pagination.pageIndex >= Math.ceil(total / pagination.pageSize) - 1
          }
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}

export default AppTablePagination;
