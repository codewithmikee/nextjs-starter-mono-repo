import { Controller } from 'react-hook-form';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/ui-components';
import { AppFormMessage } from '../../commons/form-common-elements';
import { RadioGroup, RadioGroupItem } from '@/ui-components';
import { Label } from '@/ui-components';
import { cn } from '@/utils';
// TODO: FLEX
// Simple form radio input component that combines all features
export function SimpleFormRadio({ formProps: { control, name }, label, description, className, disabled, options, orientation = 'vertical' }) {
    return (<FormField control={control} name={name} render={({ field }) => (<FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} disabled={disabled} className={cn(orientation === 'horizontal'
                ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'
                : 'flex flex-col space-y-2', '[&_[data-state=checked]]:bg-orange-500', '[&_[data-state=checked]]:border-orange-500', 'w-full')}>
              {options.map((option) => (<div key={option.value} className='flex items-start gap-3'>
                  <RadioGroupItem value={option.value} id={`${name}-${option.value}`} className='border-2 border-muted focus:ring-orange-500 focus-visible:ring-orange-500 data-[state=checked]:text-white'/>
                  <div className='grid gap-1.5 leading-none'>
                    <Label htmlFor={`${name}-${option.value}`} className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {option.label}
                    </Label>
                    {option.description && (<p className='text-sm text-muted-foreground'>
                        {option.description}
                      </p>)}
                  </div>
                </div>))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <AppFormMessage />
        </FormItem>)}/>);
}
function AppFormRadioRoot({ formProps, children, className }) {
    return (<Controller control={formProps.control} name={formProps.name} render={({ field }) => (<FormItem className={className}>
          {typeof children === 'function' ? children(field) : children}
        </FormItem>)}/>);
}
// Export the compound components
export const AppFormRadio = {
    Root: AppFormRadioRoot,
    Label: FormLabel,
    Group: RadioGroup,
    Item: RadioGroupItem,
    Description: FormDescription,
    Message: AppFormMessage
};
