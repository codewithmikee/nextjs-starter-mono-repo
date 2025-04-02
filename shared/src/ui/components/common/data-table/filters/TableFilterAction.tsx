'use client';

import { DataTableFilterBox } from '@/ui-components';
// import { DataTableResetFilter } from '@/ui-components';
import { DataTableSearch } from '@/ui-components';
import { DataTableResetFilter } from './data-table-reset-filter';

interface TableFilterActionsProps<T> {
  filterOptions: {
    key: keyof T;
    title: string;
    options: { label: string; value: any }[];
    value: any;
    setValue: (
      value: string | ((old: string) => string | null) | null
    ) => Promise<URLSearchParams>;
  }[];
  isFilterActive: boolean;
  onReset: () => void;
  searchProps?: {
    searchKey: keyof T;
    searchQuery: string;
    setSearchQuery: (
      value: string | ((old: string) => string | null) | null
    ) => Promise<URLSearchParams>;
    setPage: (
      value: string | ((old: string) => string | null) | null
    ) => Promise<URLSearchParams>;
  };
}

export function TableFilterActions<T>({
  filterOptions,
  isFilterActive,
  onReset,
  searchProps
}: TableFilterActionsProps<T>) {
  return (
    <div className='flex flex-wrap items-center gap-4'>
      {/* ✅ Fix: Search should be rendered as an input field, not a dropdown */}
      {searchProps && (
        <DataTableSearch
          searchKey={searchProps.searchKey as string}
          searchQuery={searchProps.searchQuery}
          setSearchQuery={searchProps.setSearchQuery}
          setPage={searchProps.setPage}
        />
      )}
      {filterOptions.map(({ key, title, options, value, setValue }) => (
        <DataTableFilterBox
          key={key as string}
          filterKey={key as string}
          title={title}
          options={options}
          filterValue={value}
          setFilterValue={setValue}
        />
      ))}
      <DataTableResetFilter isFilterActive={isFilterActive} onReset={onReset} />
    </div>
  );
}
