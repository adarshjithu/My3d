// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//         await signupSchema.validate(formData, { abortEarly: false });

//         registerUser()
//     } catch (err: any) {
//         const validationErrors: any = {};
//         if (err.inner) {
//             err.inner.forEach((error: any) => {
//                 validationErrors[error.path] = error.message;
//             });
//         }
//         // User validation failed errors
//         setError(validationErrors);
//     }
// };