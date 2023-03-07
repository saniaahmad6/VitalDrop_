import React from "react";
import '../css/Body.css'
import MyCarousel from "./MyCarousel";

function Body(){

    return <>
        <MyCarousel/>
        <h1>
            
            <section id="first">
            <h1 class="mainheading">VitalDrop, Save Lives</h1>
            </section>
            
            
            <section id="second">
            
            <div class="container">
                <div class="row">
                    <div class="col-6">
                    <img  src={require('../images/happykids.jpg')} alt="happykids" class="myimg" />
                    </div>
                    <div class="col-6" >
                    <h1>A SAFER, PLENTIFUL SUPPLY</h1>
                    <p class="">
                    Every day in the world’s poorest countries, people die because of a shortage of blood.
                      We help meet donors with the needy.
                    </p>
                    </div>
                </div>
            </div>
            
            </section>

            <section id="third">
            <h1 class="mainheading">Wondering the patterns of donating? <br></br> Have a look!
            </h1>
            <img  src={require('../images/bloodchart.jpg')} alt="hbloodchart" class="bloodchart" />
            </section>
            
        </h1>
    </>
}

export default Body;