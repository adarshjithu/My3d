import * as Yup from 'yup';

const addressSchema = Yup.object({
  firstname: Yup.string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters')
    .max(50, 'First Name must be less than 50 characters'),
  
  lastname: Yup.string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters')
    .max(50, 'Last Name must be less than 50 characters'),
  
  companyname: Yup.string()
    .max(100, 'Company Name must be less than 100 characters'),
  
  streetaddress: Yup.string()
    .required('Street Address is required')
    .min(5, 'Street Address must be at least 5 characters')
    .max(100, 'Street Address must be less than 100 characters'),
  
  apartment: Yup.string()
    .max(100, 'Apartment, Suite, etc. must be less than 100 characters'),
  
  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters'),
  
  state: Yup.string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be less than 50 characters'),
  
  zip: Yup.string()
    .required('ZIP Code is required')
    ,
  
  country: Yup.string()
    .required('Country is required')
    .oneOf(['USA', 'Canada', 'UK'], 'Country must be one of the available options'),
  
  phonenumber: Yup.string()
    .required('Phone Number is required')
    .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number must be valid'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Email must be a valid email address'),
});

export default addressSchema;
