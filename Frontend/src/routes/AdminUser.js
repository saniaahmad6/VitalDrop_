import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import AdminUserInfo from "../components/User/UserInfo"
function AdminUser(){
    return <>
        <Navbar/>
        <Heroproj heading = "" text=""/>
        <AdminUserInfo/>
        <Footer/>
    </>

}

export default AdminUser;