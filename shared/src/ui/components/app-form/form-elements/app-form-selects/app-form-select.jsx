import { Controller } from 'react-hook-form';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/ui-components';
import { Label } from '@/ui-components';
import { FormControl, FormItem, FormDescription, FormField, FormLabel } from '@/ui-components';
import { AppFormMessage } from '../../commons/form-common-elements';
import { cn } from '@/utils';
function AppFormSelectRoot({ formProps, children, className }) {
    return (<Controller control={formProps.control} name={formProps.name} render={({ field }) => (<FormItem className={className}>
          {typeof children === 'function' ? children(field) : children}
        </FormItem>)}/>);
}
function AppFormSelectLabel({ children, className }) {
    return <Label className={className}>{children}</Label>;
}
function AppFormSelectTrigger({ placeholder, className }) {
    return (<FormControl>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}/>
      </SelectTrigger>
    </FormControl>);
}
function AppFormSelectContent({ options, className }) {
    return (<SelectContent className={className}>
      {options.map((option) => (<SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>))}
    </SelectContent>);
}
export function SimpleFormSelect({ control, name, label, options, placeholder, description, disabled, layout }) {
    return (<FormField control={control} name={name} render={({ field }) => (<FormItem>
          <span className={cn({
                'grid grid-cols-4 items-center': layout && layout == 'horizontal'
            })}>
            {label && (<FormLabel className={cn({
                    'text-right': layout && layout == 'horizontal'
                })}>
                {label}
              </FormLabel>)}
            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
              <FormControl className={cn({
                'col-span-3': layout && layout == 'horizontal'
            })}>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder || 'Select an option'}/>
                </SelectTrigger>
              </FormControl>
              <SelectContent className='!z-[110]'>
                {options.map((option) => (<SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>))}
              </SelectContent>
            </Select>
          </span>

          {description && <FormDescription>{description}</FormDescription>}
          <AppFormMessage />
        </FormItem>)}/>);
}
//  Group all components together
const AppFormSelect = {
    Root: AppFormSelectRoot,
    Label: AppFormSelectLabel,
    Trigger: AppFormSelectTrigger,
    Content: AppFormSelectContent,
    Description: FormDescription
};
export default AppFormSelect;
