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

export function Donate() {
  const [bloodGroup, setBloodGroup] = useState(null)
  const [availableCenters, setAvailableCenters] = useState([])
  const [selectedCenterId, setSelectedCenterId] = useState(null)
  const [availableAppointments, setAvailableAppointments] = useState([])
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/available-centers').then((response) => {
      response.json().then((data) => {
        setAvailableCenters(data)
      })
    })
  }, [])


  useEffect(() => {
    if (selectedCenterId) {
      fetch(`/available-appointments/${selectedCenterId}`).then((response) => {
        response.json().then((data) => {
          setAvailableAppointments(data)
        })
      })
    }
  }, [selectedCenterId])

  async function handleRegister(event) {
    console.log(bloodGroup, selectedAppointmentId, selectedCenterId)
    if (bloodGroup != null && selectedCenterId != null && selectedAppointmentId != null) {
      let bodyJson = { bloodGroup: bloodGroup, appointmentId: selectedAppointmentId }
      let res = await fetch("/new-donation", {
        method: 'POST',
        body: new URLSearchParams(bodyJson),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })

      let data = (await res.json())
      if (data.register) {
        console.log("REGISTERED")
        navigate('/login/user')
      }
      else {
        console.log('could not donate')
      }
    }
  }

  return (
    <MDBContainer fluid className="p-3 my-5 custom" style={{ padding: "3rem 3rem" }}>

      <MDBRow>
        <MDBCol col='4' md='6' style={{ padding: "2rem" }}>


          <MDBCol col='4' md='12' >
            <h6 className="fw">Blood Group: </h6>
            <MDBRadio name='inlineRadio' id='inlineRadio1' value='option1' label='A+' inline onChange={() => { setBloodGroup('A+') }} />
            <MDBRadio name='inlineRadio' id='inlineRadio2' value='option2' label='A-' inline onChange={() => { setBloodGroup('A-') }} />
            <MDBRadio name='inlineRadio' id='inlineRadio3' value='option3' label='B+' inline onChange={() => { setBloodGroup('B+') }} />
            <MDBRadio name='inlineRadio' id='inlineRadio4' value='option4' label='B-' inline onChange={() => { setBloodGroup('B-') }} />
            <MDBRadio name='inlineRadio' id='inlineRadio5' value='option5' label='AB+' inline onChange={() => { setBloodGroup('AB+') }} />
            <MDBRadio name='inlineRadio' id='inlineRadio6' value='option6' label='AB-' inline onChange={() => { setBloodGroup('AB-') }} />
            <MDBRadio name='inlineRadio' id='inlineRadio7' value='option7' label='O+' inline onChange={() => { setBloodGroup('O+') }} />
            <MDBRadio name='inlineRadio' id='inlineRadio8' value='option8' label='O-' inline onChange={() => { setBloodGroup('O-') }} />
          </MDBCol>

          <MDBCol col='4' md='12' >
            <h6 className="fw">Center: </h6>
            <select onChange={(event) => {
              setSelectedCenterId(event.target.value)
            }}>
              <option selected value={null}>Choose a center</option>
              {availableCenters.map((val, index) => {
                return <option key={index} value={val.id}> {val.address} </option>
              })}
            </select>
          </MDBCol>

          <MDBCol col='4' md='12' >
            <h6 className="fw">Appointment: </h6>
            <select onChange={(event) => {
              setSelectedAppointmentId(event.target.value)
            }}>
              <option selected value={null}>Choose an appointment</option>
              {availableAppointments.map((val, index) => {
                return <option key={index} value={val.id}> {new Date(val.slot).toString()} </option>
              })}
            </select>
          </MDBCol>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={handleRegister}>Register</MDBBtn>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Donate;