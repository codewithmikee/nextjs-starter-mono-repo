import * as React from 'react';
import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableFilterOption } from './table-types';

interface TableFiltersProps<TData> {
  table: Table<TData>;
  filterOptions?: TableFilterOption<TData>[];
}

export function TableFilters<TData>({
  table,
  filterOptions = []
}: TableFiltersProps<TData>) {
  const [selectedFilter, setSelectedFilter] = React.useState<string | null>(null);

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    table.resetGlobalFilter();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (selectedFilter) {
      table.getColumn(selectedFilter)?.setFilterValue(value);
    } else {
      table.setGlobalFilter(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {filterOptions.length > 0 && (
        <Select
          value={selectedFilter || ''}
          onValueChange={handleFilterChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            {filterOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Input
        placeholder="Search..."
        onChange={handleSearchChange}
        className="max-w-sm"
      />
    </div>
  );
}

export function renderDesktopFilters<TData>(
  filters: TableFilterOption<TData>[],
  table: Table<TData>
) {
  return (
    <div className="flex items-center space-x-2 p-4">
      {filters.map((filter) => {
        if (filter.type === 'custom' && filter.component) {
          return filter.component;
        }

        if (filter.type === 'select' && filter.options) {
          return (
            <Select
              key={filter.key as string}
              onValueChange={(value) => {
                table.getColumn(filter.key as string)?.setFilterValue(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }

        return (
          <Input
            key={filter.key as string}
            placeholder={`Filter ${filter.label}...`}
            value={(table.getColumn(filter.key as string)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(filter.key as string)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        );
      })}
    </div>
  );
}

export function renderFiltersMobile<TData>(
  filters: TableFilterOption<TData>[],
  table: Table<TData>,
  mobileConfig?: any,
  mobileSortColumn?: any,
  setSorting?: any,
  isDescending?: boolean,
  handleDirectionToggle?: any,
  columnFilters?: any
) {
  // Mobile filter implementation
  return (
    <div className="flex flex-col space-y-2 p-4">
      {filters.map((filter) => {
        if (filter.type === 'custom' && filter.component) {
          return filter.component;
        }

        return (
          <Input
            key={filter.key as string}
            placeholder={`Filter ${filter.label}...`}
            value={(table.getColumn(filter.key as string)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(filter.key as string)?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        );
      })}
    </div>
  );
}
