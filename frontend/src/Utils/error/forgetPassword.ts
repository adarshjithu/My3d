import * as Yup from 'yup';

const forgetPasswordSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmpassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export default forgetPasswordSchema;
