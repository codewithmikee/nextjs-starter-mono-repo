import { DateFormatter } from '@/utils/helpers/date-time-helper';
export const addedAtDateColumn = {
    id: 'createdAt',
    order: 7,
    accessorKey: 'createdAt',
    header: 'Joined At',
    descriptionColumn: true,
    cell: ({ row }) => {
        const createdAt = row.getValue('createdAt');
        return (<span className='text-xs/3 italic text-teal-500'>
        {DateFormatter.toShow(createdAt, 'date')}
      </span>);
    }
};
export const addedAtDateTimeColumn = {
    id: 'createdAt',
    order: 7,
    accessorKey: 'createdAt',
    descriptionColumn: true,
    header: 'At',
    cell: ({ row }) => {
        const createdAt = row.getValue('createdAt');
        return (<span className='text-xs/3 italic text-teal-500'>
        {DateFormatter.toShow(createdAt, 'datetime')}
      </span>);
    }
};
