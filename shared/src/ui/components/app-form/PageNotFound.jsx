'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui-components';
export default function PageNotFoundCard({ message }) {
    const router = useRouter();
    return (<div className='absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center'>
      <span className='bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent'>
        404
      </span>
      <h2 className='font-heading my-2 text-2xl font-bold'>{message}</h2>
      <p>Try refreshing the page or go back</p>
      <div className='mt-8 flex justify-center gap-2'>
        <Button onClick={() => router.refresh} variant='default' size='lg'>
          Refresh
        </Button>
        <Button onClick={() => router.back()} variant='default' size='lg'>
          Go back
        </Button>
      </div>
    </div>);
}
