import { Button } from '@/ui-components';
import { TableCell, TableRow, Table, TableBody, TableHead, TableHeader } from '@/ui-components';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/ui-components';
export function ErrorTable({ columns = 10, rows = 10, onRetry, error }) {
    return (<div className='relative h-full w-full space-y-4'>
      <div className='absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center'>
        <Alert variant='destructive' className='w-full'>
          <AlertCircle className='h-4 w-4'/>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'Failed to load data. Please try again.'}

            <Button onClick={onRetry} className='gap-2'></Button>
          </AlertDescription>
        </Alert>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columns }).map((_, i) => (<TableHead key={i} className='h-10'>
                  <div className='h-4 w-24 animate-pulse rounded bg-muted'/>
                </TableHead>))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (<TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (<TableCell key={colIndex} className='h-16'>
                    <div className='h-4 w-full animate-pulse rounded bg-muted opacity-50'/>
                  </TableCell>))}
              </TableRow>))}
          </TableBody>
        </Table>
      </div>

      <div className='flex justify-center'>
        <Button onClick={onRetry} className='gap-2'>
          <AlertCircle className='h-4 w-4'/>
          Try Again
        </Button>
      </div>
    </div>);
}
