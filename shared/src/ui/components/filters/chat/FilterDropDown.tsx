import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/ui-components';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterDropdownProps<T> {
  label: string;
  options: T[];
  labelKey: keyof T; // Key to use for displaying the label
  valueKey: keyof T; // Key to use as the value for the query
  paramKey: string;
  onChange?: (value: string | null) => void;
}

export function FilterDropdown<T>({
  label,
  options,
  labelKey,
  valueKey,
  paramKey,
  onChange
}: FilterDropdownProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedValue = searchParams.get(paramKey) || '';

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set(paramKey, value);
    } else {
      newParams.delete(paramKey);
    }
    router.push(`?${newParams.toString()}`, { scroll: false });

    if (onChange) onChange(value || null);
  };

  return (
    <div className='space-y-2'>
      <label className='text-sm font-medium'>{label}</label>
      <Select onValueChange={handleChange} defaultValue={selectedValue}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={String(option[valueKey])}
              value={String(option[valueKey])}
            >
              {String(option[labelKey])}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
