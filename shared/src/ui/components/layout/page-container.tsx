import React from 'react';
import { ScrollArea } from '@/ui-components';

export default function PageContainer({
  children,
  scrollable = true
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className='h-[calc(100dvh-52px)] w-full'>
          <div className='flex w-full flex-1 p-2 md:px-6'>{children}</div>
        </ScrollArea>
      ) : (
        <div className='flex w-full flex-1 p-2 md:px-6'>{children}</div>
      )}
    </>
  );
}
