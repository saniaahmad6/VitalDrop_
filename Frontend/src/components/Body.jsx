import React from "react";
import '../css/Body.css'
import MyCarousel from "./MyCarousel";
import { Container, Row, Col } from 'react-bootstrap';
function Body(){
    const stylestagline = {
            paddingTop : "0%",
            paddingBottom :"0%",
            
      };
    return <>
        <MyCarousel/>
        <h1>
            
            <section id="first">
            <h1 class="mainheading">VitalDrop, Save Lives</h1>
            </section>
            
            
            <section id="second">
            
            <Container >
                <Row>
                <Col xs={12} md={6} style={{padding : '0'}}> 
                    <img  src={require('../images/happykids.jpg')} alt="happykids" class="myimg" />
                </Col>
                <Col xs={12} md={6} >
                

                <h1 style={{padding: "10% 4% 0",  }}>Give the gift of life</h1>
                <h2 style={{padding: " 0 4%",}}>Donate Blood</h2>
                    <p style={{padding: " 5% 4% 0", textAlign: "justify", textJustify: "inter-word"}}>
                    Whether you're a first-time donor or a regular, we welcome you to join our community of blood donors. Together, 
                    we can make a positive impact on the lives of those in need. Remember, by donating blood, you are giving the gift of life.
                    </p>
                </Col>  
                </Row>
                    
                    
                    
                    
                    
                    
                
            </Container>
            
            </section>
            <section style = {{padding : "5% 15% 3%" }}>
                
                    <h3 style = {{margin : "0 0 2%"}}>Become a Hero Today!</h3>
                    <p style={{fontSize : "1rem" , fontWeight: "normal", textAlign: "justify", textJustify: "inter-word", lineHeight: "1.7rem"}}>
                    Blood donation is a noble and life-saving act that benefits both the donor and the recipient. It is a simple and easy process that can make a significant 
                    difference in someone's life. Blood donors are heroes who selflessly give their time and blood to help save the lives of others, and by donating blood,
                     you can support patients undergoing surgery, cancer treatments, and emergency medical care. Blood donation ensures that there is a steady supply of blood 
                     available for those who need it. Additionally, donating blood can reduce the risk of heart disease and cancer for the donor. It is a wonderful way to give back to your 
                     community and make a positive impact on the lives of those around you. Regular blood donation can help to save lives and make a real difference in the world.
                    </p>
                
            </section>
            <section style = {{padding : "0 15% 5%"}}>
                    <h3 style = {{margin : "0 0 2%"}}>Burst the myths!</h3>
                    

                    
                        <h5 style={{margin : "0 0 2%"}}>Donating blood is painful.</h5>
                        <p style={{fontSize : "1rem" , fontWeight: "normal", textAlign: "justify", textJustify: "inter-word", lineHeight: "1.7rem"}}>

                                Fact: Donating blood is a safe and relatively painless process. 
                                The needle used is small and the discomfort experienced is minimal. Donors may feel a slight pinch during insertion, 
                                but the pain usually disappears after a few seconds. 

                        </p>
                        
                        
                        <h5 style={{margin : "0 0 2%"}}>Donating blood can make you sick. </h5>
                        <p style={{fontSize : "1rem" , fontWeight: "normal", textAlign: "justify", textJustify: "inter-word", lineHeight: "1.7rem"}}>
                                Fact: Donating blood does not make you sick. 
                                The equipment used during the donation process is sterile and single-use, 
                                ensuring that there is no risk of infection. Donors are also screened for any potential health problems 
                                before they are allowed to donate.

                        </p>
                        

                        
                        <h5 style = {{margin : "0 0 2%"}}>Only certain blood types are needed. </h5>
                        <p style={{fontSize : "1rem" , fontWeight: "normal", textAlign: "justify", textJustify: "inter-word", lineHeight: "1.7rem"}}>
                                Fact: All blood types are needed for donation, not just one specific type. In fact, the need 
                                for blood is constant, and donors of all blood types are encouraged to donate. 

                        </p>
                        
                        <h5 style = {{margin : "0 0 2%"}}>You can contract diseases like HIV/AIDS by donating blood.  </h5>
                        <p style={{fontSize : "1rem" , fontWeight: "normal", textAlign: "justify", textJustify: "inter-word", lineHeight: "1.7rem"}}>
                        Fact: Donating blood is a safe procedure, and there is no risk of contracting diseases 
                        like HIV/AIDS. All equipment used during the donation process is sterile and disposable, 
                        and donors are screened for any potential 
                        health problems before they are allowed to donate.
                        </p>

                        
                    
                

            </section>

            <section id="third">

            <Container>
                <Row>
                <Col xs={12} md={6} style={stylestagline}> 
                    <h1 class="mainheading">Wondering the patterns of donating? <br></br> Have a look!
                    </h1>
                </Col>

                <Col xs={12} md={6} style={{textAlign :"center"}}>
                

                <img  src={require('../images/bloodchart.jpg')} alt="hbloodchart" class="myimg1"  />
                </Col>  
                </Row>
                    
                    
                    
                    
                    
                    
                
            </Container>
            
            
            </section>
            
        </h1>
    </>
}

export default Body;