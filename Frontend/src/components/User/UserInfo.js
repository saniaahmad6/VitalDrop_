import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import "./UserInfo.css"

function UserInfo() {
  return (
    <>
    <Container  >
      <h1 style ={{textAlign:"center" , padding: "3rem 0"}}> Hello, xyz</h1>
      <div className='user-container'>
      <Row style ={{ fontSize: "1.4rem"}}>
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
      <Button variant="outline-info">Donate</Button>{' '}
      <Button variant="outline-success">Receive</Button>{' '}
      <Button variant="outline-warning">Update Info</Button>{' '}
      <Button variant="outline-dark">Log Out</Button>{' '}
      <Button variant="outline-danger">Delete Account</Button>{' '}
    </Container>

    </>
  );
}

export default UserInfo;




