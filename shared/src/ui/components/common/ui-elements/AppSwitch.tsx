import { Label } from '@/ui-components';
import { Switch } from '@/ui-components';
import React, { useId } from 'react';

type AppSwitchProps = {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
  label?: string;
};

function AppSwitch({ checked, onCheckedChange, label }: AppSwitchProps) {
  const id = useId();
  return (
    <div className='flex items-center space-x-2'>
      <Switch checked={checked} onCheckedChange={onCheckedChange} id={id} />
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>
  );
}

export default AppSwitch;
