import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import IMAGE from "../components/Search/hero.jpg"
function Search(){
    return <>
        <Navbar/>
        <Heroproj heading = "Search" text="Find your nearest center" image={IMAGE}/>
        {/* <SearchBar/> */}
        <Footer/>
    </>

}

export default Search;