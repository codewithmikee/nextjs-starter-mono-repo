import React, { PropsWithChildren, ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/ui-components';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

type SimpleCardProps = {
  header?: {
    title: string;
    description?: string;
    action?: ReactNode;
  };
  footer?: ReactNode;
} & PropsWithChildren;
function SimpleCard({ header, footer, children }: SimpleCardProps) {
  return (
    <Card>
      {header ? (
        <CardHeader>
          <div className='flex flex-row items-center justify-between'>
            {' '}
            <CardTitle>{header.title}</CardTitle>
            {header.action}
          </div>
          <CardDescription>{header.description}</CardDescription>
        </CardHeader>
      ) : (
        <VisuallyHidden>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
        </VisuallyHidden>
      )}
      <CardContent>{children}</CardContent>
      {footer ? (
        <CardFooter>{footer}</CardFooter>
      ) : (
        <VisuallyHidden>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </VisuallyHidden>
      )}
    </Card>
  );
}

export default SimpleCard;
