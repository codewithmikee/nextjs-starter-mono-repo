'use client';
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  useForm,
  UseFormReturn
} from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/ui-components';
import { Input } from '@/ui-components';
import { CustomInputProps, DynamicFormInputProps } from '../form-types';
import { useToggle } from '@/hooks/use-toggle';
import { Button } from '@/ui-components';
import { EyeClosed } from 'lucide-react';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import React, { useRef } from 'react';

interface DynamicInputProps<T extends FieldValues>
  extends DynamicFormInputProps<T> {
  field: ControllerRenderProps<T, Path<T>>;
}

export default function DynamicFormInput<T extends FieldValues>({
  field,
  type,
  suffix
}: DynamicInputProps<T>) {
  const isPassword = type == 'password';
  const [passwordShowed, toggleShow, setShowState] = useToggle(!isPassword);

  const typeOfInput = isPassword
    ? passwordShowed
      ? 'text'
      : 'password'
    : type;

  const passwordToggleButton = (
    <Button
      onClick={toggleShow}
      type='button'
      variant={'outline'}
      size={'icon'}
    >
      {passwordShowed ? <EyeClosed /> : <EyeOpenIcon />}
    </Button>
  );
  return (
    <div className='relative flex w-full flex-row items-center'>
      <Input
        className='w-full ring-1 ring-white/50'
        {...field}
        type={typeOfInput}
      />
      {suffix ||
        (isPassword && (
          <span className='absolute inset-y-0 right-0 z-10 flex justify-center pr-2'>
            {isPassword ? passwordToggleButton : suffix}
          </span>
        ))}
    </div>
  );
}

type CustomFormInputProps<T extends FieldValues> = {
  formProps: DynamicFormInputProps<T>;
  field: ControllerRenderProps<T, Path<T>>;
};

export function CustomFormInput<T extends FieldValues>({
  field,
  formProps
}: CustomFormInputProps<T>) {
  const type = formProps.type;
  const suffix = formProps.suffix;
  const isPassword = type == 'password';

  const isNumber = type === 'number';
  const [passwordShowed, toggleShow, setShowState] = useToggle(!isPassword);

  const typeOfInput = isPassword
    ? passwordShowed
      ? 'text'
      : 'password'
    : type;

  const passwordToggleButton = (
    <Button
      onClick={toggleShow}
      type='button'
      variant={'outline'}
      size={'icon'}
    >
      {passwordShowed ? <EyeClosed /> : <EyeOpenIcon />}
    </Button>
  );

  // Create a custom onChange for number inputs:
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumber) {
      // Convert to number. If the value is empty, you may want to pass undefined or 0 depending on your needs.
      const numericValue = e.target.value === '' ? '' : Number(e.target.value);
      field.onChange(numericValue);
    } else {
      field.onChange(e);
    }
  };
  return (
    <div className='relative flex w-full flex-row items-center'>
      <Input
        className='w-full ring-1 ring-white/50'
        {...field}
        type={typeOfInput}
        onChange={handleChange}
        {...formProps.defaultInputProps}
      />
      {suffix ||
        (isPassword && (
          <span className='absolute inset-y-0 right-0 z-10 flex justify-center pr-2'>
            {isPassword ? passwordToggleButton : suffix}
          </span>
        ))}
    </div>
  );
}
