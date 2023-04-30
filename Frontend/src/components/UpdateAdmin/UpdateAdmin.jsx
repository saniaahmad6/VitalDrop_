import { useState ,useEffect} from "react";
import { Row, Col,Container, Button, ButtonGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
export default function UpdateUser() {
    const  [hover,setHover] =useState(false);
    const styles={
        button : {
            backgroundColor: hover? "#821D30" : "#5F093D" ,
            marginRight: "1rem",
            color :"white"  
        }
    };
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
    
      useEffect(() => {
    
        const userData = {
          name: 'Abcd',
          email: 'abcdef@example.com',
          phone: '958752389',
          address: '123 Main St.',
        };
        setUser(userData);
      }, []);
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Send an API request 
      };
      
      function handleHover(event){
        setHover(!hover);
      }

  return (
    <div className="container" >

        
        <Container>
            <h2 style={{textAlign : "center", paddingTop :"3%", color :"#5F093D"}}>Center Information</h2>
            <Row style ={{padding :"1% 15%"}}>
                <Col xs={12} md={4}>
                    <Form.Label>Center ID:</Form.Label>
                    <Form.Control type="text" placeholder="Normal text" disabled readOnly />
                </Col>
                <Col xs={12} md={8}>
                    <Form.Label>Address: </Form.Label>
                    <Form.Control as="textarea" rows={3} disabled readOnly />
                </Col>
            </Row>

            <Row style ={{padding :"1% 15%"}}>
                <Col xs={12} md={4}>
                    <Form.Label>State: </Form.Label>
                    <Form.Control type="text" placeholder="Normal text" disabled readOnly />
                </Col>
                <Col xs={12} md={4}>
                    <Form.Label>Pincode: </Form.Label>
                    <Form.Control type="text" placeholder="Normal text" disabled readOnly />
                </Col>
                <Col xs={12} md={4}>
                    <Form.Label>Email ID:</Form.Label>
                    <Form.Control type="text" placeholder="Normal text" disabled readOnly />
                </Col>

            </Row>
            <Row style ={{padding :"1% 15% 3%"}}>
                <Col xs={12} md={4}>
                    <Form.Label>Incharge ID: </Form.Label>
                    <Form.Control type="text" placeholder="Normal text"  />
                </Col>
                <Col xs={12} md={4}>
                    <Form.Label>Name of Incharge: </Form.Label>
                    <Form.Control type="text" placeholder="Normal text" />
                </Col>
                <Col xs={12} md={4}>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="text" placeholder="Normal text" />
                </Col>

            </Row>
        </Container>
        <Container >
            <ButtonGroup style={{paddingLeft: "15%", paddingBottom : "5%"}}>
            <Button style={styles.button} onMouseEnter={handleHover} onMouseLeave={handleHover} variant="contained">Save Changes</Button>
            </ButtonGroup>
        </Container>
        
        
      
    </div>
  );
}
