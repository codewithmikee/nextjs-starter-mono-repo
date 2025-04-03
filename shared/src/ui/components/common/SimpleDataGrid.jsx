import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/ui-components';
function SimpleDataGrid({ items }) {
    return (<Table>
      <TableBody>
        {Object.entries(items).map(([key, value], index) => (<TableRow key={index}>
            <TableCell className='font-medium'>{key}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>))}
      </TableBody>
    </Table>);
}
export default SimpleDataGrid;
