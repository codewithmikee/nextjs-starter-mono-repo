// app-form-date.tsx
'use client';
import { Controller } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/ui-components';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui-components';
import { Button } from '@/ui-components';
import { cn } from '@/utils';
import { format } from 'date-fns';
import { AppFormMessage } from './commons/form-common-elements';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/ui-components';
// Simple form date input component that combines all features
export function SimpleFormDate({ formProps: { control, name }, label, description, className, disabled, placeholder = 'Pick a date', format: dateFormat = 'PPP', fromYear = 1900, toYear = 2100 }) {
    return (<FormField control={control} name={name} render={({ field }) => (<FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant='outline' className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')} disabled={disabled}>
                  {field.value ? (format(field.value, dateFormat)) : (<span>{placeholder}</span>)}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50'/>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar mode='single' selected={field.value} onSelect={field.onChange} disabled={disabled} initialFocus fromYear={fromYear} toYear={toYear} className='rounded-md border'/>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <AppFormMessage />
        </FormItem>)}/>);
}
function AppFormDateRoot({ formProps, children, className }) {
    return (<Controller control={formProps.control} name={formProps.name} render={({ field }) => (<FormItem className={className}>
          {typeof children === 'function' ? children(field) : children}
        </FormItem>)}/>);
}
// Export the compound components
export const AppFormDate = {
    Root: AppFormDateRoot,
    Label: FormLabel,
    Calendar: Calendar,
    Description: FormDescription,
    Message: AppFormMessage
};
