import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import UserSignUp from "../components/CreateUser/UserSignUp";

function Signup(){
    return <>
        <Navbar/>
        <Heroproj heading = "Join us." text="Let's make a difference"/>
        <UserSignUp/>
        <Footer/>
    </>

}

export default Signup;