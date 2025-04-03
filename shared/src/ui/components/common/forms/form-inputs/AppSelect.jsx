import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui-components';
function AppSelect({ items, placeholder, onValueChange, value, title }) {
    return (<Select value={value} onValueChange={(val) => onValueChange(val)}>
      <SelectTrigger className='w-full md:max-w-xs'>
        <SelectValue placeholder={placeholder}/>
      </SelectTrigger>
      <SelectContent className='!z-[110]'>
        {items.map((opt) => (<SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>))}
      </SelectContent>
    </Select>);
}
export default AppSelect;
