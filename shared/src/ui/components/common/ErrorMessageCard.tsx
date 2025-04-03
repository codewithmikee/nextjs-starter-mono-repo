import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/ui-components';
import { GENERAL_ERROR_MESSAGE } from '@/constants';

type ErrorCardProps = {
  message?: string;
  title?: string;
};

export function ErrorMessageCard({ message, title }: ErrorCardProps) {
  return (
    <Alert variant='destructive'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>{title ?? 'Error'}</AlertTitle>
      <AlertDescription>{message ?? GENERAL_ERROR_MESSAGE}</AlertDescription>
    </Alert>
  );
}
