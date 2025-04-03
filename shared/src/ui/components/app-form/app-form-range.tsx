// app-form-range.tsx
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
import { Slider } from '@/ui-components';
import { cn } from '@/utils';
import { AppFormMessage } from './commons/form-common-elements';

// Base props for the range input
type AppFormRangeProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  showValue?: boolean;
  unit?: string;
};

// Simple form range input component that combines all features
export function SimpleFormRange<T extends FieldValues>({
  formProps: { control, name },
  label,
  description,
  className,
  disabled,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
  showValue = true,
  unit = ''
}: AppFormRangeProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              {label && <FormLabel>{label}</FormLabel>}
              {showValue && (
                <span className='w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border'>
                  {field.value || defaultValue}
                  {unit}
                </span>
              )}
            </div>
            <FormControl>
              <Slider
                disabled={disabled}
                min={min}
                max={max}
                step={step}
                value={[field.value || defaultValue]}
                onValueChange={(vals) => field.onChange(vals[0])}
                className={cn(
                  'w-full',
                  disabled && 'cursor-not-allowed opacity-50'
                )}

                // thumbClassName="border-2 border-orange-500 bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none"
                // trackClassName="bg-orange-500"
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <AppFormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

// Compound components for more flexible usage
type AppFormRangeRootProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  children:
    | ((field: ControllerRenderProps<T, Path<T>>) => ReactNode)
    | ReactNode;
  className?: string;
};

function AppFormRangeRoot<T extends FieldValues>({
  formProps,
  children,
  className
}: AppFormRangeRootProps<T>) {
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
export const AppFormRange = {
  Root: AppFormRangeRoot,
  Label: FormLabel,
  Slider: Slider,
  Description: FormDescription,
  Message: AppFormMessage
};
