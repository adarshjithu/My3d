import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username cannot exceed 30 characters')
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'Username can only contain letters, numbers, and underscores'
        ),
    email: Yup.string()
        .required('Email is required')
        .email('Please provide a valid email address'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(128, 'Password cannot exceed 128 characters')
        // .matches(
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/,
        //     'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        // ),
});

export default signupSchema;
