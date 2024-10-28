import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
  identifier: Yup.string().required("Required").min(4, "Too Short!"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export type FormValuesSignIn = Yup.InferType<typeof signInSchema>;
