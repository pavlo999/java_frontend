import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import RegistrationPage from "./RegistrationPage"
import { APP_ENV } from "../../../env"

const Registration = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey={APP_ENV.REACT_RECAPTCHA_KEY}>
            <RegistrationPage/>
        </GoogleReCaptchaProvider>
    )
}
export default Registration