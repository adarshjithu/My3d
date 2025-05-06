import * as Yup from "yup";

export const categorySchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .min(3, "Category name must be at least 3 characters")
        .max(50, "Category name cannot exceed 50 characters")
        .required("Category name is required"),
    
    description: Yup.string()
        .trim()
        
        .required("Description is required"),
});
