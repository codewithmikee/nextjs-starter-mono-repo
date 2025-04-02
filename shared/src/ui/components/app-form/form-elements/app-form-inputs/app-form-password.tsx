// app-form-password.tsx
import { ReactNode, useState } from 'react';
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
import { Button } from '@/ui-components';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import FormElementLayout from '../FormElementLayout';
import { CommonFormElementProps } from '../../form-element-props';

// Base props for the password input
type AppFormPasswordProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  showGenerateButton?: boolean;
  defaultShow?: boolean;
} & CommonFormElementProps;

// Function to generate random password
function generateRandomPassword(length: number = 8): string {
  const charset = 'abcdeZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Simple form password input component that combines all features
export function SimpleFormPassword<T extends FieldValues>({
  formProps: { control, name },
  label,
  placeholder,
  description,
  className,
  disabled,
  defaultShow = true,
  showGenerateButton = false,
  layout
}: AppFormPasswordProps<T>) {
  const [showPassword, setShowPassword] = useState(defaultShow);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className='relative'>
            <FormElementLayout layout={layout} label={label}>
              <div className='flex gap-2'>
                <div className='relative flex-1'>
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder ?? 'Enter password'}
                    disabled={disabled}
                    className='pr-10'
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </Button>
                </div>
                {showGenerateButton && (
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={() => field.onChange(generateRandomPassword())}
                  >
                    <RefreshCw className='mr-2 h-4 w-4' />
                    Gen
                  </Button>
                )}
              </div>
            </FormElementLayout>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <AppFormMessage />
        </FormItem>
      )}
    />
  );
}

// Compound components for more flexible usage
type AppFormPasswordRootProps<T extends FieldValues> = {
  formProps: {
    control: Control<T>;
    name: Path<T>;
  };
  children:
    | ((field: ControllerRenderProps<T, Path<T>>) => ReactNode)
    | ReactNode;
  className?: string;
};

function AppFormPasswordRoot<T extends FieldValues>({
  formProps,
  children,
  className
}: AppFormPasswordRootProps<T>) {
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
export const AppFormPassword = {
  Root: AppFormPasswordRoot,
  Label: FormLabel,
  Input: FormControl,
  Description: FormDescription,
  Message: AppFormMessage
};
