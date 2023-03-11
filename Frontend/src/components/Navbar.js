import "./NavbarStyles.css"
import React, {useState} from "react"
import { Link, useSearchParams } from "react-router-dom"
import {FaBars,FaTimes} from "react-icons/fa"

function Navbar(){
    const [click, setClick]=useState(false);
    const handleClick = () => setClick(!click);
    const [color,setColor] =useState(false);
    const changeColor =()=>{
        if (window.scrollY >=100){
            setColor(true);
        }
        else{
            setColor(false);
        }
    }
    window.addEventListener("scroll",changeColor);
    return (
        
            <div className={color ? "header header-bg": "header"}>
            <Link to="/" style={{color: "#41729F"}}>
                <h1>
                    VitalDrop
                </h1> 
            </Link>

            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li>
                    <Link to="/" style={{color: "#41729F"}}>Home</Link>
                </li>
                <li>
                    <Link to="/search" style={{color: "#41729F"}}>Centers</Link>
                </li>
                <li>
                    <Link to="/login" style={{color: "#41729F"}}>Login/Signup</Link>
                </li>
                <li>
                    <Link to="/adminlogin" style={{color: "#41729F"}}>Admin</Link>
                </li>
            </ul>
            <div className="hamburger" onClick={handleClick}>
                {
                    click ? (<FaTimes size={20} style={{color: "#41729F"}}/>) :
                    (<FaBars size={20} style={{color: "#41729F"}}/>)
                }
                
                
            </div>
            </div>
        

    );

}

export default Navbar;