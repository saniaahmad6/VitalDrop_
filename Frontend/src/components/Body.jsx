import React from "react";
import '../css/Body.css'
import MyCarousel from "./MyCarousel";
import { Container, Row, Col } from 'react-bootstrap';
function Body(){
    const stylestagline = {
            paddingTop : "20%",
            paddingBottom :"20%",
            
      };
    return <>
        <MyCarousel/>
        <h1>
            
            <section id="first">
            <h1 class="mainheading">VitalDrop, Save Lives</h1>
            </section>
            
            
            <section id="second">
            
            <Container>
                <Row>
                <Col xs={12} md={6} style={{padding : '0'}}> 
                    <img  src={require('../images/happykids.jpg')} alt="happykids" class="myimg" />
                </Col>
                <Col xs={12} md={6} >
                

                <h1>A SAFER, PLENTIFUL SUPPLY</h1>
                    <p>
                    Every day in the world’s poorest countries, people die because of a shortage of blood.
                      We help meet donors with the needy.
                    </p>
                </Col>  
                </Row>
                    
                    
                    
                    
                    
                    
                
            </Container>
            
            </section>

            <section id="third">

            <Container>
                <Row>
                <Col xs={12} md={6} style={stylestagline}> 
                    <h1 class="mainheading">Wondering the patterns of donating? <br></br> Have a look!
                    </h1>
                </Col>

                <Col xs={12} md={6}>
                

                <img  src={require('../images/bloodchart.jpg')} alt="hbloodchart" class="myimg"  />
                </Col>  
                </Row>
                    
                    
                    
                    
                    
                    
                
            </Container>
            
            
            </section>
            
        </h1>
    </>
}

export default Body;