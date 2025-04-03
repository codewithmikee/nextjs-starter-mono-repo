import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';
const appBadgeVariants = cva('inline-flex items-center border  rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', {
    variants: {
        variant: {
            default: ' text-gray-500 ring-gray-400  shadow hover:text-gray-400',
            green: ' text-green-500 ring-green-400  shadow hover:text-green-400',
            yellow: 'ring-yellow-500 text-yellow-500 ring-yellow-400  shadow hover:text-yellow-400',
            red: ' text-red-500 ring-red-400  shadow hover:text-red-400',
            blue: ' text-blue-500 ring-blue-400  shadow hover:text-blue-400',
            purple: ' text-purple-500 ring-purple-400  shadow hover:bg-purple-400',
            outline: 'text-foreground'
        },
        size: {
            verySmall: 'px-1 !py-0.25 text-[10px]',
            small: 'px-2 !py-0.5 text-xs',
            medium: 'px-3 !py-1 text-sm',
            large: 'px-4 !py-1.5 text-md'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'small'
    }
});
function AppBadge({ className, variant, size, ...props }) {
    return (<span className={cn(appBadgeVariants({ variant, size }), className)} {...props}/>);
}
export { AppBadge, appBadgeVariants };
