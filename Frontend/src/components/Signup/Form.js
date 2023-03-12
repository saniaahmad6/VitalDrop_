import React, { useState } from 'react';
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
import { NavLink, useNavigate } from "react-router-dom"


function Form() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const navigate = useNavigate()

  async function signupHandler(event) {
    let bodyJson = {
      username: username,
      email: email,
      phoneNo: phoneNo,
      address: address,
      password: password
    }
    let res = await fetch("/signup", {
      method: 'POST',
      body: new URLSearchParams(bodyJson),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    let data = (await res.json())
    if (data.signup) {
      navigate('/login')
    }
    else {
      console.log('could not sign up')
    }
  }

  return (
    <MDBContainer fluid className="p-3 my-5 custom" style={{ padding: "3rem 3rem" }}>

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src={IMG} class="img-fluid" alt="Phone image" style={{ width: "100%", padding: "2rem" }} />
        </MDBCol>

        <MDBCol col='4' md='6' style={{ padding: "2rem" }}>

          <MDBInput wrapperClass='mb-4' label='Name' id='formControlLg' type='text' size="lg" value={username} onChange={(e) => setUsername(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Phone Number' id='formControlLg' type='number' size="lg" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Address' id='formControlLg' type='text' size="lg" value={address} onChange={(e) => setAddress(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>
          <MDBBtn onClick={signupHandler} className="mb-4 w-100" size="lg">Sign Up</MDBBtn>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Form;