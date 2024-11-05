import * as Yup from "yup";
export const SignupSchema = Yup.object().shape({
  name: Yup.string().min(1, "Too Short!").max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").max(50, "Too Long!").required("Required"),
});

export type FormValuesSignUp = Yup.InferType<typeof SignupSchema>;
