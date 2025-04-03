// types.ts
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
  UseFormReturn
} from 'react-hook-form';

import { z } from 'zod';
import { AxiosResponse } from 'axios';
import { LabelValueProp } from '@/types';

export type CommonFormElementProps = {
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  layout?: 'vertical' | 'horizontal';
};

export type FormSelectContextValue<T extends FieldValues> = {
  field: ControllerRenderProps<T, Path<T>>;
  name: Path<T>;
};

export type FormSelectRootProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  children?: React.ReactNode;
  className?: string;
};

export type FormSelectTriggerProps = {
  placeholder?: string;
  className?: string;
};

export type FormSelectContentProps = {
  options: LabelValueProp[];
  className?: string;
};

export type FormSelectProps<T extends FieldValues> = FormSelectRootProps<T> & {
  label?: string;
  options: LabelValueProp[];
  placeholder?: string;
};

// ---- button props
export type SubmitButtonProps = {
  label?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
};

export type ResetButtonProps = {
  onReset: () => void;
} & SubmitButtonProps;

export type ButtonGroupProps = {
  onReset: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  submitLabel?: string;
  resetLabel?: string;
};

export type TypeHandlerResponse<T> = {
  data?: T;
  errorMessage?: string;
};

export type FormAlertProps = {
  variant?: 'destructive' | 'default' | null;
  message: string | string[];
};

// -----

// --form wrapper props
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export type AppFormWrapperProps<
  TFieldValues extends FieldValues = FieldValues,
  TResponse = unknown
> = {
  children: React.ReactNode;
  form: UseFormReturn<TFieldValues>;
  submitHandler: (data: TFieldValues) => Promise<AxiosResponse<TResponse>>;
  onSuccess?: (response: TResponse) => void;
  onError?: (error: Error) => void;
  buttonProps?: {
    showReset?: boolean;
    submitLabel?: string;
    resetLabel?: string;
    submitIcon?: React.ReactNode;
  };
  layout?: 'vertical' | 'horizontal';
  disabled?: boolean;
  title?: string;
  description?: string;
  showSuccessMessage?: boolean;
  successMessage?: string;
};

// ----

export const testSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  age: z
    .number()
    .min(18, 'Must be at least 18 years old')
    .max(100, 'Must be under 100 years old')
});

export type TestFormValues = z.infer<typeof testSchema>;
