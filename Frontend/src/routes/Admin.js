import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import Form from "../components/AdminLogin/Form"
import IMAGE from "../components/AdminLogin/hero.jpg"
function Admin(){
    return <>
        <Navbar/>
        <Heroproj heading = "Log in or Sign up" text="*For Donation sites" image={IMAGE}/>
        <Form/>
        <Footer/>
    </>

}

export default Admin;