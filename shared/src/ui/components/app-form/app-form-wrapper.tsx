import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { Form } from '@/ui-components';
import { CardSkeleton } from '../common/PageSkeleton';
import {
  AppFormWrapperProps,
  FormStatus} from './form-element-props';
import { GENERAL_ERROR_MESSAGE } from '@/constants';
import { Separator } from '@/ui-components';
import { cn } from '@/utils';
import { AppFormAlert, FormActions } from './commons/form-common-elements';
import { getErrorMessage } from '@/lib/api-configurations/api-helpers';
import { z } from 'zod';
import { toast } from 'sonner';
const defaultButtonProps = {
  showReset: false,
  submitLabel: 'Submit',
  resetLabel: 'Reset'
};

// TODOS:
// 1. External input validation

function AppFormWrapper<
  TFieldValues extends FieldValues = FieldValues,
  TResponse = unknown
>({
  children,
  form,
  submitHandler,
  onSuccess,
  onError,
  buttonProps = defaultButtonProps,
  layout = 'vertical',
  disabled = false,
  title,
  description,
  showSuccessMessage = true,
  successMessage = 'Form submitted successfully'
}: AppFormWrapperProps<TFieldValues, TResponse>) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null | string[]>(
    null
  );

  const resetForm = useCallback(() => {
    form.reset();
    setStatus('idle');
    setErrorMessage(null);
  }, [form]);

  const handleSubmit = async (data: TFieldValues) => {
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await submitHandler(data);

      if (!response.data || !response.status.toString().startsWith('2')) {
        setStatus('error');
        setErrorMessage(GENERAL_ERROR_MESSAGE);
        onError?.(new Error(GENERAL_ERROR_MESSAGE));
        return;
      }

      setStatus('success');
      onSuccess?.(response.data as TResponse);

      if (successMessage && successMessage.length > 0) {
        toast.success(successMessage, {
          position: 'top-center'
        });
      }

      // Auto-reset after success (configurable)
      if (showSuccessMessage) {
        setTimeout(resetForm, 3000);
      }
    } catch (error) {
      handleError(error);
    }
  };

  // Add this type guard
  function isZodError(error: any): error is z.ZodError {
    return error instanceof z.ZodError;
  }

  const handleError = (error: any) => {
    if (isZodError(error)) {
      // Handle client-side Zod validation errors
      setStatus('error');
      console.log('ZOD ERROR', error);
      return;
    }

    const message = getErrorMessage(error);

    // Get valid form field keys from Zod schema

    if (Array.isArray(message)) {
      let hasNotMatchingError = false;
      message.forEach((errorMsg) => {
        const formFieldKeys = Object.keys(form.getValues()).map((key) =>
          key.toLocaleLowerCase()
        ) as (keyof TFieldValues)[];
        console.info('Form Field keys', formFieldKeys);

        // Extract field name from error message using regex
        const fieldMatch = errorMsg.match(/^(\w+)\s/);
        if (fieldMatch) {
          const fieldName =
            fieldMatch[1].toLocaleLowerCase() as keyof TFieldValues;

          console.info('fieldName', fieldName);

          // Check if the extracted field name is valid in the schema
          if (formFieldKeys.includes(fieldName)) {
            console.info('Valid Field Detected:', fieldName);

            form.setError(fieldName as any, {
              type: 'manual',
              message: errorMsg
            });
          } else {
            hasNotMatchingError = true;
          }
        }
      });

      if (hasNotMatchingError)
        // for conditions like hidden inputs and other
        setErrorMessage(GENERAL_ERROR_MESSAGE);
    } else {
      setErrorMessage(message);
    }
    setStatus('error');
    onError?.(error as Error);
  };

  return (
    <div className='space-y-2 p-2'>
      {title && (
        <div className='form-header'>
          <h3 className='text-lg font-medium'>{title}</h3>
          {description && (
            <p className='text-sm text-muted-foreground'>{description}</p>
          )}
          <Separator className='my-4' />
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
          {status === 'error' && errorMessage && (
            <AppFormAlert variant='destructive' message={errorMessage} />
          )}

          {status === 'success' && showSuccessMessage && (
            <AppFormAlert variant='default' message={successMessage} />
          )}

          {status === 'submitting' ? (
            <CardSkeleton />
          ) : (
            <div
              className={cn('mb-4 space-y-4 px-2', {
                'grid grid-cols-[1fr_2fr] gap-4': layout === 'horizontal'
              })}
            >
              {children}
            </div>
          )}

          <FormActions
            status={status}
            disabled={disabled}
            onReset={resetForm}
            buttonProps={buttonProps}
          />
        </form>
      </Form>
    </div>
  );
}

export default AppFormWrapper;
