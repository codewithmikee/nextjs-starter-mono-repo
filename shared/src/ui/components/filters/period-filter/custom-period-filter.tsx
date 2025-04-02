'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/ui-components';
import { Calendar } from '@/ui-components';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/ui-components';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/ui-components';

export function CustomPeriodFilter({
  onConfirm
}: {
  onConfirm: (range: { from?: Date; to?: Date }) => void;
}) {
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>Custom Date</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Pick Custom Date</DialogTitle>
        </DialogHeader>
        <div className='flex gap-4'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline'>
                {startDate ? format(startDate, 'MMM dd') : 'Pick Start Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode='single'
                selected={startDate}
                onSelect={setStartDate}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline'>
                {endDate ? format(endDate, 'MMM dd') : 'Pick End Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode='single'
                selected={endDate}
                onSelect={setEndDate}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button
          onClick={() => onConfirm({ from: startDate, to: endDate })}
          disabled={!startDate || !endDate}
        >
          Filter
        </Button>
      </DialogContent>
    </Dialog>
  );
}
