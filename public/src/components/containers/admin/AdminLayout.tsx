import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import { useSelector } from "react-redux";
import { IAuthUser } from "../../auth/login/store/types";
import { useEffect } from "react";

const AdminLayout = () =>{

  const navigate = useNavigate();
  const {isAuth,user} = useSelector((store:any)=>store.auth as IAuthUser);
  let isAdmin = false;

  if(isAuth && user)
  {
    isAdmin = user.roles.includes("admin");
  }

  useEffect(()=>{
    if(!isAdmin)
    navigate("/login");
  },[])

  return (
      <>
        <AdminHeader />
        <main className="container mx-auto">
         {isAdmin && <Outlet />}  
        </main>
      </>
    );
}

export default AdminLayout;