import { DateRange } from 'react-day-picker';
import { Calendar } from '@/ui-components';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/ui-components';
import { Button } from '@/ui-components';
import { cn } from '@/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

export type DeepDateRangePickerProps = {
  value?: { start?: string; end?: string };
  onChange: (range: { start?: string; end?: string }) => void;
  className?: string;
};

export const DeepDateRangePicker = ({
  value,
  onChange,
  className
}: DeepDateRangePickerProps) => {
  const dateRange: DateRange = {
    from: value?.start ? new Date(value.start) : undefined,
    to: value?.end ? new Date(value.end) : undefined
  };

  const handleSelect = (range: DateRange | undefined) => {
    onChange({
      start: range?.from?.toISOString(),
      end: range?.to?.toISOString()
    });
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !dateRange?.from && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y')} -{' '}
                  {format(dateRange.to, 'LLL dd, y')}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
