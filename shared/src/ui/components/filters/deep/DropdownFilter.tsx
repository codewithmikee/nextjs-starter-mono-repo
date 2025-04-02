import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/ui-components';

export type DeepDropdownFilterProps<T extends string> = {
  value: T | null;
  onChange: (value: string) => void;
  options: Array<{ value: T; label: string }>;
  placeholder: string;
  className?: string;
};

export const DeepDropdownFilter = <T extends string>({
  value,
  onChange,
  options,
  placeholder,
  className
}: DeepDropdownFilterProps<T>) => {
  return (
    <Select value={value ?? undefined} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
