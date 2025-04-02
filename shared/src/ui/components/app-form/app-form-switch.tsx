// app-form-switch.tsx
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
import { Switch } from '@/ui-components';
import { Label } from '@/ui-components';
import { AppFormMessage } from './commons/form-common-elements';

// Base props for the switch input
type AppFormSwitchProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  thumbColor?: string;
  activeColor?: string;
};

// Simple form switch input component that combines all features
export function SimpleFormSwitch<T extends FieldValues>({
  formProps: { control, name },
  label,
  description,
  className,
  disabled,
  thumbColor = 'bg-white',
  activeColor = 'bg-orange-500'
}: AppFormSwitchProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className='flex flex-row items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              {label && <FormLabel className='text-base'>{label}</FormLabel>}
              {description && <FormDescription>{description}</FormDescription>}
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
                className={`${field.value ? activeColor : 'bg-input'}`}
              />
            </FormControl>
          </div>
          <AppFormMessage />
        </FormItem>
      )}
    />
  );
}

// Compound components for more flexible usage
type AppFormSwitchRootProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  children:
    | ((field: ControllerRenderProps<T, Path<T>>) => ReactNode)
    | ReactNode;
  className?: string;
};

function AppFormSwitchRoot<T extends FieldValues>({
  formProps,
  children,
  className
}: AppFormSwitchRootProps<T>) {
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
export const AppFormSwitch = {
  Root: AppFormSwitchRoot,
  Label: FormLabel,
  Switch: Switch,
  Description: FormDescription,
  Message: AppFormMessage
};
