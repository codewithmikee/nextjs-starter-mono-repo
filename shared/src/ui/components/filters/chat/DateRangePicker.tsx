import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/ui-components';
import { Calendar } from '@/ui-components';
import { Button } from '@/ui-components';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

interface DateRangePickerProps {
  paramStart: string;
  paramEnd: string;
  onChange?: (from: Date | null, to: Date | null) => void; // Ensure onChange is correctly typed
}

export function DateRangePicker({
  paramStart,
  paramEnd,
  onChange
}: DateRangePickerProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();

  const handleDateChange = (range: DateRange | undefined) => {
    setSelectedRange(range);

    // Call onChange callback if provided
    if (onChange) {
      onChange(range?.from || null, range?.to || null);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='flex w-full justify-between'>
          {selectedRange?.from && selectedRange?.to
            ? `${format(selectedRange.from, 'yyyy-MM-dd')} - ${format(selectedRange.to, 'yyyy-MM-dd')}`
            : 'Select Date Range'}
          <CalendarIcon className='ml-2 h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto'>
        <Calendar
          mode='range'
          selected={selectedRange}
          onSelect={handleDateChange} // Now correctly assigned
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
