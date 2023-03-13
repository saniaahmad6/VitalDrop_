import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
function Search(){
    return <>
        <Navbar/>
        <Heroproj heading = "Search" text="Find your nearest center"/>
        {/* <SearchBar/> */}
        <Footer/>
    </>

}

export default Search;