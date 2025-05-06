import * as Yup from 'yup';

const profileSchema = Yup.object().shape({
  firstname: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  
  lastname: Yup.string()
    .required('Last name is required')
    .min(1, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  
  phonenumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
});

export default profileSchema;
