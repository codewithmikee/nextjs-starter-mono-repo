import React from 'react';
import { cn } from '@/utils';
import { FormControl, FormLabel } from '@/ui-components';
function FormElementLayout({ description, label, layout, children }) {
    return (<span className={cn({
            'grid grid-cols-4 items-center': layout && layout == 'horizontal'
        })}>
      {label && (<FormLabel className={cn({
                'text-right': layout && layout == 'horizontal'
            })}>
          {label}
        </FormLabel>)}
      <FormControl className={cn({
            'col-span-3': layout && layout == 'horizontal'
        })}>
        {children}
      </FormControl>
    </span>);
}
export default FormElementLayout;
