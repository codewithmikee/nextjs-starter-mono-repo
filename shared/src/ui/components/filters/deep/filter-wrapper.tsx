import { Button } from '@/ui-components';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/ui-components';
import { cn } from '@/utils';
import { ChevronsUpDown, X } from 'lucide-react';
import { ReactNode, useState } from 'react';

type DeepFilterWrapperProps = {
  children: ReactNode;
  onReset: () => void;
  hasFilters: boolean;
  className?: string;
};

export const DeepFilterWrapper = ({
  children,
  onReset,
  hasFilters,
  className
}: DeepFilterWrapperProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn('space-y-4 rounded-lg border p-4', className)}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <CollapsibleTrigger asChild>
            <Button variant='ghost' size='sm' className='gap-1'>
              Filters
              <ChevronsUpDown className='h-4 w-4' />
            </Button>
          </CollapsibleTrigger>
          {hasFilters && (
            <Button variant='ghost' size='sm' onClick={onReset}>
              <X className='mr-1 h-4 w-4' />
              Reset
            </Button>
          )}
        </div>
      </div>
      <CollapsibleContent className='space-y-4'>
        <div className='flex flex-wrap items-end gap-4'>{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};
