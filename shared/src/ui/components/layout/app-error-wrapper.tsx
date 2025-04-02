// src/components/ui/ErrorBoundary.tsx
'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/ui-components';

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export function AppErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className='rounded-lg border border-destructive/10 bg-destructive/5 p-6'>
      <div className='flex items-center gap-3'>
        <AlertCircle className='h-5 w-5 text-destructive' />
        <h3 className='font-semibold text-destructive'>Something went wrong</h3>
      </div>
      <p className='mt-2 text-sm text-muted-foreground'>{error.message}</p>
      <Button onClick={reset} variant='outline' className='mt-4'>
        Try again
      </Button>
    </div>
  );
}
