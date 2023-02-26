import DefaultHeader from "./DefaultHeader";
import {Outlet} from "react-router-dom";

const DefaultLayout = () => {
    return (
        <>
            <DefaultHeader />
            <div>
                <Outlet />
            </div>
        </>
    );
}

export default DefaultLayout;