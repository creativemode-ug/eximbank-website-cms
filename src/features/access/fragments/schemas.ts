import { object, string, array } from "yup";

export const staffSchema = object().shape({
    first_name: string().required("first name is required"),
    last_name: string().required("last name is required"),
    email: string().email().required("email is required"),
    role: string().required("role is required"),
})

export const roleSchema = object().shape({
    name: string().required("name is required"),
    description: string().required("description is required"),
    permissions: array().of(string())
})