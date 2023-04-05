const REMOTE_HOST_NAME:string = process.env.REACT_APP_BASE_URL as string;
const REACT_RECAPTCHA_KEY:string = process.env.REACT_APP_RECAPTCHA_KEY as string;

const APP_ENV ={
    REMOTE_HOST_NAME: REMOTE_HOST_NAME,
    REACT_RECAPTCHA_KEY:REACT_RECAPTCHA_KEY,
};
export {APP_ENV};