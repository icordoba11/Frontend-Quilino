// import {Controller, useFormContext} from 'react-hook-form';

// import FormHelperText from '@mui/material/FormHelperText';

// import {Upload, UploadBox, UploadAvatar} from '../core/upload';
// import {UploadAvatarProps} from '../core/upload/upload-avatar';
// import {UploadBoxProps} from '../core/upload/upload-box';
// import {UploadProps} from '../core/upload/upload';

// interface RHFUploadAvatarProps extends Omit<UploadAvatarProps, 'file'> {
//   name: string;
// }

// export function RHFUploadAvatar({name, ...other}: RHFUploadAvatarProps) {
//   const {control} = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({field, fieldState: {error}}) => (
//         <div>
//           <UploadAvatar error={!!error} file={field.value} {...other} />

//           {!!error && (
//             <FormHelperText error sx={{px: 2, textAlign: 'center'}}>
//               {error.message}
//             </FormHelperText>
//           )}
//         </div>
//       )}
//     />
//   );
// }

// interface RHFUploadBoxProps extends Omit<UploadBoxProps, 'files'> {
//   name: string;
// }

// export function RHFUploadBox({name, ...other}: RHFUploadBoxProps) {
//   const {control} = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({field, fieldState: {error}}) => (
//         <UploadBox files={field.value} error={!!error} {...other} />
//       )}
//     />
//   );
// }

// interface RHFUploadProps extends Omit<UploadProps, 'file' | 'files'> {
//   name: string;
//   multiple?: boolean;
//   helperText?: string;
// }

// export function RHFUpload({
//   name,
//   multiple,
//   helperText,
//   ...other
// }: RHFUploadProps) {
//   const {control} = useFormContext();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({field, fieldState: {error}}) =>
//         multiple ? (
//           <Upload
//             multiple
//             accept={{'image/*': []}}
//             files={field.value}
//             error={!!error}
//             helperText={
//               (!!error || helperText) && (
//                 <FormHelperText error={!!error} sx={{px: 2}}>
//                   {error ? error?.message : helperText}
//                 </FormHelperText>
//               )
//             }
//             {...other}
//           />
//         ) : (
//           <Upload
//             accept={{'image/*': []}}
//             file={field.value}
//             error={!!error}
//             helperText={
//               (!!error || helperText) && (
//                 <FormHelperText error={!!error} sx={{px: 2}}>
//                   {error ? error?.message : helperText}
//                 </FormHelperText>
//               )
//             }
//             {...other}
//           />
//         )
//       }
//     />
//   );
// }