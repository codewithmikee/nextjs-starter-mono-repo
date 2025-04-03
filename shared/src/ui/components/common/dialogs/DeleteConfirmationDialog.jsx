import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/ui-components';
import { Button } from '@/ui-components';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useToggle } from '@/hooks/use-toggle';
import { toast } from 'sonner';
import { GENERAL_ERROR_MESSAGE } from '@/constants';
function DeleteConfirmationDialog({ isOpen, onToggleOpen, onSuccess, itemId, handler, titleSuffix }) {
    const [isSubmitting, toggleSubmitting, setIsSubmitting] = useToggle(false);
    const handleOkay = async () => {
        try {
            setIsSubmitting(true);
            await handler(itemId);
            setIsSubmitting(false);
            toast.success('Delete successfully', {
                position: 'top-right'
            });
            onSuccess();
        }
        catch (error) {
            toast.error(error.response.data?.error ?? GENERAL_ERROR_MESSAGE);
            setIsSubmitting(false);
        }
    };
    const titleToShow = 'Confirm Delete';
    const descriptionToShow = titleSuffix
        ? `Are you sure you want to delete ${titleSuffix}?`
        : 'Are you sure you want to Delete?';
    return (<AlertDialog open={isOpen || isSubmitting} onOpenChange={onToggleOpen}>
      <VisuallyHidden>
        <AlertDialogTrigger asChild>
          <Button variant='outline'>Active/Deactive</Button>
        </AlertDialogTrigger>
      </VisuallyHidden>
      {/* <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {' '}
              {action} {title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isSubmitting ? (
                'Updating please wait'
              ) : (
                <>
                  {' '}
                  Are you sure you want to {action} {title}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isSubmitting}
              onClick={() => onToggleOpen(false)}
            >
              No
            </AlertDialogCancel>
            <AlertDialogAction className={statusToBe == ActiveStatus.ACTIVE ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} disabled={isSubmitting} onClick={handleOkay}>
              Yes {action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titleToShow}</AlertDialogTitle>
          <AlertDialogDescription>{descriptionToShow}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className='bg-red-500 hover:bg-red-700' disabled={isSubmitting} onClick={handleOkay}>
            {' '}
            Yes Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>);
}
export default DeleteConfirmationDialog;
