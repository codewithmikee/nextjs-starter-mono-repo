import { AppColumnDef } from '@/ui/components/common/app-table/app-table-types';
import { DateOrString } from '@/types/general-types';
  import { DateFormatter } from '@/utils/helpers/date-time-helper';

export const addedAtDateColumn: AppColumnDef<
  { createdAt: DateOrString } & any
> = {
  id: 'createdAt',
  order: 7,
  accessorKey: 'createdAt',
  header: 'Joined At',
  descriptionColumn: true,

  cell: ({ row }) => {
    const createdAt = row.getValue('createdAt') as any;

    return (
      <span className='text-xs/3 italic text-teal-500'>
        {DateFormatter.toShow(createdAt, 'date')}
      </span>
    );
  }
};

export const addedAtDateTimeColumn: AppColumnDef<
  { createdAt: DateOrString } & any
> = {
  id: 'createdAt',
  order: 7,
  accessorKey: 'createdAt',
  descriptionColumn: true,

  header: 'At',
  cell: ({ row }) => {
    const createdAt = row.getValue('createdAt') as any;

    return (
      <span className='text-xs/3 italic text-teal-500'>
        {DateFormatter.toShow(createdAt, 'datetime')}
      </span>
    );
  }
};
