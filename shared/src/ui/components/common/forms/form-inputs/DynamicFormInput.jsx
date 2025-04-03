'use client';
import { Input } from '@/ui-components';
import { useToggle } from '@/hooks/use-toggle';
import { Button } from '@/ui-components';
import { Eye, EyeOff } from 'lucide-react';
import React from 'react';
export default function DynamicFormInput({ field, type, suffix }) {
    const isPassword = type == 'password';
    const [passwordShowed, toggleShow, setShowState] = useToggle(!isPassword);
    const typeOfInput = isPassword
        ? passwordShowed
            ? 'text'
            : 'password'
        : type;
    const passwordToggleButton = (<Button onClick={toggleShow} type='button' variant={'outline'} size={'icon'}>
      {passwordShowed ? <Eye /> : <EyeOff />}
    </Button>);
    return (<div className='relative flex w-full flex-row items-center'>
      <Input className='w-full ring-1 ring-white/50' {...field} type={typeOfInput}/>
      {suffix ||
            (isPassword && (<span className='absolute inset-y-0 right-0 z-10 flex justify-center pr-2'>
            {isPassword ? passwordToggleButton : suffix}
          </span>))}
    </div>);
}
export function CustomFormInput({ field, formProps }) {
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
    const passwordToggleButton = (<Button onClick={toggleShow} type='button' variant={'outline'} size={'icon'}>
      {passwordShowed ? <Eye /> : <EyeOff />}
    </Button>);
    // Create a custom onChange for number inputs:
    const handleChange = (e) => {
        if (isNumber) {
            // Convert to number. If the value is empty, you may want to pass undefined or 0 depending on your needs.
            const numericValue = e.target.value === '' ? '' : Number(e.target.value);
            field.onChange(numericValue);
        }
        else {
            field.onChange(e);
        }
    };
    return (<div className='relative flex w-full flex-row items-center'>
      <Input className='w-full ring-1 ring-white/50' {...field} type={typeOfInput} onChange={handleChange} {...formProps.defaultInputProps}/>
      {suffix ||
            (isPassword && (<span className='absolute inset-y-0 right-0 z-10 flex justify-center pr-2'>
            {isPassword ? passwordToggleButton : suffix}
          </span>))}
    </div>);
}
