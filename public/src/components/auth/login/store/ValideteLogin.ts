import * as Yup from "yup";

// export const passwordRegExp =
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/;

export const LoginValidatorSchema = Yup.object().shape({
    email: Yup.string().required("Required").label("Email").email("Invalid email address"),
    password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    // .matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9")
    .label("Password")
});