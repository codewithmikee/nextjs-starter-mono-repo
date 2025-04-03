import { Controller } from 'react-hook-form';
import { Input } from '@/ui-components';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/ui-components';
import { AppFormMessage } from '../../commons/form-common-elements';
import FormElementLayout from '../FormElementLayout';
// Simple form input component that combines all features
export function SimpleFormInput({ formProps: { control, name }, label, placeholder, description, type = 'text', className, disabled, layout }) {
    return (<FormField control={control} name={name} render={({ field }) => (<FormItem className={className}>
          <FormElementLayout layout={layout} label={label}>
            <Input {...field} type={type} placeholder={placeholder} disabled={disabled}/>
          </FormElementLayout>

          {description && <FormDescription>{description}</FormDescription>}
          <AppFormMessage />
        </FormItem>)}/>);
}
function AppFormInputRoot({ formProps, children, className }) {
    return (<Controller control={formProps.control} name={formProps.name} render={({ field }) => (<FormItem className={className}>
          {typeof children === 'function' ? children(field) : children}
        </FormItem>)}/>);
}
// Export the compound components
export const AppFormInput = {
    Root: AppFormInputRoot,
    Label: FormLabel,
    Input: FormControl,
    Description: FormDescription,
    Message: AppFormMessage
};
