import React, {useState}from 'react';
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
import {NavLink, useNavigate} from "react-router-dom"

function Form() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  async function loginHandler(event) {
    let bodyJson = { email: email, password: password }
    let res = await fetch("/admin-login", {
      method: 'POST',
      body: new URLSearchParams(bodyJson),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    let data = (await res.json())
    if (data.login) {
      navigate('/adminlogin/adminuser')
    }
    else {
      console.log('could not login')
    }
  }
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
    <MDBContainer fluid className="p-3 my-5 custom" style={{ padding: "3rem 3rem" }}>

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src={IMG} class="img-fluid" alt="Phone image" style={{ width: "100%", padding: "2rem" }} />
        </MDBCol>

        <MDBCol col='4' md='6' style={{ padding: "2rem" }}>

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>
          <MDBBtn onClick={loginHandler} className="mb-4 w-100" size="lg" >Log in</MDBBtn>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <NavLink to="/adminlogin/adminsignup" style={{ color: "black" }}>
            <MDBBtn className="mb-4 w-100" size="lg" style={boxStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
              Signup
            </MDBBtn>
          </NavLink>


        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Form;