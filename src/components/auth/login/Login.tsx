import { ErrorMessage, Field, Formik } from "formik";
import { Link } from "react-router-dom";
import { LoginValidatorSchema } from "./store/ValideteLogin";

interface ILoginItem{
    email:string,
    password:string
}

const Login = () =>{
    const initialValues:ILoginItem={
      email:"",
        password:""
    }
    const handleLogin=(item:ILoginItem)=>{
        console.log("login data: ",item);
        //send data and get response
        //redirect....
    }

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
          <div className="max-w-[400px] w-full mx-auto bg-gray-50 p-4">
            <Formik 
            initialValues={initialValues} 
            onSubmit={handleLogin}
            validationSchema ={LoginValidatorSchema}>
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <h2 className=" text-4xl font-bold text-center py-6 flex flex-row justify-center">
                    <img
                      className="h-8 sm:h-10 pr-4"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                    LOGIN
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
                  <div className="flex flex-col py-2 ">
                    <button
                    disabled={!formik.isValid}
                      type="submit"
                      className={`w-full py-2 my-2 text-white text-lg font-bold bg-indigo-600 hover:bg-indigo-700`}
                    >
                      Sign In
                    </button>
                    <Link
                      to="/registration"
                      className=" text-center text-indigo-500 text-lg mt-3"
                    >
                      Create account?
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </>
    );
}
export default Login;