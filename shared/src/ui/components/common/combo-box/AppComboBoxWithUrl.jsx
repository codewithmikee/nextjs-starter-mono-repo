'use client';
import * as React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/utils';
import { Button } from '@/ui-components';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui-components';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui-components';
function AppComboBoxWithUrl({ data, labelKey, valueKey, paramKey, placeHolder }) {
    const [open, setOpen] = React.useState(false);
    // Always get the latest search params
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    // Extract current value from URL
    const value = searchParams.get(paramKey) || '';
    // Function to update the URL with the selected value
    const updateUrl = (selectedValue) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        if (selectedValue) {
            currentParams.set(paramKey, selectedValue);
        }
        else {
            currentParams.delete(paramKey);
        }
        // Use router.push instead of replace
        router.push(`${pathname}?${currentParams.toString()}`);
    };
    return (<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between md:max-w-xs'>
          {value
            ? data.find((item) => item[valueKey] === value)?.[labelKey]
            : placeHolder}
          <ChevronsUpDown className='opacity-50'/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0 md:max-w-xs'>
        <Command>
          <CommandInput placeholder='Search...' className='h-9'/>
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (<CommandItem key={item[valueKey]} value={item[valueKey]} onSelect={(currentValue) => {
                const newValue = currentValue === value ? '' : currentValue;
                updateUrl(newValue); // Update URL
                setOpen(false);
            }}>
                  {item[labelKey]}
                  <Check className={cn('ml-auto', value === item[valueKey] ? 'opacity-100' : 'opacity-0')}/>
                </CommandItem>))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>);
}
export default AppComboBoxWithUrl;
