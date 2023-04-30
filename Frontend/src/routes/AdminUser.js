import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import AdminUserInfo from "../components/AdminUser/UserInfo"
import { Outlet } from "react-router-dom";
import IMAGE from "../components/AdminUser/hero.jpg"
function AdminUser(){
    return <>
        <Navbar/>
        <Heroproj heading = "Welcome back!" text="" image={IMAGE}/>
        <Outlet/>
        <Footer/>
    </>

}

export default AdminUser;