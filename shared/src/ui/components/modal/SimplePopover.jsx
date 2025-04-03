import { Button } from '@/ui-components';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui-components';
export function SimplePopover({ trigger, triggerLabel, children }) {
    return (<Popover>
      <PopoverTrigger asChild>
        {trigger ? (trigger) : (<Button variant='outline' size='sm'>
            {triggerLabel ?? 'Info'}
          </Button>)}
      </PopoverTrigger>
      <PopoverContent align='center'>
        <div className='grid gap-4'>{children}</div>
      </PopoverContent>
    </Popover>);
}
