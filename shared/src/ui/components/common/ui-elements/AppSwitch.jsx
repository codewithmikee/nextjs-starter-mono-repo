import { Label } from '@/ui-components';
import { Switch } from '@/ui-components';
import React, { useId } from 'react';
function AppSwitch({ checked, onCheckedChange, label }) {
    const id = useId();
    return (<div className='flex items-center space-x-2'>
      <Switch checked={checked} onCheckedChange={onCheckedChange} id={id}/>
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>);
}
export default AppSwitch;
