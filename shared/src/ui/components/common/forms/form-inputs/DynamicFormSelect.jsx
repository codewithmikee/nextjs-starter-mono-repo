import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/ui-components';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui-components';
import { FormControl, FormItem, FormLabel } from '@/ui-components';
export function FormSelect({ field, ...inputProps }) {
    return (<Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl className='z-[110]'>
        <SelectTrigger className='!z-[110]'>
          <SelectValue className='!z-[110] text-white' placeholder={inputProps.placeholder}/>
        </SelectTrigger>
      </FormControl>
      <SelectContent className='!z-[110]'>
        {inputProps.options?.map((option, index) => (<SelectItem value={option.value} key={`${option.value}.${index}`}>
            {option.label.toString()}
          </SelectItem>))}
      </SelectContent>
    </Select>);
}
export function FormRadio({ field, ...inputProps }) {
    return (<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='space-2 flex flex-wrap'>
      {inputProps.options?.map((option, index) => (<FormItem key={`${option.value}.${index}`} className='flex items-center space-x-3 space-y-0'>
          <FormControl>
            <RadioGroupItem color='green' value={option.value}/>
          </FormControl>
          <FormLabel className='font-normal'>{option.label}</FormLabel>
        </FormItem>))}
    </RadioGroup>);
}
export function CustomFormSelect({ field, formProps, selectType }) {
    const select = (<Select {...formProps.defaultSelectProps} onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl className='z-[110]'>
        <SelectTrigger className='!z-[110]'>
          <SelectValue className='!z-[110] text-white' placeholder={formProps.placeholder}/>
        </SelectTrigger>
      </FormControl>
      <SelectContent className='!z-[110]'>
        {formProps.options?.map((option, index) => (<SelectItem value={option.value} key={`${option.value}.${index}`}>
            {option.label.toString()}
          </SelectItem>))}
      </SelectContent>
    </Select>);
    const radio = (<RadioGroup {...formProps.defaultSelectProps} onValueChange={field.onChange} defaultValue={field.value} className='flex flex-col space-y-1'>
      {formProps.options?.map((option, index) => (<FormItem key={`${option.value}.${index}`} className='flex items-center space-x-3 space-y-0'>
          <FormControl>
            <RadioGroupItem value={option.value}/>
          </FormControl>
          <FormLabel className='font-normal'>{option.label}</FormLabel>
        </FormItem>))}
    </RadioGroup>);
    return selectType == 'radio' ? radio : select;
}
