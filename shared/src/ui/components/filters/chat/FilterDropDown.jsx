import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui-components';
import { useRouter, useSearchParams } from 'next/navigation';
export function FilterDropdown({ label, options, labelKey, valueKey, paramKey, onChange }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedValue = searchParams.get(paramKey) || '';
    const handleChange = (value) => {
        const newParams = new URLSearchParams(searchParams.toString());
        if (value) {
            newParams.set(paramKey, value);
        }
        else {
            newParams.delete(paramKey);
        }
        router.push(`?${newParams.toString()}`, { scroll: false });
        if (onChange)
            onChange(value || null);
    };
    return (<div className='space-y-2'>
      <label className='text-sm font-medium'>{label}</label>
      <Select onValueChange={handleChange} defaultValue={selectedValue}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`}/>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (<SelectItem key={String(option[valueKey])} value={String(option[valueKey])}>
              {String(option[labelKey])}
            </SelectItem>))}
        </SelectContent>
      </Select>
    </div>);
}
