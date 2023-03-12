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
            <Link to="/" style={{color: "#FB4570"}}>
                <h1>
                    VitalDrop
                </h1> 
            </Link>

            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li>
                    <Link to="/" style={{color: "#FB4570"}}>Home</Link>
                </li>
                <li>
                    <Link to="/search" style={{color: "#FB4570"}}>Centers</Link>
                </li>
                <li>
                    <Link to="/login" style={{color: "#FB4570"}}>Login/Signup</Link>
                </li>
                <li>
                    <Link to="/adminlogin" style={{color: "#FB4570"}}>Admin</Link>
                </li>
            </ul>
            <div className="hamburger" onClick={handleClick}>
                {
                    click ? (<FaTimes size={20} style={{color: "#FB4570"}}/>) :
                    (<FaBars size={20} style={{color: "#FB4570"}}/>)
                }
                
                
            </div>
            </div>
        

    );

}

export default Navbar;