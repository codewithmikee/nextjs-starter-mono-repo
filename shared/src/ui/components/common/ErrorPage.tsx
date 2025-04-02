// components/error-page.tsx
'use client';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/ui-components';
import { Card, CardContent } from '@/ui-components';
import { useRouter } from 'next/navigation';

export function ErrorPage({
  message = 'Something went wrong!',
  onRetry
}: {
  message?: string;
  onRetry?: () => void;
}) {
  const router = useRouter();

  const handleRetry = onRetry ?? router.refresh;
  return (
    <div className='flex min-h-full w-full flex-col items-center justify-center text-center'>
      <Card className='w-full max-w-sm'>
        <CardContent className='flex w-full max-w-lg flex-col items-center justify-center gap-4 p-4 text-center md:p-8'>
          <div className='space-y-2'>
            <AlertTriangle className='mx-auto h-16 w-16 text-destructive' />
            <h1 className='text-4xl font-bold tracking-tight'>Oops!</h1>
            <p className='text-muted-foreground'>{message}</p>
          </div>
          <div className='flex gap-4'>
            {/* <Button variant='outline' onClick={() => window.location.reload()}>
              Refresh Page
            </Button> */}
            <Button onClick={handleRetry}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
