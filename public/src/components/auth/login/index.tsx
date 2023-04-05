import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import LoginPage from "./LoginPage";
import { APP_ENV } from "../../../env";

const Login = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.REACT_RECAPTCHA_KEY}>
            <LoginPage/>
        </GoogleReCaptchaProvider>
    )
}


export default Login;