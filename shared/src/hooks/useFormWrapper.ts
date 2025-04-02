import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse } from 'axios';
import { DefaultValues, FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

export function useFormWrapper<
  TFieldValues extends FieldValues,
  TResponse
>(options: {
  defaultValues: DefaultValues<TFieldValues>;
  schema: z.ZodSchema<TFieldValues>;
  submitHandler: (data: TFieldValues) => Promise<AxiosResponse<TResponse>>;
}) {
  const form = useForm<TFieldValues>({
    resolver: zodResolver(options.schema),
    defaultValues: options.defaultValues
  });

  return {
    form,
    submit: options.submitHandler
  };
}
