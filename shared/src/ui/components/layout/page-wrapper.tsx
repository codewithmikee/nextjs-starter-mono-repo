import React, { PropsWithChildren, ReactNode, Suspense } from 'react';
import PageContainer from './page-container';
import { DataTableSkeleton } from '@/ui-components';
import { Heading, HeadingDescriptions } from '@/ui-components';
import Link from 'next/link';
import { buttonVariants } from '@/ui-components';
import { cn } from '@/lib/utils';
import { Separator } from '@/ui-components';

type Action =
  | {
      href: string;
      label?: string;
      icon?: ReactNode;
    }
  | ReactNode;

type PageProps = {
  title: string;
  description?: string | HeadingDescriptions;
  actions?: Action[];
} & PropsWithChildren;

export const isLinkAction = (
  action: Action
): action is { href: string; label?: string; icon?: ReactNode } => {
  return typeof action === 'object' && action !== null && 'href' in action;
};

export function AppPage({ actions, children, description, title }: PageProps) {
  return (
    // ✅ Added `return`
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title={title} description={description} />
          {actions && actions.length > 0 && (
            <div className='flex gap-2'>
              {actions.map((action, index) =>
                isLinkAction(action) ? (
                  <Link
                    href={action.href}
                    key={`${action.href}-${index}`}
                    className={cn(buttonVariants(), 'text-xs md:text-sm')}
                  >
                    {action.icon} {action.label || 'Add'}
                  </Link>
                ) : (
                  <div key={index}>{action}</div> // ✅ Wrapped ReactNode safely
                )
              )}
            </div>
          )}
        </div>
        <Separator />

        <Suspense
          key={title ?? 'any-title'}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          {children}
        </Suspense>
      </div>
    </PageContainer>
  );
}

export default AppPage;
