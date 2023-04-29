import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import AdminUserInfo from "../components/AdminUser/UserInfo"
import IMAGE from "../components/AdminUser/hero.jpg"
function AdminUser(){
    return <>
        <Navbar/>
        <Heroproj heading = "Welcome back!" text="" image={IMAGE}/>
        <AdminUserInfo/>
        <Footer/>
    </>

}

export default AdminUser;