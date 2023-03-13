import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import UserSignUp from "../components/CreateUser/UserSignUp";
import IMAGE from "../components/Login/hero.jpg"

function Signup(){
    return <>
        <Navbar/>
        <Heroproj heading = "Join us." text="Let's make a difference" image={IMAGE}/>
        <UserSignUp/>
        <Footer/>
    </>

}

export default Signup;