import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./UserInfo.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserInfo() {
  const navigator = useNavigate()

  async function handleLogout(event) {
    console.log("Logging out")
    await fetch("/logout")
    navigator("/")
  }

  const [userData, setUserData] = useState({
    uid: "", name: "", email_id: "", address: "", phone_no: ""
  })

  function onDonate(event) {
    navigator("/login/user/donate")
  }

  function onReceive(event) {
    navigator("/login/user/receive")
  }

  useEffect(() => {
    fetch("/user-info").then((response) => {
      response.json().then(data => {
        setUserData(data)
      })
    })
  }, [])
  return (
    <>
      <div className='user-container' >
        <h1 style={{ textAlign: "center", padding: "3rem 0" }}> Hello, {userData.name}</h1>
        <div className='user-container-box'>
          <Row style={{ fontSize: "1.4rem" }}>
            <Col sm style={{ border: "1px solid #274472" ,padding : "1rem"}}>NAME : {userData.name}</Col>
            
          </Row>
          
          <Row style={{ fontSize: "1.4rem" }}>
          <Col sm style={{ border: "1px solid #274472" ,padding : "1rem"}}>USER ID: {userData.uid}</Col>
            <Col sm style={{ border: "1px solid #274472" ,padding : "1rem"}}>EMAIL ID: {userData.email_id}</Col>
            

          </Row>
          <Row style={{ fontSize: "1.4rem" }}>
            <Col sm style={{ border: "1px solid #274472" ,padding : "1rem"}}>PHONE NUMBER: {userData.phone_no}</Col>
            <Col sm style={{ border: "1px solid #274472" ,padding : "1rem"}}>GENDER: </Col>
          </Row>
          
          <Row style={{ fontSize: "1.4rem" }}>
            <Col sm style={{ border: "1px solid #274472" ,padding : "1rem"}}>ADDRESS: {userData.address}</Col>

          </Row>
        </div>
        <div className='update'>
          <Button variant="outline-warning">Update Info</Button>{' '}
        </div>
        <hr />
        <div className='question'>
          <div className='question-left'>
            <h1>DO YOU WANT TO? </h1>
          </div>
          <div className='question-right'>
            <Button onClick={onDonate} variant="outline-info" style={{ marginRight: "1rem" }}>Donate</Button>{' '}
            <Button onClick={onReceive} variant="outline-success">Receive</Button>{' '}
          </div>

        </div>

        <div className='user-danger'>
          <Button onClick={handleLogout} style={{ marginRight: "1rem" }} variant="outline-dark">Log Out</Button>{' '}
          <Button variant="outline-danger">Delete Account</Button>{' '}
        </div>
      </div>
    </>
  );
}

export default UserInfo;




