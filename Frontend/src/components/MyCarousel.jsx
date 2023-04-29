import Carousel from 'react-bootstrap/Carousel';
import '../css/Carousel.css'
function MyCarousel() {
  return (
    <Carousel className="carouselcustom" >
      
          
          
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 myimg"
          src={require('../images/carousel1.jpg')}
         
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Help, you save lives!</h3>
          <p>Blood donation is a safe and simple process that takes about an hour to complete</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        
        <img
          className="d-block w-100 myimg"
          src={require('../images/carousel1.jpg')}
          
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Donate, its safe!</h3>
          <p>Blood donation centers and mobile blood drives follow strict safety and hygiene protocols to ensure that donors and staff are protected from infections, including COVID-19.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 myimg"
          src={require('../images/carousel1.jpg')}
          
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>It helps you too!</h3>
          <p>
          Regular blood donation can help reduce the risk of heart disease, stroke, and some types of cancer.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
  );
}

export default MyCarousel;