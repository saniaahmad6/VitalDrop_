import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import CenterForm from "../components/CreateCenter/Form"
import IMAGE from "../components/CreateCenter/hero.jpg"

function CreateCenter(){
    return <>
        <Navbar/>
        <Heroproj heading = "Join us." text="We will help you meet your donors" image={IMAGE}/>
        <CenterForm/>
        <Footer/>
    </>

}

export default CreateCenter;