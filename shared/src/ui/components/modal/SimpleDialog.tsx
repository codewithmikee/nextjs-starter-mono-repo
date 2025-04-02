import React, { PropsWithChildren, useState } from 'react';

import { Button } from '@/ui-components';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/ui-components';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ModalBaseProps } from './common-modal-props';

function SimpleDialog({
  trigger,
  triggerLabel = 'Info',
  children,
  title,
  description
}: ModalBaseProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? <Button variant='outline'>{triggerLabel}</Button>}
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        {title || description ? (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        ) : (
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
        )}
        <div className='flex items-center space-x-2'>{children}</div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SimpleDialog;
