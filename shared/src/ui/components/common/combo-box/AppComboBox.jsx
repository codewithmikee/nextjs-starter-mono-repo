'use client';
import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/utils';
import { Button } from '@/ui-components';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/ui-components';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui-components';
import { useQueryParams } from '@/hooks/use-query-params';
function AppComboBox({ data, labelKey, valueKey, queryKey, onChange, selectedValue, placeHolder }) {
    const [open, setOpen] = React.useState(false);
    const isControlled = !!onChange;
    const queryParamHandler = useQueryParams();
    // Get the value from state or query param
    const [value, setValue] = React.useState(selectedValue ??
        (queryKey ? queryParamHandler.getParam(queryKey) : '') ??
        '');
    // Sync external value if it changes
    React.useEffect(() => {
        setValue(selectedValue ??
            (queryKey ? queryParamHandler.getParam(queryKey) : '') ??
            '');
    }, [selectedValue, queryKey]);
    // Selection logic
    const handleOnChange = (selected) => {
        setValue(selected);
        if (isControlled) {
            onChange?.(selected);
        }
        else if (queryKey) {
            if (selected.length === 0) {
                queryParamHandler.removeParam(queryKey);
            }
            else {
                queryParamHandler.setParam(queryKey, selected);
            }
        }
    };
    return (<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-full max-w-xs items-center justify-between'>
          {value
            ? data.find((item) => value === item[valueKey])[labelKey]
            : placeHolder}
          <div className='flex items-center gap-2'>
            {value && (<X className='h-4 w-4 cursor-pointer opacity-50 hover:opacity-100' onClick={(e) => {
                e.stopPropagation();
                handleOnChange('');
            }}/>)}
            <ChevronsUpDown className='opacity-50'/>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full max-w-xs p-0'>
        <Command>
          <CommandInput placeholder={placeHolder ?? 'Search'} className='h-9'/>
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (<CommandItem key={item[valueKey]} value={item[valueKey]} onSelect={() => {
                handleOnChange(item[valueKey]);
                setOpen(false);
            }}>
                  {item[labelKey]}
                  <Check className={cn('ml-auto', value === item[valueKey]
                ? 'opacity-100'
                : 'opacity-0')}/>
                </CommandItem>))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>);
}
export default AppComboBox;
