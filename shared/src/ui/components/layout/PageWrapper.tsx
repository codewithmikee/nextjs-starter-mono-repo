import React, { PropsWithChildren } from 'react';
import { Heading } from '@/ui-components';
import PageContainer from './page-container';
import { Separator } from '@radix-ui/react-separator';
import { useId } from 'react';
import { PageSkeleton } from '../common/PageSkeleton';
import { ErrorPage } from '../common/ErrorPage';

type PageWrapperProps = {
  title: string;
  description?: string;
  headerAction?: React.ReactNode;
  action?: React.ReactNode;
  isLoading?: boolean;
  error?: string;
  onRetry?: () => void;
};
function PageWrapper({
  title,
  description,
  headerAction,
  action,
  children,
  isLoading,
  error,
  onRetry
}: PageWrapperProps & PropsWithChildren) {
  const key = useId();

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title={title} description={description ?? ''} />
          {headerAction}
        </div>
        <Separator />
        {action}
        {isLoading ? <PageSkeleton /> : error ? <ErrorPage /> : children}
      </div>
    </PageContainer>
  );
}

export default PageWrapper;
