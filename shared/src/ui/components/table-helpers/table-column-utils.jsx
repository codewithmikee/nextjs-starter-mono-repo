import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/ui-components';
import { formatETB } from '@/utils/helpers/common-helpers';
// Define column helpers
export const createSortableHeader = (label) => {
    return ({ column }) => (<Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {label}
      <ArrowUpDown className='ml-2 h-4 w-4'/>
    </Button>);
};
export const createCurrencyCell = (key) => {
    return ({ row }) => (<div className='text-center'>{formatETB(row.getValue(key))}</div>);
};
