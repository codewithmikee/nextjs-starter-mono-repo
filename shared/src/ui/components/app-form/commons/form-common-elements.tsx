// common-form-elements.ts
import { ReactNode } from 'react';
import { Label } from '@radix-ui/react-label';
import { cn } from '@/utils';

import { FormMessage } from '@/ui-components';
import { Alert, AlertDescription, AlertTitle } from '@/ui-components';
import { AlertCircleIcon } from 'lucide-react';
import { FormAlertProps, FormStatus } from '../form-element-props';
import { Button } from '@/ui-components';
import LoadingIndicator from '@/ui/components/common/LoadingIndicator';

interface AppFormLabelProps {
  content: ReactNode;
  className?: string;
}

export function AppFormLabel({ content, className }: AppFormLabelProps) {
  return typeof content === 'string' ? (
    <Label className={cn('text-sm font-medium', className)}>{content}</Label>
  ) : (
    content
  );
}

type ErrorMessageProps = {
  className?: string;
};

export function AppFormMessage({ className }: ErrorMessageProps) {
  return <FormMessage className={cn('text-red-500', className)} />;
}

export function AppFormAlert({
  variant = 'destructive',
  message
}: FormAlertProps) {
  return (
    <Alert variant={variant}>
      <AlertCircleIcon className='h-4 w-4' />
      <AlertTitle>{variant === 'default' ? 'Success' : 'Error'}</AlertTitle>
      {
        <AlertDescription>
          {typeof message == 'string' ? (
            message
          ) : (
            <ul>
              {' '}
              {message.map((mess, index) => (
                <li key={`${mess}-${index}`}>{mess}</li>
              ))}{' '}
            </ul>
          )}
        </AlertDescription>
      }
    </Alert>
  );
}

// Then use it in your component
export const FormActions = ({
  status,
  disabled,
  onReset,
  buttonProps
}: {
  disabled?: boolean;
  status: FormStatus; // Now TypeScript knows exactly what values status can have
  onReset: () => void;
  buttonProps: {
    showReset?: boolean;
    submitLabel?: string;
    resetLabel?: string;
    submitIcon?: React.ReactNode;
  };
}) => (
  <div className='flex w-full items-center justify-end gap-2'>
    {buttonProps.showReset && (
      <Button
        type='button'
        variant='destructive'
        className='w-full'
        onClick={onReset}
        disabled={disabled || status === 'submitting'}
      >
        {buttonProps.resetLabel ?? 'Reset'}
      </Button>
    )}

    <Button
      type='submit'
      disabled={disabled || status === 'submitting'}
      className={cn('w-full md:max-w-xs', {
        'cursor-not-allowed opacity-50': disabled || status === 'submitting'
      })}
    >
      {status === 'submitting' ? (
        <LoadingIndicator />
      ) : (
        buttonProps.submitIcon && (
          <span className='mr-2'>{buttonProps.submitIcon}</span>
        )
      )}
      {buttonProps.submitLabel}
    </Button>
  </div>
);
