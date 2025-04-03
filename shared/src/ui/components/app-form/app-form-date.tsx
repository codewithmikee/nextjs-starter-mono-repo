// app-form-date.tsx
'use client';

import { ReactNode } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path
} from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/ui-components';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/ui-components';
import { Button } from '@/ui-components';
import { cn } from '@/utils';
import { format } from 'date-fns';
import { AppFormMessage } from './commons/form-common-elements';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/ui-components';

// Base props for the date input
type AppFormDateProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  format?: string;
  fromYear?: number;
  toYear?: number;
};

// Simple form date input component that combines all features
export function SimpleFormDate<T extends FieldValues>({
  formProps: { control, name },
  label,
  description,
  className,
  disabled,
  placeholder = 'Pick a date',
  format: dateFormat = 'PPP',
  fromYear = 1900,
  toYear = 2100
}: AppFormDateProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                  disabled={disabled}
                >
                  {field.value ? (
                    format(field.value, dateFormat)
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabled}
                initialFocus
                fromYear={fromYear}
                toYear={toYear}
                className='rounded-md border'
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <AppFormMessage />
        </FormItem>
      )}
    />
  );
}

// Compound components for more flexible usage
type AppFormDateRootProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  children:
    | ((field: ControllerRenderProps<T, Path<T>>) => ReactNode)
    | ReactNode;
  className?: string;
};

function AppFormDateRoot<T extends FieldValues>({
  formProps,
  children,
  className
}: AppFormDateRootProps<T>) {
  return (
    <Controller
      control={formProps.control}
      name={formProps.name}
      render={({ field }) => (
        <FormItem className={className}>
          {typeof children === 'function' ? children(field) : children}
        </FormItem>
      )}
    />
  );
}

// Export the compound components
export const AppFormDate = {
  Root: AppFormDateRoot,
  Label: FormLabel,
  Calendar: Calendar,
  Description: FormDescription,
  Message: AppFormMessage
};
