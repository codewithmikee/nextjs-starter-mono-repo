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
// import { UserPlus } from 'lucide-react';
// import { toast } from 'sonner';

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
//       age: 18
//     },

//     schema: testSchema,
//     submitHandler: handler
//   });

//   return (
//     <AppFormWrapper<TestFormValues, IUserResponse>
//       form={form}
//       submitHandler={submit}
//       onSuccess={(response) => {
//         toast.success('Added');
//         // Handle success
//       }}
//       buttonProps={{
//         showReset: true,
//         submitLabel: 'Create Account',
//         submitIcon: <UserPlus size={16} />
//       }}
//       title='Create Account'
//       description='Enter your details to create a new account'
//       // layout="horizontal"
//     >
//       <SimpleFormInput
//         formProps={{
//           control: form.control,
//           name: 'username'
//         }}
//         label='Username'
//         placeholder='Enter your username'
//         description='Your unique username for the platform'
//       />

//       <SimpleFormInput
//         formProps={{
//           control: form.control,
//           name: 'email'
//         }}
//         type='email'
//         label='Email'
//         placeholder='Enter your email'
//         description="We'll never share your email"
//       />

//       <SimpleFormPassword
//         formProps={{
//           control: form.control,
//           name: 'password'
//         }}
//         label='Password'
//         placeholder='Enter your password'
//         description='Must be at least 8 characters'
//         showGenerateButton={true}
//       />

//       <SimpleFormNumber
//         formProps={{
//           control: form.control,
//           name: 'age'
//         }}
//         label='Age'
//         placeholder='Enter your age'
//         description='Your age in years'
//         min={18}
//         max={100}
//       />
//     </AppFormWrapper>
//   );
// }
