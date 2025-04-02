import React, { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/ui-components';

type SimpleDataGridProps = {
  items: Record<string, ReactNode | string | any>;
};

function SimpleDataGrid({ items }: SimpleDataGridProps) {
  return (
    <Table>
      <TableBody>
        {Object.entries(items).map(([key, value], index) => (
          <TableRow key={index}>
            <TableCell className='font-medium'>{key}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SimpleDataGrid;
