import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import CenterForm from "../components/CreateCenter/Form"


function CreateCenter(){
    return <>
        <Navbar/>
        <Heroproj heading = "Join us." text="We will help you meet your donors"/>
        <CenterForm/>
        <Footer/>
    </>

}

export default CreateCenter;