import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import { Outlet } from "react-router-dom";
function User(){
    return <>
        <Navbar/>
        <Heroproj heading = "Welcome Back!" text=""/>
        <Outlet/>
        <Footer/>
    </>

}

export default User;