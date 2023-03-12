import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import Form from "../components/Login/Form";
import IMAGE from "../components/Login/hero.jpg"
function Login(){
    return <>
        <Navbar/>
        <Heroproj heading = "Log in or Sign up" text="Let's be in this together" image={IMAGE}/>
        <Form/>
        <Footer/>
    </>

}

export default Login;