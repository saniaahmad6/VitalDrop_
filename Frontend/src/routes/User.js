import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import UserInfo from "../components/User/UserInfo";
function User(){
    return <>
        <Navbar/>
        <Heroproj heading = "Welcome Back!" text=""/>
        <UserInfo/>
        <Footer/>
    </>

}

export default User;