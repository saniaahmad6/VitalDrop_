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
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        
        <img
          className="d-block w-100 myimg"
          src={require('../images/carousel1.jpg')}
          
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100 myimg"
          src={require('../images/carousel1.jpg')}
          
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
  );
}

export default MyCarousel;