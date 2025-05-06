import * as Yup from 'yup';

const passwordValidationSchema = Yup.object({
  oldpassword: Yup.string()
    .required('Old password is required')
    .min(6, 'Old password must be at least 6 characters'),
  
  newpassword: Yup.string()
    .required('New password is required')
    .min(6, 'New password must be at least 6 characters')
    .notOneOf([Yup.ref('oldpassword'), null], 'New password cannot be the same as old password'),
  
  confirmpassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('newpassword')], 'Confirm password must match new password'),
});

export default passwordValidationSchema;
