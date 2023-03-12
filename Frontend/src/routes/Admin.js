import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import Form from "../components/AdminLogin/Form"
function Admin(){
    return <>
        <Navbar/>
        <Heroproj heading = "Log in or Sign up" text="*For Donation sites"/>
        <Form/>
        <Footer/>
    </>

}

export default Admin;