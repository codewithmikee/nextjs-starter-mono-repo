import { ColumnDef } from '@tanstack/react-table';

export interface TableFilterOption<TData = any> {
  id: string;
  label: string;
  column: ColumnDef<TData>;
}

export interface MobileConfig {
  enabled: boolean;
  breakpoint?: number;
}

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  pagination?: {
    pageSize?: number;
    pageIndex?: number;
    pageCount?: number;
    onPageChange?: (page: number) => void;
  };
  sorting?: {
    initialSort?: {
      id: string;
      desc: boolean;
    }[];
    onSortChange?: (sorting: { id: string; desc: boolean }[]) => void;
  };
  filtering?: {
    initialFilter?: string;
    onFilterChange?: (filter: string) => void;
    filterOptions?: TableFilterOption<TData>[];
  };
  mobile?: MobileConfig;
  className?: string;
}

export interface TableState {
  pageIndex: number;
  pageSize: number;
  sorting: { id: string; desc: boolean }[];
  globalFilter: string;
  columnFilters: { id: string; value: any }[];
}

export type BackendPagination = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
};

export type BackendSorting = {
  id: string;
  desc: boolean;
}[];

export type BackendFiltering = {
  id: string;
  value: any;
}[];

export type BackendTableState = {
  pagination: BackendPagination;
  sorting: BackendSorting;
  filtering: BackendFiltering;
};

export type AppTableProps<TData> = {
  // Core props
  data: TData[];
  columns: {
    desktop: ColumnDef<TData>[];
    mobile: ColumnDef<TData>[];
  };

  // Filtering
  filters?: TableFilterOption<TData>[];
  searchInput?: React.ReactNode;

  // Pagination
  defaultPageSize?: number;
  backendPagination?: BackendPagination;

  // Mobile
  mobileConfig?: MobileConfig;

  // Sorting
  initialSort?: {
    column: keyof TData;
    direction: 'asc' | 'desc';
  };

  // Column Management
  showColumnFilter?: boolean;

  // Styling
  className?: string;
};
