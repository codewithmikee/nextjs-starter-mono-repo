// components/ui/skeleton.tsx
import { Skeleton } from '@/ui-components';

export function PageSkeleton() {
  return (
    <div className='flex h-full w-full flex-col space-y-3'>
      {/* <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gradient-to-r from-muted/50 to-muted" /> */}
      <div className='space-y-2'>
        <Skeleton className='h-8 w-full bg-gradient-to-r from-muted/50 to-muted' />
        <Skeleton className='h-8 w-full bg-gradient-to-r from-muted/50 to-muted' />
      </div>

      {/* Card Grid Skeleton */}
      <div className='mt-8 grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2'>
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className='flex h-full w-full flex-col space-y-3 rounded-lg border p-4'
          >
            <Skeleton className='h-full min-h-[200px] w-full rounded-lg bg-gradient-to-r from-muted/50 to-muted' />
            <Skeleton className='h-6 w-3/4 bg-gradient-to-r from-muted/50 to-muted' />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className='flex flex-col space-y-3 rounded-lg border p-4'>
      <Skeleton className='h-[150px] w-full rounded-lg bg-gradient-to-r from-muted/50 to-muted' />
      <Skeleton className='h-6 w-3/4 bg-gradient-to-r from-muted/50 to-muted' />
      <Skeleton className='h-4 w-full bg-gradient-to-r from-muted/50 to-muted' />
      <Skeleton className='h-4 w-2/3 bg-gradient-to-r from-muted/50 to-muted' />
    </div>
  );
}
