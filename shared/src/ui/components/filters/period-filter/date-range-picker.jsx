'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/ui-components';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui-components';
import { format, startOfToday, endOfToday, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay, differenceInDays } from 'date-fns';
import { useDebounce } from '@/hooks/use-debounce';
import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/ui-components';
import { CustomPeriodFilter } from './custom-period-filter';
export var PeriodOption;
(function (PeriodOption) {
    PeriodOption["TODAY"] = "today";
    PeriodOption["THIS_WEEK"] = "this_week";
    PeriodOption["THIS_MONTH"] = "this_month";
    PeriodOption["LAST_X_DAYS"] = "last_x_days";
    PeriodOption["CUSTOM"] = "custom";
})(PeriodOption || (PeriodOption = {}));
export const PeriodFilter = ({ className, maxCustomDays = 365, debounceDelay = 500 }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const today = startOfToday();
    // Initialize state from URL parameters
    const [period, setPeriod] = useState(() => {
        const paramsStart = searchParams.get('from');
        const paramsEnd = searchParams.get('to');
        if (!paramsStart || !paramsEnd) {
            return {
                option: PeriodOption.TODAY,
                startDate: today,
                endDate: endOfToday(),
                label: 'Today'
            };
        }
        const startDate = new Date(paramsStart);
        const endDate = new Date(paramsEnd);
        const dayDiff = differenceInDays(endDate, startDate);
        if (isSameDay(startDate, today))
            return { option: PeriodOption.TODAY, startDate, endDate, label: 'Today' };
        if (isSameDay(startDate, startOfWeek(today)))
            return {
                option: PeriodOption.THIS_WEEK,
                startDate,
                endDate,
                label: 'This Week'
            };
        if (isSameDay(startDate, startOfMonth(today)))
            return {
                option: PeriodOption.THIS_MONTH,
                startDate,
                endDate,
                label: 'This Month'
            };
        if (dayDiff > 0)
            return {
                option: PeriodOption.LAST_X_DAYS,
                startDate,
                endDate,
                days: dayDiff + 1,
                label: `Last ${dayDiff + 1} Days`
            };
        return { option: PeriodOption.CUSTOM, startDate, endDate, label: 'Custom' };
    });
    const debouncedPeriod = useDebounce(period, debounceDelay);
    const [open, setOpen] = useState(false);
    // Update URL when period changes, but remove query params if "Today" is selected
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (debouncedPeriod.option === PeriodOption.TODAY) {
            router.replace(pathname, { scroll: false }); // Removes query params
            return;
        }
        params.set('from', format(debouncedPeriod.startDate, 'yyyy-MM-dd'));
        params.set('to', format(debouncedPeriod.endDate, 'yyyy-MM-dd'));
        if (debouncedPeriod.option === PeriodOption.LAST_X_DAYS) {
            params.set('days', debouncedPeriod.days?.toString() || '7');
        }
        else {
            params.delete('days');
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [debouncedPeriod]);
    const handleOptionChange = (option) => {
        let newPeriod;
        switch (option) {
            case PeriodOption.TODAY:
                newPeriod = {
                    option,
                    startDate: today,
                    endDate: endOfToday(),
                    label: 'Today'
                };
                break;
            case PeriodOption.THIS_WEEK:
                newPeriod = {
                    option,
                    startDate: startOfWeek(today),
                    endDate: endOfWeek(today),
                    label: 'This Week'
                };
                break;
            case PeriodOption.THIS_MONTH:
                newPeriod = {
                    option,
                    startDate: startOfMonth(today),
                    endDate: endOfMonth(today),
                    label: 'This Month'
                };
                break;
            default:
                return;
        }
        setPeriod(newPeriod);
    };
    const handleCustomDateChange = (range) => {
        if (range.from && range.to) {
            setPeriod({
                option: PeriodOption.CUSTOM,
                startDate: range.from,
                endDate: range.to,
                label: 'Custom'
            });
        }
    };
    const periodOptions = [
        { value: PeriodOption.TODAY, label: 'Today' },
        { value: PeriodOption.THIS_WEEK, label: 'This Week' },
        { value: PeriodOption.THIS_MONTH, label: 'This Month' }
    ];
    return (<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' className='w-[200px] justify-between'>
          {period.label}
          <ChevronsUpDown className='opacity-50'/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {periodOptions.map((item) => (<CommandItem key={item.value} value={item.value} onSelect={() => {
                handleOptionChange(item.value);
                setOpen(false);
            }}>
                  {item.label}
                  {period.option === item.value && (<Check className='ml-auto opacity-100'/>)}
                </CommandItem>))}
              <CommandItem>
                <CustomPeriodFilter onConfirm={handleCustomDateChange}/>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>);
};
