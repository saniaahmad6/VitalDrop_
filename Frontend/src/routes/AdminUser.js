import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import AdminUserInfo from "../components/User/UserInfo"
import IMAGE from "../components/AdminUser/hero.jpg"
function AdminUser(){
    return <>
        <Navbar/>
        <Heroproj heading = "" text="" image={IMAGE}/>
        <AdminUserInfo/>
        <Footer/>
    </>

}

export default AdminUser;