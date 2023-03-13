import React, { useEffect, useState } from 'react';
import "./Form.css"
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  MDBRadio,
}
  from 'mdb-react-ui-kit';
import { NavLink, useNavigate } from "react-router-dom"


function Receive() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  return (
    <MDBContainer fluid className="p-3 my-5 custom" style={{ padding: "3rem 3rem" }}>

      <MDBRow>

        <MDBCol col='4' md='6' style={{ padding: "2rem" }}>

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>
          <MDBBtn className="mb-4 w-100" size="lg">Log in</MDBBtn>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <NavLink to="/login/signup" style={{ color: "black" }}>
            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
              Signup
            </MDBBtn>
          </NavLink>


        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Receive