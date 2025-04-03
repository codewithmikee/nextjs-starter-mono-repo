import React from 'react';
import { Input } from '@/ui-components';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui-components';
import { ArrowDown, ArrowUp, FilterIcon } from 'lucide-react';
import { Button } from '@/ui-components';
import { Label } from '@/ui-components';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/ui-components';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
// pass generic type T to filter
export const renderDesktopFilters = (filters, desktopTable) => {
    return (<div className='flex w-full flex-wrap items-center gap-2 py-4'>
      {renderFilters(filters, desktopTable)}
    </div>);
};
// pass generic type T to filter
const renderFilters = (filters, desktopTable) => {
    return (<span>
      {filters.map((filter, index) => {
            if (filter.type === 'text') {
                return (<Input key={index} placeholder={`Search ${filter.label}...`} value={desktopTable
                        .getColumn(filter.key)
                        ?.getFilterValue() ?? ''} onChange={(event) => desktopTable
                        .getColumn(filter.key)
                        ?.setFilterValue(event.target.value)} className='w-full md:max-w-xs'/>);
            }
            else if (filter.type === 'select' && filter.options) {
                return (<select key={index} value={desktopTable
                        .getColumn(filter.key)
                        ?.getFilterValue() ?? ''} onChange={(event) => desktopTable
                        .getColumn(filter.key)
                        ?.setFilterValue(event.target.value)} className='max-w-sm rounded-md border p-2'>
              <option value=''>All {filter.label}</option>
              {filter.options.map((option, optIndex) => (<option key={optIndex} value={option.value}>
                  {option.label}
                </option>))}
            </select>);
            }
            else if (filter.type === 'custom' && filter.component) {
                return (<React.Fragment key={index}>{filter.component}</React.Fragment>);
            }
            return null;
        })}
    </span>);
};
export const renderFiltersMobile = (filters, mobileTable, mobileConfig, sortColumn, setSorting, isDescending, handleDirectionToggle, columnFilters) => {
    const selectFilters = filters
        .filter((filter) => filter.type === 'select')
        .map((filter) => filter.key);
    const isFilterBySelectSelected = (columnFilters ?? [])
        .map((filter) => filter.id)
        .filter((filterKey) => selectFilters.includes(filterKey));
    return (<div className='flex w-full flex-col gap-2 py-2'>
      <div className='flex w-full flex-row gap-2'>
        <div className='w-full flex-grow'>
          {renderFilters(filters.filter((fl) => fl.type == 'text'), mobileTable)}
        </div>
        {filters.length > 0 && (<Sheet>
            <SheetTrigger className='relative w-fit'>
              {isFilterBySelectSelected.length > 0 && (<span className='absolute right-0 top-0 inline-flex h-10 w-10 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                  {isFilterBySelectSelected.length}
                </span>)}

              <FilterIcon color='orange'/>
            </SheetTrigger>
            <SheetContent side={'bottom'} className='h-[80vh] overflow-y-auto'>
              <SheetHeader>
                <SheetTitle>Filter and Sort</SheetTitle>
              </SheetHeader>
              <VisuallyHidden>
                <SheetDescription></SheetDescription>
              </VisuallyHidden>

              <div className='flex w-full flex-col gap-2'>
                {renderFilters(filters.filter((fl) => fl.type != 'text'), mobileTable)}
              </div>
            </SheetContent>
          </Sheet>)}
      </div>

      {renderMobileSorting(mobileConfig.sortableColumns || [], sortColumn, (columnId) => setSorting([{ id: columnId, desc: isDescending }]), isDescending, handleDirectionToggle)}
    </div>);
};
export const renderMobileSorting = (sortableColumns, mobileSortColumn, handleMobileSortColumnChange, isDescending, handleDirectionToggle) => {
    if (!sortableColumns || sortableColumns.length === 0)
        return null;
    return (<div className='flex w-full flex-wrap items-center justify-end gap-2 text-xs'>
      <div className='flex flex-row items-center gap-2'>
        <Label>Sort By</Label>
        <Select value={mobileSortColumn || ''} onValueChange={handleMobileSortColumnChange}>
          <SelectTrigger className='w-fit border-none py-0'>
            <SelectValue placeholder='Select column'/>
          </SelectTrigger>
          <SelectContent>
            {sortableColumns.map((column) => (<SelectItem key={String(column.key)} value={String(column.key)}>
                {column.label}
              </SelectItem>))}
          </SelectContent>
        </Select>
      </div>
      {mobileSortColumn && (<div className='col-span-1 flex flex-row items-center space-x-2'>
          <Button variant={'outline'} className='m-0 flex w-fit items-center space-x-1 p-0 px-2' onClick={() => handleDirectionToggle(!isDescending)}>
            <ArrowUp className={`h-5 w-5 ${!isDescending ? 'text-primary' : 'text-muted-foreground'}`}/>
            <ArrowDown className={`h-5 w-5 ${isDescending ? 'text-primary' : 'text-muted-foreground'}`}/>
          </Button>
        </div>)}
    </div>);
};
