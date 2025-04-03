// app-form-checkbox.tsx
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
import { Checkbox } from '@/ui-components';
import { Label } from '@/ui-components';
import { cn } from '@/utils';

// Types for checkbox options
export type CheckboxOption = {
  label: string;
  value: string;
  description?: string;
};

// Base props for the checkbox input
type AppFormCheckboxProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  options: CheckboxOption[];
  orientation?: 'horizontal' | 'vertical';
};

// Simple form checkbox input component that combines all features
export function SimpleFormCheckbox<T extends FieldValues>({
  formProps: { control, name },
  label,
  description,
  className,
  disabled,
  options,
  orientation = 'vertical'
}: AppFormCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div
              className={cn(
                orientation === 'horizontal'
                  ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'
                  : 'flex flex-col space-y-2',
                'w-full'
              )}
            >
              {options.map((option) => (
                <div key={option.value} className='flex items-start gap-3'>
                  <Checkbox
                    id={`${name}-${option.value}`}
                    disabled={disabled}
                    checked={field.value?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      const currentValues = field.value || [];
                      const newValues = checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(
                            (value: string) => value !== option.value
                          );
                      field.onChange(newValues);
                    }}
                    className='border-2 border-muted data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500'
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
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <AppFormMessage />
        </FormItem>
      )}
    />
  );
}

// Compound components for more flexible usage
type AppFormCheckboxRootProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  children:
    | ((field: ControllerRenderProps<T, Path<T>>) => ReactNode)
    | ReactNode;
  className?: string;
};

function AppFormCheckboxRoot<T extends FieldValues>({
  formProps,
  children,
  className
}: AppFormCheckboxRootProps<T>) {
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
export const AppFormCheckbox = {
  Root: AppFormCheckboxRoot,
  Label: FormLabel,
  Checkbox: Checkbox,
  Description: FormDescription,
  Message: AppFormMessage
};
