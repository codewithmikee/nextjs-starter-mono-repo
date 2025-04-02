// app-form-radio.tsx
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
import { AppFormMessage } from '../../commons/form-common-elements';
import { RadioGroup, RadioGroupItem } from '@/ui-components';
import { Label } from '@/ui-components';
import { cn } from '@/lib/utils';

// Types for radio options
export type RadioOption = {
  label: string;
  value: string;
  description?: string;
};

// Base props for the radio input
type AppFormRadioProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  options: RadioOption[];
  orientation?: 'horizontal' | 'vertical';
};

// TODO: FLEX

// Simple form radio input component that combines all features
export function SimpleFormRadio<T extends FieldValues>({
  formProps: { control, name },
  label,
  description,
  className,
  disabled,
  options,
  orientation = 'vertical'
}: AppFormRadioProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
              className={cn(
                orientation === 'horizontal'
                  ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'
                  : 'flex flex-col space-y-2',
                '[&_[data-state=checked]]:bg-orange-500',
                '[&_[data-state=checked]]:border-orange-500',
                'w-full'
              )}
            >
              {options.map((option) => (
                <div key={option.value} className='flex items-start gap-3'>
                  <RadioGroupItem
                    value={option.value}
                    id={`${name}-${option.value}`}
                    className='border-2 border-muted focus:ring-orange-500 focus-visible:ring-orange-500 data-[state=checked]:text-white'
                  />
                  <div className='grid gap-1.5 leading-none'>
                    <Label
                      htmlFor={`${name}-${option.value}`}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className='text-sm text-muted-foreground'>
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <AppFormMessage />
        </FormItem>
      )}
    />
  );
}

// Compound components for more flexible usage
type AppFormRadioRootProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  children:
    | ((field: ControllerRenderProps<T, Path<T>>) => ReactNode)
    | ReactNode;
  className?: string;
};

function AppFormRadioRoot<T extends FieldValues>({
  formProps,
  children,
  className
}: AppFormRadioRootProps<T>) {
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
export const AppFormRadio = {
  Root: AppFormRadioRoot,
  Label: FormLabel,
  Group: RadioGroup,
  Item: RadioGroupItem,
  Description: FormDescription,
  Message: AppFormMessage
};
