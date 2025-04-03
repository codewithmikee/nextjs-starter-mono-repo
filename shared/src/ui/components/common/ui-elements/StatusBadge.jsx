import { cn } from '@/utils';
import { ActiveStatus } from '@/types/api-calls/backend-enums';
// import { getStatusMapForTicketStatus } from '@/utils';
import { AppBadge } from './app-badge';
import { getStatusMapForTicketStatus } from '@/utils/helpers/ui-helpers';
const variantStyles = {
    gray: 'bg-gray-100 text-gray-500 border-gray-200',
    green: 'bg-teal-400 text-green-500 border-green-100',
    yellow: 'bg-yellow-100 text-yellow-500 border-yellow-100',
    red: 'bg-red-100 text-red-500 border-red-100',
    blue: 'bg-blue-100 text-blue-500 border-blue-100',
    purple: 'bg-purple-100 text-purple-500 border-purple-100'
};
export function StatusBadge({ variant = 'gray', className, children, ...props }) {
    return (<span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', variantStyles[variant], className)} {...props}>
      {children}
    </span>);
}
function ActiveStatusBadge({ status }) {
    const isActive = status === ActiveStatus.ACTIVE;
    return (<span className={`${isActive ? 'bg-green-500' : 'bg-red-500'} rounded-sm border-0 px-2 py-0.5 text-[10px] font-bold text-white`}>
      {isActive ? 'Active' : 'In-Active'}
    </span>);
}
export function TicketStatusBadge({ status }) {
    const { label, color } = getStatusMapForTicketStatus(status);
    return (<AppBadge variant={color} size={'verySmall'}>
      {label}
    </AppBadge>);
}
export default ActiveStatusBadge;
