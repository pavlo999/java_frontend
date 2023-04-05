import { ErrorMessage, Field, Formik } from "formik";
import { RegistrationValidatorShema } from "./store/ValidateRegistration";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import http from "../../../http_common";
import { IAuthResponse } from "../login/store/types";
import { APP_ENV } from "../../../env";
import { AuthUserToken } from "../action";

interface IRegistration{
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    confirm:string,
    reCaptchaToken:string
}

const RegistrationPage = ()=>{
  const initialValues: IRegistration = {
    firstname:"",
    lastname:"",
    email: "",
    password: "",
    confirm: "",
    reCaptchaToken:""
  };

  const { executeRecaptcha } = useGoogleReCaptcha();
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const onNext = async (item: IRegistration) => {
    console.log("Registation item: ", item);
    try {
      if(!executeRecaptcha)
        return;
      //Перевірка чи пройшов перевірку гугл, користувач, чи не є він бот  
      item.reCaptchaToken=await executeRecaptcha();

      const resp = await http.post<IAuthResponse>(
        `${APP_ENV.REMOTE_HOST_NAME}account/register`,
        item
      );
      
      AuthUserToken(resp.data.token, dispatch);

      navigator("/");
    } catch (error: any) {
      console.log("Щось пішло не так", error);
    }
  };

  const errorMessage = (fieldType: string, color: string = "red") => {
    return (
      <ErrorMessage name={fieldType}>
        {(msg) => <div style={{ color: color }}>{msg}</div>}
      </ErrorMessage>
    );
  };

  return (
    <>
      <div className="relative w-full flex flex-col justify-center mt-[150px] ">
        <div className="max-w-[500px] w-full mx-auto bg-gray-50 p-4">
          <Formik initialValues={initialValues} onSubmit={onNext} validationSchema={RegistrationValidatorShema}>
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <h2 className=" text-4xl font-bold text-center py-6 flex flex-row justify-center">
                  <img
                    className="h-8 sm:h-10 pr-4"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                  Registration
                </h2>
                <div className="flex flex-col py-2">
                  <label htmlFor="email" className="text-lg font-[500]">
                  Email
                  </label>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative text-xl p-1"
                  />
                  {errorMessage("email")}
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="firstname" className="text-lg font-[500]">
                  Firstname
                  </label>
                  <Field
                    type="text"
                    id="firstname"
                    name="firstname"
                    className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative text-xl p-1"
                  />
                  {errorMessage("firstname")}
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="lastname" className="text-lg font-[500]">
                  Lastname
                  </label>
                  <Field
                    type="text"
                    id="lastname"
                    name="lastname"
                    className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative text-xl p-1"
                  />
                  {errorMessage("lastname")}
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="password" className="text-lg font-[500]">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative text-xl p-1"
                  />
                  {errorMessage("password")}
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="confirm" className="text-lg font-[500]">
                    Confirm password
                  </label>
                  <Field
                    type="password"
                    id="confirm"
                    name="confirm"
                    className="border rounded-sm focus:rounded-sm focus:outline-none focus:border-indigo-400 w-full relative text-xl p-1"
                  />
                  {errorMessage("confirm")}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 my-3 text-white text-lg font-bold bg-indigo-600 hover:bg-indigo-700"
                >
                  Registration
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
export default RegistrationPage;