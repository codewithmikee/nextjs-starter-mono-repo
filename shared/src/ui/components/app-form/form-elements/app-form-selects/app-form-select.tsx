import { ReactNode } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path
} from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/ui-components';
import { Label } from '@/ui-components';
import {
  FormControl,
  FormItem,
  FormDescription,
  FormField,
  FormLabel
} from '@/ui-components';
import { AppFormMessage } from '../../commons/form-common-elements';
import { CommonFormElementProps } from '../../form-element-props';
import { cn } from '@/utils';
import FormElementLayout from '../FormElementLayout';

type AppFormSelectRootProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  children:
    | ((field: ControllerRenderProps<T, Path<T>>) => ReactNode)
    | ReactNode;
  className?: string;
};

function AppFormSelectRoot<T extends FieldValues>({
  formProps,
  children,
  className
}: AppFormSelectRootProps<T>) {
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

//  Label Component
type AppFormSelectLabelProps = {
  children: ReactNode;
  className?: string;
};

function AppFormSelectLabel({ children, className }: AppFormSelectLabelProps) {
  return <Label className={className}>{children}</Label>;
}

//  Trigger Component
type AppFormSelectTriggerProps = {
  placeholder?: string;
  className?: string;
};

function AppFormSelectTrigger({
  placeholder,
  className
}: AppFormSelectTriggerProps) {
  return (
    <FormControl>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
    </FormControl>
  );
}

//  Content Component (Options List)
type AppFormSelectContentProps = {
  options: { label: string; value: string }[];
  className?: string;
};

function AppFormSelectContent({
  options,
  className
}: AppFormSelectContentProps) {
  return (
    <SelectContent className={className}>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  );
}

type SimpleFormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  options: { label: string; value: string }[];
} & CommonFormElementProps;

export function SimpleFormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  description,
  disabled,
  layout
}: SimpleFormSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <span
            className={cn({
              'grid grid-cols-4 items-center': layout && layout == 'horizontal'
            })}
          >
            {label && (
              <FormLabel
                className={cn({
                  'text-right': layout && layout == 'horizontal'
                })}
              >
                {label}
              </FormLabel>
            )}
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
            >
              <FormControl
                className={cn({
                  'col-span-3': layout && layout == 'horizontal'
                })}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={placeholder || 'Select an option'}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className='!z-[110]'>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </span>

          {description && <FormDescription>{description}</FormDescription>}
          <AppFormMessage />
        </FormItem>
      )}
    />
  );
}

//  Group all components together
const AppFormSelect = {
  Root: AppFormSelectRoot,
  Label: AppFormSelectLabel,
  Trigger: AppFormSelectTrigger,
  Content: AppFormSelectContent,
  Description: FormDescription
};

export default AppFormSelect;
