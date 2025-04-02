import { Button } from '@/ui-components';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import {
  ButtonGroupProps,
  ResetButtonProps,
  SubmitButtonProps
} from '../form-element-props';

export function SubmitButton({
  label = 'Submit',
  isLoading,
  disabled,
  className
}: SubmitButtonProps) {
  return (
    <Button
      type='submit'
      disabled={disabled || isLoading}
      className={cn('w-full', className)}
    >
      {isLoading ? 'Submitting...' : label}
    </Button>
  );
}

export function ResetButton({
  label = 'Reset',
  onReset,
  disabled,
  className
}: ResetButtonProps) {
  return (
    <Button
      type='button'
      variant='outline'
      disabled={disabled}
      onClick={onReset}
      className={cn('w-full', className)}
    >
      {label}
    </Button>
  );
}

export function ButtonGroup({
  onReset,
  isLoading,
  isDisabled,
  submitLabel,
  resetLabel
}: ButtonGroupProps) {
  return (
    <div className='flex gap-2'>
      <SubmitButton
        isLoading={isLoading}
        disabled={isDisabled}
        label={submitLabel}
      />
      <ResetButton onReset={onReset} disabled={isDisabled} label={resetLabel} />
    </div>
  );
}
