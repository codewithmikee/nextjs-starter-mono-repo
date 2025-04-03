// MobileTableView.tsx
// for mobile version row rendering
import { flexRender } from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui-components';
import Link from 'next/link';
export default function MobileTableView({ table, titleKey, actionKey, linkGetter, onClick }) {
    // Wrapper for clickable content
    const ClickableWrapper = ({ children }) => (<span className='contents'>{children}</span>);
    const CardWrapper = ({ children, row }) => {
        if (linkGetter) {
            return (<Link href={linkGetter(row)} className='block hover:shadow-lg'>
          {children}
        </Link>);
        }
        if (onClick) {
            return (<div onClick={() => onClick(row)} className='cursor-pointer hover:shadow-lg'>
          {children}
        </div>);
        }
        return <>{children}</>;
    };
    return (<div className='space-y-3 md:hidden'>
      {table.getRowModel().rows.map((row) => {
            const titleCell = row
                .getAllCells()
                .find((cell) => cell.column.id === titleKey);
            const actionCell = actionKey
                ? row.getAllCells().find((cell) => cell.column.id === actionKey)
                : null;
            // Get description cells
            const descriptionCells = row
                .getAllCells()
                .filter((cell) => cell.column.columnDef.descriptionColumn);
            // Get description cells
            const nextToTitle = row
                .getAllCells()
                .filter((cell) => cell.column.columnDef.nextToTitle);
            // Get regular content cells (excluding title, action, and description)
            const contentCells = row.getAllCells().filter((cell) => {
                const colDef = cell.column.columnDef;
                return (!colDef.nextToTitle &&
                    !colDef.descriptionColumn &&
                    cell.column.id !== titleKey &&
                    cell.column.id !== actionKey);
            });
            return (<CardWrapper key={row.id} row={row.original}>
            <Card className='overflow-hidden'>
              <CardHeader className='py-3'>
                <CardTitle className='mb-0 flex items-center justify-between pb-0 text-base'>
                  <span className='flex items-center gap-2 font-medium'>
                    {titleCell && (<ClickableWrapper>
                        {flexRender(titleCell.column.columnDef.cell, titleCell.getContext())}
                      </ClickableWrapper>)}
                    {nextToTitle.length > 0 && (<div className='ml-2 mt-1 flex flex-wrap items-center gap-2 text-xs'>
                        {nextToTitle.map((cell) => (<ClickableWrapper key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </ClickableWrapper>))}
                      </div>)}
                  </span>
                  {actionCell && (<ClickableWrapper>
                      <span className='flex items-center space-x-1'>
                        {flexRender(actionCell.column.columnDef.cell, actionCell.getContext())}
                      </span>
                    </ClickableWrapper>)}
                </CardTitle>
                {descriptionCells.length > 0 && (<div className='mt-0 flex items-center pt-0 text-xs'>
                    {descriptionCells.map((cell) => (<ClickableWrapper key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </ClickableWrapper>))}
                  </div>)}
              </CardHeader>
              {contentCells.length > 0 && (<CardContent className='flex w-full gap-2 py-2'>
                  {contentCells.map((cell) => {
                        let value = flexRender(cell.column.columnDef.cell, cell.getContext());
                        if (!value ||
                            (typeof value === 'string' && value.length == 0)) {
                            value = '-';
                        }
                        return (<div key={cell.id} className='flex flex-col gap-1'>
                        <span className='text-xs/3 font-light text-muted-foreground'>
                          {String(cell.column.columnDef.header)}
                        </span>
                        <ClickableWrapper>
                          <span className='text-xs'>{value}</span>
                        </ClickableWrapper>
                      </div>);
                    })}
                </CardContent>)}
            </Card>
          </CardWrapper>);
        })}

      {table.getRowModel().rows.length === 0 && (<Card>
          <CardContent className='py-4 text-center text-sm text-muted-foreground'>
            No results found.
          </CardContent>
        </Card>)}
    </div>);
}
