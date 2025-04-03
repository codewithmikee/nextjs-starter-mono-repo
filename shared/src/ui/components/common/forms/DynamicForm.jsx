import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/ui-components';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui-components';
import DynamicFormInput from './form-inputs/DynamicFormInput';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui-components';
import { AlertCircle } from 'lucide-react';
import { FormRadio, FormSelect } from './form-inputs/DynamicFormSelect';
function DynamicForm({ schema, defaultValues, onSubmit, fields, title, submitText = 'Submit', isSubmitting, submitError, customComponent }) {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues // Explicitly cast
    });
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues // Explicitly cast
    });
    const getFieldInput = (inputProps, field) => {
        // Render based on field type
        switch (inputProps.type ?? 'text') {
            case 'select':
                return <FormSelect field={field} {...inputProps}/>;
            case 'radio':
                return <FormRadio field={field} {...inputProps}/>;
            case 'hidden':
                return <input {...inputProps} type='hidden'/>;
            default:
                return <DynamicFormInput field={field} {...inputProps}/>;
            // Unsupported field types
        }
    };
    function renderFields({ fields }) {
        return fields
            .filter((input) => !input.hidden)
            .map((inputConfig, index) => {
            // Check if the field is grouped by testing for the groupTitle property
            if ('groupTitle' in inputConfig) {
                return (<Card key={index} style={{ marginBottom: '1rem' }}>
              <CardHeader>{inputConfig.groupTitle}</CardHeader>
              <CardContent>
                <div className={`flex w-full gap-2 ${inputConfig.display && inputConfig.display == 'grid' ? 'grid grid-cols-2' : 'flex-col'}`}>
                  {/* Recursively render the grouped items */}
                  {renderFields({ fields: inputConfig.items })}
                </div>
              </CardContent>
            </Card>);
            }
            else {
                // Render a single dynamic input field using react-hook-form's FormField
                return (<FormField disabled={isSubmitting} control={form.control} name={inputConfig.name} key={index} 
                // Rename the controller field from "field" to "controllerField" to avoid confusion with the config.
                render={({ field: controllerField }) => (<FormItem>
                  {inputConfig.label && inputConfig.type !== 'hidden' && (<FormLabel>{inputConfig.label}</FormLabel>)}
                  <FormControl>
                    <div className='relative'>
                      {getFieldInput(inputConfig, controllerField)}
                      {inputConfig.suffix && (<div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                          {inputConfig.onSuffixClick ? (<Button type='button'>
                              {inputConfig.suffix}
                            </Button>) : (inputConfig.suffix)}
                        </div>)}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>)}/>);
            }
        });
    }
    const errorMessage = submitError;
    return (<div className='flex h-full w-full flex-col gap-2 overflow-auto'>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-lg space-y-6'>
          <Card className=''>
            {title ||
            (errorMessage && (<CardHeader>
                  {title && <CardTitle>{title}</CardTitle>}

                  {errorMessage && (<CardDescription className='font-extrabold text-red-500'>
                      {' '}
                      <AlertCircle className='h-4 w-4'/> {errorMessage}
                    </CardDescription>)}
                </CardHeader>))}
            <CardContent className='flex flex-col gap-2'>
              {customComponent &&
            customComponent.position == 'start' &&
            customComponent.component}
              {renderFields({ fields })}
              {/* {fields
          .filter((input) => !input.hidden)
          .map((formField, index) => renderFields(fields
          .filter((input) => !input.hidden)))}
             {
          customComponent && customComponent.position == "end" && customComponent.component
        } */}
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
export default DynamicForm;
