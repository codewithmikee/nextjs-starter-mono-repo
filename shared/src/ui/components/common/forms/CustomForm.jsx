import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/ui-components';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui-components';
import { AlertCircle } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/ui-components';
import { CustomFormInput } from './form-inputs/DynamicFormInput';
import { CustomFormSelect } from './form-inputs/DynamicFormSelect';
function CustomForm({ schema, defaultValues, onSubmit, renderer, title, submitText = 'Submit', isSubmitting, submitError, customComponent, description }) {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues // Explicitly cast
    });
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues // Explicitly cast
    });
    const errorMessage = submitError;
    return (<div className='flex h-full w-full flex-col gap-2 overflow-y-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='h-full w-full max-w-full space-y-6'>
          <Card className='h-full w-full overflow-y-auto px-2 py-4'>
            {title ||
            (errorMessage && (<CardHeader>
                  {title && <CardTitle>{title}</CardTitle>}
                  {description && (<CardDescription>{description}</CardDescription>)}
                  {errorMessage && (<CardDescription className='font-extrabold text-red-500'>
                      {' '}
                      <AlertCircle className='h-4 w-4'/> {errorMessage}
                    </CardDescription>)}
                </CardHeader>))}
            <CardContent className='my-2 flex w-full flex-col gap-4 overflow-y-auto'>
              {renderer(form)}
            </CardContent>
            <CardFooter className='flex'>
              <Button disabled={isSubmitting} type='submit'>
                {submitText}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>);
}
export function FormElementRender({ form, selectType = 'input', formProps }) {
    const isOption = selectType == 'select' || selectType == 'checkbox' || selectType == 'radio';
    //   return (
    const render = (field) => isOption ? (<CustomFormSelect field={field} formProps={formProps} selectType={selectType}/>) : (<CustomFormInput field={field} formProps={formProps}/>);
    const labelDirection = formProps.labelDirection ?? 'vertical';
    return (<FormField key={formProps.name} control={form.control} name={formProps?.name} render={({ field }) => (<FormItem>
          {/* <div className={`w-full flex gap-2 ${labelDirection == "vertical" ? 'flex flex-col'  : 'flex-row h-full '}`}> */}
          <FormLabel>{formProps.label}</FormLabel>

          <FormControl>{render(field)}</FormControl>
          {/* </div> */}

          <FormDescription>{formProps.description}</FormDescription>
          <FormMessage />
        </FormItem>)}/>);
}
export default CustomForm;
