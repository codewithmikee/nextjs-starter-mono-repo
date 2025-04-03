// components/filters/period-filter.tsx
'use client';
import { useState } from 'react';
import { Button } from '@/ui-components';
import { Calendar } from '@/ui-components';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui-components';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui-components';
import { cn } from '@/utils';
import { addDays, format, startOfToday, startOfWeek, startOfMonth, endOfWeek, endOfMonth } from 'date-fns';
import { CalendarIcon, ChevronDown } from 'lucide-react';
export var PeriodOption;
(function (PeriodOption) {
    PeriodOption["TODAY"] = "today";
    PeriodOption["THIS_WEEK"] = "this_week";
    PeriodOption["THIS_MONTH"] = "this_month";
    PeriodOption["LAST_X_DAYS"] = "last_x_days";
    PeriodOption["CUSTOM"] = "custom";
})(PeriodOption || (PeriodOption = {}));
export const BasePeriodFilter = ({ value, onChange, className, maxCustomDays = 365 }) => {
    const [customOpen, setCustomOpen] = useState(false);
    const [tempDays, setTempDays] = useState(value.days?.toString() || '7');
    const handleOptionChange = (option) => {
        const today = startOfToday();
        switch (option) {
            case PeriodOption.TODAY:
                onChange({
                    option,
                    startDate: today,
                    endDate: today
                });
                break;
            case PeriodOption.THIS_WEEK:
                onChange({
                    option,
                    startDate: startOfWeek(today),
                    endDate: endOfWeek(today)
                });
                break;
            case PeriodOption.THIS_MONTH:
                onChange({
                    option,
                    startDate: startOfMonth(today),
                    endDate: endOfMonth(today)
                });
                break;
            case PeriodOption.LAST_X_DAYS:
                const days = parseInt(tempDays) || 7;
                onChange({
                    option,
                    startDate: addDays(today, -days),
                    endDate: today,
                    days
                });
                break;
            case PeriodOption.CUSTOM:
                setCustomOpen(true);
                break;
        }
    };
    const handleCustomDateChange = (range) => {
        if (range.start && range.end) {
            onChange({
                option: PeriodOption.CUSTOM,
                startDate: range.start,
                endDate: range.end
            });
        }
    };
    const getDisplayText = () => {
        switch (value.option) {
            case PeriodOption.TODAY:
                return 'Today';
            case PeriodOption.THIS_WEEK:
                return 'This Week';
            case PeriodOption.THIS_MONTH:
                return 'This Month';
            case PeriodOption.LAST_X_DAYS:
                return `Last ${value.days} Days`;
            case PeriodOption.CUSTOM:
                return `${format(value.startDate, 'MMM dd')} - ${format(value.endDate, 'MMM dd')}`;
        }
    };
    return (<div className={cn('flex items-center gap-2', className)}>
      <Select value={value.option} onValueChange={(value) => handleOptionChange(value)}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select period'/>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={PeriodOption.TODAY}>Today</SelectItem>
          <SelectItem value={PeriodOption.THIS_WEEK}>This Week</SelectItem>
          <SelectItem value={PeriodOption.THIS_MONTH}>This Month</SelectItem>
          <SelectItem value={PeriodOption.LAST_X_DAYS}>Last X Days</SelectItem>
          <SelectItem value={PeriodOption.CUSTOM}>Custom Range</SelectItem>
        </SelectContent>
      </Select>

      {value.option === PeriodOption.LAST_X_DAYS && (<input type='number' min='1' max={maxCustomDays} value={tempDays} onChange={(e) => {
                const days = Math.min(parseInt(e.target.value) || 1, maxCustomDays);
                setTempDays(days.toString());
                handleOptionChange(PeriodOption.LAST_X_DAYS);
            }} className='w-20 rounded border px-2 py-1'/>)}

      {value.option === PeriodOption.CUSTOM && (<Popover open={customOpen} onOpenChange={setCustomOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' className={cn('w-[280px] justify-start text-left font-normal', !value.startDate && 'text-muted-foreground')}>
              <CalendarIcon className='mr-2 h-4 w-4'/>
              {getDisplayText()}
              <ChevronDown className='ml-auto h-4 w-4 opacity-50'/>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar mode='range' selected={{ from: value.startDate, to: value.endDate }} onSelect={(range) => {
                if (range?.from && range?.to) {
                    handleCustomDateChange({
                        start: range.from,
                        end: range.to
                    });
                    setCustomOpen(false);
                }
            }} numberOfMonths={2} disabled={{ after: new Date() }}/>
          </PopoverContent>
        </Popover>)}

      {value.option !== PeriodOption.CUSTOM && (<div className='text-sm text-muted-foreground'>
          {format(value.startDate, 'MMM dd')} -{' '}
          {format(value.endDate, 'MMM dd')}
        </div>)}
    </div>);
};
