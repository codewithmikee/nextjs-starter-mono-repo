import { useCallback, useMemo, useState } from 'react';
import { PaginationState } from '@tanstack/react-table';
import {
  AppTableFilterDataProps,
  AppTableFilterProps
} from './app-table-types';

export function useTableFilter<T>({
  data,
  filterOptions = [],
  searchableColumns = [],
  defaultItemsPerPage = 10,
  itemsPerPageOptions = [5, 10, 20]
}: AppTableFilterProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string | string[]>
  >({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultItemsPerPage
  });

  // Apply filters
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        (searchableColumns.length === 0 ||
          searchableColumns.some((key) =>
            String(item[key]).toLowerCase().includes(searchQuery.toLowerCase())
          )) &&
        filterOptions.every((filter) => {
          const selected = selectedFilters[filter.key as string];
          if (!selected || selected.length === 0) return true;
          const itemValue = item[filter.key];
          if (Array.isArray(selected)) {
            return selected.some((sel) => String(itemValue) === sel);
          }
          return String(itemValue) === selected;
        })
      );
    });
  }, [data, searchQuery, selectedFilters, searchableColumns, filterOptions]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFilters({});
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset pagination
  };

  const selectedFiltersCount = Object.keys(selectedFilters).filter(
    (key): boolean => (selectedFilters[key] ?? []).length > 0
  ).length;
  const hasSelectFilter = Object.keys(selectedFilters).some(
    (key): boolean => (selectedFilters[key] ?? []).length > 0
  );

  const hasFilter = searchableColumns.length > 0 || filterOptions.length > 0;

  const dataToReturn: AppTableFilterDataProps<T> = {
    filteredData,
    data,
    searchQuery,
    selectedFilters,
    pagination,
    selectedFiltersCount,
    defaultItemsPerPage: defaultItemsPerPage ?? 10,
    hasFilter,
    hasSelectFilter,
    searchableColumns,
    filterOptions,
    itemsPerPageOptions: itemsPerPageOptions ?? [],
    resetFilters,
    setSearchQuery,
    setPagination,
    setSelectedFilters
  };

  return dataToReturn;
}
