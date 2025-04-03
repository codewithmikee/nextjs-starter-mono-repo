// mobile-table-filter.tsx
// for mobile version filtering ui
import React from 'react';
import { Input } from '@/ui-components';
import { Button } from '@/ui-components';
import { XCircle, FilterIcon, FilterXIcon } from 'lucide-react';
import { Separator } from '@/ui-components';
import { Badge } from '@/ui-components';
import AppSelect from '../../forms/form-inputs/AppSelect';
import { Collapsible, CollapsibleContent } from '@/ui-components';
import { useToggle } from '@/hooks/use-toggle';
function AppTableFilter({ filterProps }) {
    const { searchQuery, selectedFilters, selectedFiltersCount, hasFilter, hasSelectFilter, searchableColumns, filteredData, filterOptions, setSearchQuery, setSelectedFilters, resetFilters } = filterProps;
    const [isFilterVisible, toggleFilterVisibility, setFilterVisibility] = useToggle();
    if (!hasFilter)
        return null;
    const FilterView = (<div className='flex w-full flex-col gap-2 md:flex-row'>
      {filterOptions.map((filter) => (<AppSelect key={filter.key} value={selectedFilters[filter.key]?.toString() || ''} onValueChange={(val) => setSelectedFilters((prev) => ({
                ...prev,
                [filter.key]: filter.multiple
                    ? Array.isArray(prev[filter.key])
                        ? [...prev[filter.key], val]
                        : [val]
                    : val
            }))} items={filter.options} placeholder={`Filter by ${filter.label}`}/>))}

      <Button onClick={resetFilters} variant='destructive' size='sm' disabled={!hasSelectFilter} className='flex w-full min-w-fit items-center gap-2 md:w-fit'>
        <XCircle className='h-4 w-4'/>
        Reset Filters
      </Button>
    </div>);
    return (<div className='my-2'>
      <div className='grid w-full grid-cols-1 flex-row gap-2 pb-2 md:flex'>
        {/* Search Input */}
        <div className='flex w-full max-w-xs flex-row gap-2'>
          {searchableColumns.length > 0 && (<Input placeholder='Search...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='w-full max-w-xs'/>)}

          {filterOptions && filterOptions?.length > 0 && (<div className='relative md:hidden'>
              <Button variant='secondary' onClick={toggleFilterVisibility} size='icon'>
                {isFilterVisible ? <FilterXIcon /> : <FilterIcon />}
              </Button>
              {hasSelectFilter && filterOptions && filterOptions.length > 0 && (<Badge className='absolute -right-2 -top-2 m-0 p-0 px-1 text-xs/3'>
                  {selectedFiltersCount}
                </Badge>)}
            </div>)}
        </div>

        {filterOptions.length > 0 && (<>
            <span className='block w-full md:hidden'>
              <Collapsible open={isFilterVisible} onOpenChange={setFilterVisibility}>
                <CollapsibleContent className='CollapsibleContent w-full min-w-full'>
                  {FilterView}
                </CollapsibleContent>
              </Collapsible>
            </span>

            <div className='hidden w-full flex-row md:flex'>{FilterView}</div>
          </>)}
      </div>
      <Separator />
    </div>);
}
export default AppTableFilter;
