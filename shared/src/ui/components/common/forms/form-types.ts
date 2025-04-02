import { InputProps } from '@/ui-components/ui/input';
import { RadioGroupProps } from '@radix-ui/react-radio-group';
import { SelectProps } from '@radix-ui/react-select';
import { HTMLInputTypeAttribute } from 'react';
import {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn
} from 'react-hook-form';
import { z } from 'zod';

export type FieldConfig = {
  name: string;
  label: string;
  description?: string;
  type: 'input' | 'select' | 'radio' | 'hidden' | 'password' | 'generated';
  options?: { value: string; label: string }[];
  dependencies?: string[];
  generateDefault?: () => string;
  hidden?: boolean;
  suffix?: React.ReactNode;
};

export type InputTypeForForm =
  | HTMLInputTypeAttribute
  | 'select'
  | 'radio'
  | 'hidden'
  | 'password'
  | 'generated';

type CommonInput = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<HTMLInputElement>
>;
export interface DynamicInputProps {
  label?: string;
  placeholder?: string;
  description?: string;
  type?: InputTypeForForm;
  options?: { value: string; label: string }[];
  suffix?: React.ReactNode;
  default?: string | any;
  defaultInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  defaultSelectProps?: Partial<SelectProps>;
}
export interface DynamicFormInputProps<T extends FieldValues>
  extends DynamicInputProps {
  name: Path<T>;
  hidden?: boolean;
  dependencies?: Path<T>[]; // Dependencies on other fields
  render?: (value: any, dependencies: any) => React.ReactNode; // Custom render logic
  onSuffixClick?: (setValue: (name: Path<T>, value: any) => void) => void; // Callback to manipulate the field value
  labelDirection?: 'horizontal' | 'vertical';
}

export interface GroupedFormInputProps<T extends FieldValues> {
  display?: 'grid' | 'flex';
  groupTitle: string;
  hidden?: boolean;

  items: (DynamicFormInputProps<T> | GroupedFormInputProps<T>)[];
}

export type CustomFormInputProps<T extends FieldValues> =
  | GroupedFormInputProps<T>
  | DynamicFormInputProps<T>;

// custom types:

export type IFormRender<T extends FieldValues> = (
  form: UseFormReturn<T, any, undefined>
) => React.ReactNode;

export type TSelectType = 'radio' | 'checkbox' | 'select';
export type TFormElementType = 'input' | TSelectType;

export type CustomInputProps =
  | Partial<
      React.ForwardRefExoticComponent<
        InputProps & React.RefAttributes<HTMLInputElement>
      >
    >
  | undefined;

export type CustomFormSelectProps = Partial<React.FC<SelectProps>> | undefined;
export type CustomRadioGroupProps =
  | Partial<
      React.ForwardRefExoticComponent<
        Omit<RadioGroupProps & React.RefAttributes<HTMLDivElement>, 'ref'> &
          React.RefAttributes<HTMLDivElement>
      >
    >
  | undefined;

export type TCustomInputSelectionProps =
  | CustomInputProps
  | CustomFormSelectProps
  | CustomRadioGroupProps;

export type FormElementRenderProps<T extends FieldValues> = {
  formProps: DynamicFormInputProps<T>;
  selectType?: TFormElementType;
  form: UseFormReturn<T, any, undefined>;
};
