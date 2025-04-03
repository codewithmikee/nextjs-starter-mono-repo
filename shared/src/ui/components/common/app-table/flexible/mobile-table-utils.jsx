import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui-components';
import { flexRender } from '@tanstack/react-table';
import { AppSheet } from '../../ui-elements/AppSheetView';
import { Label } from '@/ui-components';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
export const renderMobileCards = (mobileTable, mobileConfig, sorting) => {
    const { titleKey, gridColumns = 2, renderCustomMobileCard, nextToTileColumns = [], headerColumns = [], descriptionColumns = [] } = mobileConfig;
    return (<div className='flex flex-col gap-4'>
      {mobileTable.getRowModel().rows.length ? (mobileTable.getRowModel().rows.map((row) => {
            if (renderCustomMobileCard) {
                return renderCustomMobileCard(row.original);
            }
            const titleValue = row.original[titleKey];
            // const nextToTitle = nextToTileColumn ? row.original[nextToTileColumn] : null
            const keysOnHeader = [
                titleKey,
                ...nextToTileColumns,
                ...headerColumns,
                ...descriptionColumns
            ];
            const showDetail = row.getVisibleCells().length >
                1 +
                    nextToTileColumns.length +
                    descriptionColumns.length +
                    headerColumns.length;
            return (<Card key={row.id} className='p-2 shadow-lg'>
              <CardHeader className='flex flex-col gap-0 p-0 py-0'>
                <div className='flex flex-row items-center justify-between'>
                  <CardTitle className='flex flex-grow flex-row gap-2 text-sm'>
                    {String(titleValue)}
                    <span className='my-0 flex flex-row items-center py-0'>
                      {renderHeadless(row, nextToTileColumns)}
                    </span>
                  </CardTitle>

                  {showDetail && (<AppSheet title={String(titleValue)} openLabel='Detail'>
                      <div className='grid h-full gap-4 py-4'>
                        {renderForDetail(row.getVisibleCells())}
                      </div>
                    </AppSheet>)}
                </div>
                <div className='flex flex-row items-center gap-2'>
                  {renderHeadless(row, headerColumns)}
                </div>
                <VisuallyHidden>
                  <CardDescription></CardDescription>
                </VisuallyHidden>
              </CardHeader>
              <CardContent className='flex w-full flex-col gap-4 p-0 pt-1'>
                <div className='grid w-fit grid-flow-col items-center justify-between gap-4'>
                  {renderWithHeader(row
                    .getVisibleCells()
                    .filter((cell) => cell.column.columnDef.id &&
                    descriptionColumns.includes(cell.column.columnDef.id)))}
                </div>
              </CardContent>
            </Card>);
        })) : (<Card>
          <CardContent className='py-4 text-center text-sm text-muted-foreground'>
            No results found.
          </CardContent>
        </Card>)}
    </div>);
};
// helpers
const renderHeadless = (row, columnKeys) => {
    return columnKeys.map((nextToTitle) => {
        const nextTo = nextToTitle
            ? row
                .getAllCells()
                .find((cell) => cell.column.columnDef.id &&
                cell.column.columnDef.id == nextToTitle)
            : null;
        return nextTo ? (<span key={nextToTitle}>
        {flexRender(nextTo.column.columnDef.cell, nextTo.getContext())}{' '}
      </span>) : (<></>);
    });
};
// helpers
const renderForDetail = (cells) => {
    return cells.map((cell) => {
        const headerStr = String(cell.column.columnDef.header || '');
        let value = flexRender(cell.column.columnDef.cell, cell.getContext());
        if (!value || (typeof value === 'string' && value.length === 0)) {
            value = '-';
        }
        return (<div key={cell.id} className='grid grid-cols-4 items-center gap-4'>
        <Label htmlFor={cell.id} className='text-right'>
          {headerStr}
        </Label>
        <p className={`col-span-3 flex items-start text-start text-sm font-semibold`}>
          {value}
        </p>
      </div>);
    });
};
// helpers
const renderWithHeader = (cells) => {
    return cells.map((cell) => {
        const headerStr = String(cell.column.columnDef.header || '');
        let value = flexRender(cell.column.columnDef.cell, cell.getContext());
        if (!value || (typeof value === 'string' && value.length === 0)) {
            value = '-';
        }
        return (<div key={cell.id} className='flex flex-wrap items-center gap-1'>
        <span className={`text-xs/3 font-light text-muted-foreground`}>
          {headerStr}
        </span>
        <span className={`text-xs font-semibold`}>{value}</span>
      </div>);
    });
};
