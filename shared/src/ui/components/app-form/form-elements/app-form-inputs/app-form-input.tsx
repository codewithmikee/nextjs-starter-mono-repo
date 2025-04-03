import { ReactNode } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path
} from 'react-hook-form';
import { Input } from '@/ui-components';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/ui-components';
import { AppFormMessage } from '../../commons/form-common-elements';
import { CommonFormElementProps } from '../../form-element-props';
import { cn } from '@/utils';
import FormElementLayout from '../FormElementLayout';

// Base props for the text input
type AppFormInputProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  type?: 'text' | 'email' | 'tel' | 'url';
  className?: string;
} & CommonFormElementProps;

// Simple form input component that combines all features
export function SimpleFormInput<T extends FieldValues>({
  formProps: { control, name },
  label,
  placeholder,
  description,
  type = 'text',
  className,
  disabled,
  layout
}: AppFormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormElementLayout layout={layout} label={label}>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormElementLayout>

          {description && <FormDescription>{description}</FormDescription>}
          <AppFormMessage />
        </FormItem>
      )}
    />
  );
}

// Compound components for more flexible usage
type AppFormInputRootProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  children:
    | ((field: ControllerRenderProps<T, Path<T>>) => ReactNode)
    | ReactNode;
  className?: string;
};

function AppFormInputRoot<T extends FieldValues>({
  formProps,
  children,
  className
}: AppFormInputRootProps<T>) {
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
export const AppFormInput = {
  Root: AppFormInputRoot,
  Label: FormLabel,
  Input: FormControl,
  Description: FormDescription,
  Message: AppFormMessage
};
