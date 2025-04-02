// import { IPrismaPagination } from '@shared/types';
import { IPrismaPagination } from '@/types';
import { ColumnDef, SortDirection } from '@tanstack/react-table';
import { ReactNode } from 'react';

export type MobileViewConfig<T> = {
  titleKey: keyof T;
  nextToTileColumns?: (keyof T)[];
  headerColumns?: (keyof T)[];
  descriptionColumns?: (keyof T)[];
  gridColumns?: 1 | 2 | 3 | 4;
  renderCustomMobileCard?: (row: T) => React.ReactNode;
  sortableColumns?: Array<{
    key: keyof T; // Will be converted to string when used in sorting
    label: string;
  }>;
};

export type TableFilterConfig<T> = {
  key: keyof T;
  type: 'text' | 'select' | 'custom';
  label: string;
  options?: { label: string; value: string | number }[];
  component?: React.ReactNode;
};

export type AppTableProps<T> = {
  data: T[];
  columns: FlexibleColumnDefinition<T>;
  mobileConfig: MobileViewConfig<T>;
  filters?: TableFilterConfig<T>[];
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  className?: string;
  initialSort?: { column: keyof T; direction: SortDirection };
  backendPagination?: IPrismaPagination;
  searchInput?: ReactNode;
  showColumnFilter?: boolean;
};

export type FlexibleColumnDefinition<T> = {
  mobile: ColumnDef<T>[];
  desktop: ColumnDef<T>[];
};
