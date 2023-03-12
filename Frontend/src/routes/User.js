import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import { Outlet } from "react-router-dom";
import IMAGE from "../components/User/hero.jpg"
function User(){
    return <>
        <Navbar/>
        <Heroproj heading = "Welcome Back!" text="" image={IMAGE}/>
        <Outlet/>
        <Footer/>
    </>

}

export default User;