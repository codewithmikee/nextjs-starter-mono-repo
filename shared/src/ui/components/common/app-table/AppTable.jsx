import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { useTableFilter } from './useTableFilter';
import AppTableFilter from './table-filters/app-table-filter';
import DesktopTableView from './table-views/app-table-desktop-view';
import MobileTableView from './table-views/app-table-mobile-view';
import AppTablePagination from './flexible/pagination/app-table-pagination';
export function SimpleAppTable({ columns, titleKey, actionKey, linkGetter, onClick, ...filterProps }) {
    const tableFilter = useTableFilter(filterProps);
    const { pagination, filteredData, hasFilter, defaultItemsPerPage, itemsPerPageOptions, setPagination } = tableFilter;
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { pagination },
        onPaginationChange: setPagination,
        manualPagination: false
    });
    return (<div className='space-y-4'>
      {hasFilter && <AppTableFilter filterProps={tableFilter}/>}

      <div className='hidden md:block'>
        <DesktopTableView columns={columns} table={table}/>
      </div>

      <div className='block md:hidden'>
        <MobileTableView actionKey={actionKey} table={table} titleKey={titleKey} linkGetter={linkGetter} onClick={onClick}/>
      </div>

      <AppTablePagination defaultItemsPerPage={defaultItemsPerPage} itemsPerPageOptions={itemsPerPageOptions} pagination={pagination} setPagination={setPagination} total={filteredData.length}/>
    </div>);
}
