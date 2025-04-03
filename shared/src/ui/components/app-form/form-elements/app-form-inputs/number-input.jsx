import { Controller } from 'react-hook-form';
import { Input } from '@/ui-components';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/ui-components';
import { AppFormMessage } from '../../commons/form-common-elements';
import FormElementLayout from '../FormElementLayout';
// Simple form number input component that combines all features
export function SimpleFormNumber({ formProps: { control, name }, label, placeholder, description, className, disabled, min, max, step = 1, layout }) {
    return (<FormField control={control} name={name} render={({ field }) => (<FormItem className={className}>
          <FormElementLayout layout={layout} label={label}>
            <Input {...field} type='number' placeholder={placeholder} disabled={disabled} min={min} max={max} step={step} onChange={(e) => {
                const value = e.target.value === '' ? '' : Number(e.target.value);
                field.onChange(value);
            }}/>
          </FormElementLayout>

          {description && <FormDescription>{description}</FormDescription>}
          <AppFormMessage />
        </FormItem>)}/>);
}
function AppFormNumberRoot({ formProps, children, className }) {
    return (<Controller control={formProps.control} name={formProps.name} render={({ field }) => (<FormItem className={className}>
          {typeof children === 'function' ? children(field) : children}
        </FormItem>)}/>);
}
// Export the compound components
export const AppFormNumber = {
    Root: AppFormNumberRoot,
    Label: FormLabel,
    Input: FormControl,
    Description: FormDescription,
    Message: AppFormMessage
};
