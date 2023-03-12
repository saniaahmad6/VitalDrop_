import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./UserInfo.css"
import { useNavigate } from 'react-router-dom';

function UserInfo() {
  const navigator = useNavigate()

  async function handleLogout(event){
    console.log("Logging out")
    await fetch("/logout")
    navigator("/")
  }

  return (
    <>
    <div className='user-container' >
      <h1 style ={{textAlign:"center" , padding: "3rem 0"}}> Hello, xyz</h1>
      <div className='user-container-box'>
      <Row style ={{ fontSize: "1.4rem" }}>
        <Col sm style ={{border: "1px solid #274472"}}>NAME : </Col>
        <Col sm style ={{border: "1px solid #274472"}}>USER ID: </Col>
      </Row>
      <Row style ={{ fontSize: "1.4rem"}}>
        <Col  sm style ={{border: "1px solid #274472"}}>EMAIL ID: </Col>
        <Col  sm style ={{border: "1px solid #274472"}}>PHONE NUMBER: </Col>
        
      </Row>
      <Row style ={{ fontSize: "1.4rem"}}>
        <Col  sm style ={{border: "1px solid #274472"}}>ADDRESS: </Col>

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
          <Button  variant="outline-info" style ={{ marginRight : "1rem"}}>Donate</Button>{' '}
          <Button variant="outline-success">Receive</Button>{' '}
        </div>

      </div>
      
      <div className='user-danger'>
          <Button onClick={handleLogout} style ={{ marginRight : "1rem"}}variant="outline-dark">Log Out</Button>{' '}
          <Button variant="outline-danger">Delete Account</Button>{' '}
      </div>
    </div>
    </>
  );
}

export default UserInfo;




