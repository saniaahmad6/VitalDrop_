import React , { useState } from 'react';
import IMG from "./loginperson.jpg"
import "./Form.css"
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import {NavLink} from "react-router-dom"

function Form() {
  const [isHover, setIsHover] = useState(false);

   const handleMouseEnter = () => {
      setIsHover(true);
   };

   const handleMouseLeave = () => {
      setIsHover(false);
   };
   const boxStyle = {
    marginTop: '2rem',
    cursor: 'pointer',
    backgroundColor: isHover ? '#5F093D': '#B21368',
    border : isHover ? '#5F093D': '#B21368'
 };
  return (
    <MDBContainer fluid className="p-3 my-5 custom" style={{padding: "3rem 3rem"}}>

      <MDBRow>


        
        <MDBCol col='4' md='6' style={{padding: "2rem"}}>
          <h5>Healthcare Center Details: </h5>
          <MDBInput wrapperClass='mb-4' label='CENTER REGISTRATION ID' id='formControlLg' type='text' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='State' id='formControlLg' type='text' size="lg"/>
          
          <MDBInput wrapperClass='mb-4' label='Pin code' id='formControlLg' type='text' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Address' id='formControlLg' type='text' size="lg"/>
          <h5>Health In-charge Details:</h5>
          <MDBInput wrapperClass='mb-4' label='HEALTH ID' id='formControlLg' type='text' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Name' id='formControlLg' type='text' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Email Address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Set Password' id='formControlLg' type='password' size="lg"/>
          

          

          <NavLink to="/adminlogin" style={{color: "black"}}>
          <MDBBtn className="mb-4 w-100" size="lg" style={boxStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            Register as a donation site
          </MDBBtn>
          </NavLink>

          

        </MDBCol>
        <MDBCol col='10' md='6'>
          <img src={IMG} class="img-fluid" alt="Phone image" style={{width: "100%" , height: "100%"}}/>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Form;