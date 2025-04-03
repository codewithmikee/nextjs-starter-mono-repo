// app-form-switch.tsx
'use client';
import { Controller } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/ui-components';
import { Switch } from '@/ui-components';
import { AppFormMessage } from './commons/form-common-elements';
// Simple form switch input component that combines all features
export function SimpleFormSwitch({ formProps: { control, name }, label, description, className, disabled, thumbColor = 'bg-white', activeColor = 'bg-orange-500' }) {
    return (<FormField control={control} name={name} render={({ field }) => (<FormItem className={className}>
          <div className='flex flex-row items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              {label && <FormLabel className='text-base'>{label}</FormLabel>}
              {description && <FormDescription>{description}</FormDescription>}
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} className={`${field.value ? activeColor : 'bg-input'}`}/>
            </FormControl>
          </div>
          <AppFormMessage />
        </FormItem>)}/>);
}
function AppFormSwitchRoot({ formProps, children, className }) {
    return (<Controller control={formProps.control} name={formProps.name} render={({ field }) => (<FormItem className={className}>
          {typeof children === 'function' ? children(field) : children}
        </FormItem>)}/>);
}
// Export the compound components
export const AppFormSwitch = {
    Root: AppFormSwitchRoot,
    Label: FormLabel,
    Switch: Switch,
    Description: FormDescription,
    Message: AppFormMessage
};
