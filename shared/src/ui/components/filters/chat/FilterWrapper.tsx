'use client';

import { Button } from '@/ui-components';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterWrapperProps {
  children: React.ReactNode;
  hasFilters: boolean;
  filterParams: Record<string, string | null>; // Holds filter values before applying
  setFilterParams: (params: Record<string, string | null>) => void;
}

export function FilterWrapper({
  children,
  hasFilters,
  filterParams,
  setFilterParams
}: FilterWrapperProps) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to apply filters when "Search" button is clicked
  const applyFilters = () => {
    const newParams = new URLSearchParams();

    Object.entries(filterParams).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  // Function to reset all filters
  const resetFilters = () => {
    setFilterParams({});
    router.push('?', { scroll: false });
  };

  return (
    <div className='space-y-4 rounded-lg border p-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>Filters</h3>
        <div className='space-x-2'>
          <Button
            variant='outline'
            disabled={!hasFilters}
            onClick={resetFilters}
          >
            Reset
          </Button>
          <Button variant='outline' onClick={() => setIsVisible(!isVisible)}>
            {isVisible ? 'Hide' : 'Show'}
          </Button>
        </div>
      </div>

      {isVisible && (
        <div className='space-y-4'>
          {children}
          <div className='flex justify-end'>
            <Button variant='default' onClick={applyFilters}>
              Search
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
