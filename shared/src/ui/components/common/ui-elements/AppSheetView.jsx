import { Button } from '@/ui-components';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/ui-components';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
export function AppSheet({ title, trigger, openLabel = 'Detail', triggerFit = false, description, children }) {
    return (<Sheet>
      <SheetTrigger asChild className={triggerFit ? 'w-fit' : 'w-auto'}>
        {trigger ?? <Button variant='outline'>{openLabel}</Button>}
      </SheetTrigger>
      <SheetContent side={'bottom'} className='h-[80vh] overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className='grid gap-4 py-4'>{children}</div>
        <VisuallyHidden>
          <SheetFooter>
            <SheetClose asChild>
              <Button type='submit'>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </VisuallyHidden>
      </SheetContent>
    </Sheet>);
}
