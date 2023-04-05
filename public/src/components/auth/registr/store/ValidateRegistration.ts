import * as Yup from "yup";
// import { passwordRegExp } from "../../login/store/ValideteLogin";

export const RegistrationValidatorShema = Yup.object().shape({
    email: Yup.string().required("Email must be required").label("Email").email("Invalid email address"),
    password: Yup.string().min(6,"Password must be at least 6 characters").required("Must be required"),//.matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9"),
    confirm: Yup.string().min(6,"Confirm password must be at least 6 characters").required("Must be required"),//.matches(passwordRegExp, "Confirm password must contains A-Z, a-z, 0-9")
});
