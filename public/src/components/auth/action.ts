import jwtDecode from "jwt-decode";
import { Dispatch } from "react";
import setAuthToken from "../../helpers/setAuthToken";
import { AuthUserActionType, IUser } from "./login/store/types";


export const AuthUserToken = (token: string, dispatch: Dispatch<any>) => {
      const user = jwtDecode(token) as IUser;
      dispatch({
        type: AuthUserActionType.LOGIN_USER,
        payload: user
      });
      setAuthToken(token);
}