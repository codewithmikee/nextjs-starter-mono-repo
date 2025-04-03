'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/ui-components';
// import { DateRangePicker } from "./DateRangePicker"; // Existing Date Picker
import { format, startOfWeek, startOfMonth, subDays } from 'date-fns';
import { DateRangePicker } from './DateRangePicker';
export function PeriodFilter({ onChange }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [customRange, setCustomRange] = useState({
        from: null,
        to: null
    });
    const applyFilters = () => {
        let fromDate = null;
        let toDate = null;
        const today = new Date();
        if (selectedPeriod === 'custom' && customRange.from && customRange.to) {
            fromDate = customRange.from;
            toDate = customRange.to;
        }
        else {
            switch (selectedPeriod) {
                case 'today':
                    fromDate = today;
                    toDate = today;
                    break;
                case 'this_week':
                    fromDate = startOfWeek(today, { weekStartsOn: 1 }); // Monday start
                    toDate = today;
                    break;
                case 'this_month':
                    fromDate = startOfMonth(today);
                    toDate = today;
                    break;
                case 'last_7_days':
                    fromDate = subDays(today, 7);
                    toDate = today;
                    break;
                case 'last_30_days':
                    fromDate = subDays(today, 30);
                    toDate = today;
                    break;
            }
        }
        const formattedFrom = fromDate ? format(fromDate, 'yyyy-MM-dd') : null;
        const formattedTo = toDate ? format(toDate, 'yyyy-MM-dd') : null;
        if (onChange) {
            // Call custom handler if provided
            onChange(formattedFrom, formattedTo);
        }
        else {
            // Default behavior: update URL query params
            const newParams = new URLSearchParams(searchParams.toString());
            if (formattedFrom)
                newParams.set('from', formattedFrom);
            else
                newParams.delete('from');
            if (formattedTo)
                newParams.set('to', formattedTo);
            else
                newParams.delete('to');
            router.push(`?${newParams.toString()}`, { scroll: false });
        }
    };
    return (<div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Select Period</h3>

      <div className='grid grid-cols-3 gap-2'>
        {[
            { label: 'Today', value: 'today' },
            { label: 'This Week', value: 'this_week' },
            { label: 'This Month', value: 'this_month' },
            { label: 'Last 7 Days', value: 'last_7_days' },
            { label: 'Last 30 Days', value: 'last_30_days' },
            { label: 'Custom', value: 'custom' }
        ].map(({ label, value }) => (<Button key={value} variant={selectedPeriod === value ? 'default' : 'outline'} onClick={() => setSelectedPeriod(value)}>
            {label}
          </Button>))}
      </div>

      {selectedPeriod === 'custom' && (<DateRangePicker paramStart='from' paramEnd='to' onChange={(from, to) => setCustomRange({ from, to })}/>)}

      <div className='flex justify-end'>
        <Button onClick={applyFilters}>Apply</Button>
      </div>
    </div>);
}
