import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui-components';
export const DeepDropdownFilter = ({ value, onChange, options, placeholder, className }) => {
    return (<Select value={value ?? undefined} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}/>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (<SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>))}
      </SelectContent>
    </Select>);
};
