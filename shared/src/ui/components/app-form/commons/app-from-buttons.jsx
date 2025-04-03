import { Button } from '@/ui-components';
import { cn } from '@/utils';
export function SubmitButton({ label = 'Submit', isLoading, disabled, className }) {
    return (<Button type='submit' disabled={disabled || isLoading} className={cn('w-full', className)}>
      {isLoading ? 'Submitting...' : label}
    </Button>);
}
export function ResetButton({ label = 'Reset', onReset, disabled, className }) {
    return (<Button type='button' variant='outline' disabled={disabled} onClick={onReset} className={cn('w-full', className)}>
      {label}
    </Button>);
}
export function ButtonGroup({ onReset, isLoading, isDisabled, submitLabel, resetLabel }) {
    return (<div className='flex gap-2'>
      <SubmitButton isLoading={isLoading} disabled={isDisabled} label={submitLabel}/>
      <ResetButton onReset={onReset} disabled={isDisabled} label={resetLabel}/>
    </div>);
}
