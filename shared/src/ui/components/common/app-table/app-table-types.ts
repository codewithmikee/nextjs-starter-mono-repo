import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

export type AppTableFilterProps<TData> = {
  data: TData[];
  filterOptions?: AppFilterOption<TData>[];
  searchableColumns?: (keyof TData)[];
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
};

export type AppTableFilterDataProps<TData> = {
  data: TData[];
  filteredData: TData[];
  filterOptions?: AppFilterOption<TData>[];
  searchableColumns?: (keyof TData)[];
  itemsPerPageOptions: number[];
  defaultItemsPerPage: number;

  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;

  selectedFilters: Record<string, string | string[]>;
  setSelectedFilters: Dispatch<
    SetStateAction<Record<string, string | string[]>>
  >;

  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  selectedFiltersCount: number;

  hasFilter: boolean;
  hasSelectFilter: boolean;
  resetFilters: () => void;
};

export type SimpleAppTableProps<TData, TValue> = {
  columns: AppColumnDef<TData>[];
  titleKey: string;
  actionKey?: string;
  linkGetter?: (row: TData) => string;
  onClick?: (row: TData) => void;
} & AppTableFilterProps<TData>;

export type AppFilterOption<TData> = {
  key: keyof TData;
  label: string;
  options: { value: string; label: string }[];
  multiple?: boolean;
};

export type AppColumnDef<TData> = ColumnDef<TData, any> & {
  id: string;
  nextToTitle?: boolean;
  hideTitleInMobile?: boolean;
  descriptionColumn?: boolean;
  order?: number;
};
