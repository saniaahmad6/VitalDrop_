import React, { useEffect, useState } from 'react';
import IMG from "./loginperson.jpg"
import "./Form.css"
import { Form as FormClass } from 'react-bootstrap';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { NavLink, useNavigate } from "react-router-dom"

const onC = (setter) => {
  return (event) => {
    setter(event.target.value)
  }
}

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
    backgroundColor: isHover ? '#5F093D' : '#B21368',
    border: isHover ? '#5F093D' : '#B21368'
  };

  const [availableStates, setAvailableStates] = useState([])
  useEffect(() => {
    fetch(`/available-states`).then((res) => {
      res.json().then((data) => {
        setAvailableStates(data.states)
      })
    })
  }, [])

  const [pincode, setPincode] = useState("")
  const [state, setState] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [latitude, setLatitude] = useState(undefined)
  const [longitude, setLongitude] = useState(undefined)
  const navigate = useNavigate()

  const submitForm = async () => {
    let bodyJson = {
      name: name,
      email: email,
      password: password,
      address: address,
      state: state,
      pincode: pincode,
      latitude: latitude,
      longitude: longitude
    }
    console.log(bodyJson)

    let res = await fetch("/admin-signup", {
      method: 'POST',
      body: new URLSearchParams(bodyJson),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    let data = (await res.json())
    if (data.signup) {
      // navigate('/adminlogin')
    }
    else {
      console.log('could not sign up')
    }
  }

  return (
    <MDBContainer fluid className="p-3 my-5 custom" >
      <MDBRow style={{ padding: "3% 10%" }}>
        <MDBCol col='4' md='6' style={{ padding: "2rem" }}>
          <h5>Healthcare Center Details: </h5>
          <MDBInput wrapperClass='mb-4' label='Pincode' id='formControlLg' type='text'  value={pincode} onChange={onC(setPincode)} />
          <MDBInput wrapperClass='mb-4' label='Address' id='formControlLg' type='text'  value={address} onChange={onC(setAddress)} />
          <MDBInput wrapperClass='mb-4' label='Latitude' id='formControlLg' type='number' step={0.000000001}  value={latitude} onChange={onC(setLatitude)} />
          <MDBInput wrapperClass='mb-4' label='Longitude' id='formControlLg' type='number' step={0.000000001}  value={longitude} onChange={onC(setLongitude)} />
          <FormClass.Select onChange={onC(setState)}>
            <option selected value={null}>Choose State</option>
            {availableStates.map((val, index) => {
              return <option key={index} value={val.StateName} > {val.StateName} </option>
            })}
          </FormClass.Select>
          <label>State</label>
          <p></p>
          <h5>Health In-charge Details:</h5>
          <MDBInput wrapperClass='mb-4' label='Name' id='formControlLg' type='text'  value={name} onChange={onC(setName)} />
          <MDBInput wrapperClass='mb-4' label='Email Address' id='formControlLg' type='email'  value={email} onChange={onC(setEmail)} />
          <MDBInput wrapperClass='mb-4' label='Set Password' id='formControlLg' type='password'  value={password} onChange={onC(setPassword)} />
            <MDBBtn className="mb-4 w-100"  style={boxStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={async () => await submitForm()}>
              Register as a donation site
            </MDBBtn>
        </MDBCol>
        <MDBCol col='10' md='6'>
          <img src={IMG} className="img-fluid" alt="Phone image" style={{ width: "100%", height: "100%" }} />
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Form;