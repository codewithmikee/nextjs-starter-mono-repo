// 'use client';

// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { SimpleFormInput } from './form-elements/app-form-inputs/app-form-input';
// import { SimpleFormPassword } from './form-elements/app-form-inputs/app-form-password';
// import { SimpleFormNumber } from './form-elements/app-form-inputs/number-input';
// import { SimpleFormRadio } from './form-elements/app-form-selects/app-form-radio';
// import { SimpleFormCheckbox } from './form-elements/app-form-selects/app-form-checkbox';
// import { SimpleFormSwitch } from './app-form-switch';
// import { SimpleFormRange } from './app-form-range';
// import { SimpleFormDate } from './app-form-date';
// import AppFormWrapper from './app-form-wrapper';
// import { TestFormValues, testSchema } from './form-element-props';
// import { dataAPi } from '@/backend-services/user-api-services/use-users-api';
// import { IUserResponse } from '@/types/api-calls/api-models';
// import { useFormWrapper } from '@/hooks/useFormWrapper';

// // Combined test schema

// // Test Component
// export function ReusableFormTest() {
//   // const form = useForm<TestFormValues>({
//   //   resolver: zodResolver(testSchema),
//   //   defaultValues: {
//   //     username: '',
//   //     email: '',
//   //     password: '',
//   //     age: undefined,
//   //     gender: undefined,
//   //     interests: [],
//   //     notifications: false,
//   //     newsletter: false,
//   //     experience: 0,
//   //     salary: 30000,
//   //     birthDate: undefined,
//   //     startDate: undefined
//   //   }
//   // });

//   const handler = async (data: TestFormValues) => await dataAPi.test(data);

//   const { form, submit } = useFormWrapper<TestFormValues, IUserResponse>({
//     defaultValues: {
//       username: '',
//       email: '',
//       password: '',
//       age: undefined,
//       gender: undefined,
//       interests: [],
//       notifications: false,
//       newsletter: false,
//       experience: 0,
//       salary: 30000,
//       birthDate: undefined,
//       startDate: undefined
//     },

//     schema: testSchema,
//     submitHandler: handler
//   });

//   return (
//     <AppFormWrapper<TestFormValues, IUserResponse>
//       form={form}
//       submitHandler={handler}
//       title='Test Form'
//     >
//         <SimpleFormInput
//           formProps={{
//             control: form.control,
//             name: 'username'
//           }}
//           label='Username'
//           placeholder='Enter your username'
//           description='Your unique username for the platform'
//         />

//         <SimpleFormInput
//           formProps={{
//             control: form.control,
//             name: 'email'
//           }}
//           type='email'
//           label='Email'
//           placeholder='Enter your email'
//           description="We'll never share your email"
//         />

//         <SimpleFormPassword
//           formProps={{
//             control: form.control,
//             name: 'password'
//           }}
//           label='Password'
//           placeholder='Enter your password'
//           description='Must be at least 8 characters'
//           showGenerateButton={true}
//         />

//         <SimpleFormNumber
//           formProps={{
//             control: form.control,
//             name: 'age'
//           }}
//           label='Age'
//           placeholder='Enter your age'
//           description='Your age in years'
//           min={18}
//           max={100}
//         />

//         <SimpleFormRadio
//           formProps={{
//             control: form.control,
//             name: 'gender'
//           }}
//           label='Gender'
//           description='Select your gender'
//           options={[
//             { label: 'Male', value: 'male' },
//             { label: 'Female', value: 'female' },
//             {
//               label: 'Other',
//               value: 'other',
//               description: 'Prefer not to specify'
//             }
//           ]}
//         />

//         <SimpleFormCheckbox
//           formProps={{
//             control: form.control,
//             name: 'interests'
//           }}
//           label='Interests'
//           description='Select your interests'
//           options={[
//             {
//               label: 'Reading',
//               value: 'reading',
//               description: 'Books, articles, etc.'
//             },
//             {
//               label: 'Sports',
//               value: 'sports',
//               description: 'Any physical activity'
//             },
//             {
//               label: 'Music',
//               value: 'music',
//               description: 'Listening or playing'
//             },
//             {
//               label: 'Travel',
//               value: 'travel',
//               description: 'Exploring new places'
//             },
//             {
//               label: 'Cooking',
//               value: 'cooking',
//               description: 'Making delicious food'
//             }
//           ]}
//           orientation='horizontal'
//         />

//         <SimpleFormSwitch
//           formProps={{
//             control: form.control,
//             name: 'notifications'
//           }}
//           label='Enable Notifications'
//           description='Receive notifications about updates and activities'
//         />

//         <SimpleFormSwitch
//           formProps={{
//             control: form.control,
//             name: 'newsletter'
//           }}
//           label='Subscribe to Newsletter'
//           description='Get weekly updates and special offers'
//         />

//         <SimpleFormRange
//           formProps={{
//             control: form.control,
//             name: 'experience'
//           }}
//           label='Years of Experience'
//           description='Select your years of experience'
//           min={0}
//           max={10}
//           step={0.5}
//           unit=' years'
//         />

//         <SimpleFormRange
//           formProps={{
//             control: form.control,
//             name: 'salary'
//           }}
//           label='Expected Salary'
//           description='Select your expected salary range'
//           min={30000}
//           max={200000}
//           step={5000}
//           unit='$'
//         />

//         <SimpleFormDate
//           formProps={{
//             control: form.control,
//             name: 'birthDate'
//           }}
//           label='Birth Date'
//           description='Select your date of birth'
//           fromYear={1900}
//           toYear={new Date().getFullYear()}
//         />

//         <SimpleFormDate
//           formProps={{
//             control: form.control,
//             name: 'startDate'
//           }}
//           label='Preferred Start Date'
//           description='When can you start?'
//           fromYear={new Date().getFullYear()}
//           toYear={new Date().getFullYear() + 2}
//         />

//     </AppFormWrapper>
//   );
// }

// export const testSchema = z.object({
//     username: z.string().min(3, 'Username must be at least 3 characters'),
//     email: z.string().email('Invalid email address'),
//     password: z.string().min(8, 'Password must be at least 8 characters'),
//     age: z
//       .number()
//       .min(18, 'Must be at least 18 years old')
//       .max(100, 'Must be under 100 years old'),
//     gender: z.enum(['male', 'female', 'other'], {
//       required_error: 'Please select your gender'
//     }),
//     interests: z.array(z.string()).min(1, 'Select at least one interest'),
//     notifications: z.boolean().optional().default(false),
//     newsletter: z.boolean().optional().default(false),
//     experience: z.number().min(0).max(10),
//     salary: z.number().min(30000).max(200000),
//     birthDate: z.date({
//       required_error: 'Please select your birth date'
//     }),
//     startDate: z.date({
//       required_error: 'Please select your preferred start date'
//     })
//   });

//   export type TestFormValues = z.infer<typeof testSchema>;

import React from 'react';

function FormTest() {
  return <div>FormTest</div>;
}

export default FormTest;
