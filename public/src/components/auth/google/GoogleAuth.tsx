import { useEffect } from "react";
import http from "../../../http_common";
import { IAuthResponse } from "../login/store/types";
import { APP_ENV } from "../../../env";
import { AuthUserToken } from "../action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const GoogleAuth = () => {
    const navigator = useNavigate();
  
    const dispatch = useDispatch();

    const handleGoogleLogin = async (item: any) => {
        console.log("Google resp", item);
        const token = item.credential;
        console.log("Token auth", token);
        try {

      
            const resp = await http.post<IAuthResponse>(
              `${APP_ENV.REMOTE_HOST_NAME}account/google-auth`,
              token
            );
            
            AuthUserToken(resp.data.token, dispatch);
      
            console.log("Login user token", resp);
            navigator("/");
          } catch (error: any) {
            console.log("Щось пішло не так", error);
          }
    }

    useEffect(() => {
        //global google
        window.google.accounts!.id.initialize({
          client_id: "836757744807-ano587m8ulc42042j8lglutuu54g6rf7.apps.googleusercontent.com",
          callback: handleGoogleLogin
        });
        window.google.accounts!.id.renderButton(document.getElementById("signInDiv"),{
          theme: "outline", size: "small"
        });
      }, []);

    return (
        <>
            <div id="signInDiv"></div>
        </>
    );
}
export default GoogleAuth;