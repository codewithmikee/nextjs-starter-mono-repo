'use client';
import React from 'react';
import { Card, CardContent } from '@/ui-components';
import { Button } from '@/ui-components';
import { useLink } from '@/hooks/useLink';
function UnAuthorizedCard() {
    const { back } = useLink();
    return (<div className='flex h-full w-full items-center justify-center'>
      <Card>
        <CardContent>
          <div className='flex h-screen flex-col items-center justify-center'>
            <h1 className='text-3xl font-bold'>Unauthorized</h1>
            <p className='mt-2 text-lg'>
              You do not have permission to view this page.
            </p>
            <Button onClick={back}>Go Back</Button>
          </div>
        </CardContent>
      </Card>
    </div>);
}
export default UnAuthorizedCard;
