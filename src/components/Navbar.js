import React from "react";
import '../css/Navbar.css'

const Navbar = () => {
  return (
  <div>
    <nav className="navbar navbar-expand-lg  my-nav "data-bs-theme="dark">
      <div className="container-fluid">
      
        <a className="navbar-brand" href="">
        VitalDrop
       </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                Donate
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                Seek
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                Log in
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                Sign up
              </a>
            </li>
            
            
          </ul>
          
        </div>
      </div>
    </nav>
  </div>
  )
};

export default Navbar;