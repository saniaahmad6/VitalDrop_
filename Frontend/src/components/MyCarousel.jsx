import Carousel from 'react-bootstrap/Carousel';
import '../css/Carousel.css'
import Image from 'react-bootstrap/Image'
function MyCarousel() {
  return (
    <Carousel className="carouselcustom" >
      <Carousel.Item interval={5000} style={{ height: 1000 }}>
        <Image
          className="d-block w-100 myimg"
          src={require('../images/donor.jpg')}
          style={{ objectFit: 'cover' }}
          alt="First slide"
        />
        <Carousel.Caption style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <h3>Help, you save lives!</h3>
          <p>Blood donation is a safe and simple process that takes about an hour to complete</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000} style={{ height: 1000 }}>

        <Image
          className="d-block w-100 myimg"
          src={require('../images/vials.jpg')}
          style={{ objectFit: 'cover' }}
          alt="Second slide"
        />

        <Carousel.Caption style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <h3>Donate, its safe!</h3>
          <p>Blood donation centers and mobile blood drives follow strict safety and hygiene protocols to ensure that donors and staff are protected from infections, including COVID-19.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000} style={{ height: 1000 }}>
        <Image
          className="d-block w-100 myimg"
          src={require('../images/donationArt.png')}
          style={{ objectFit: 'cover' }}
          alt="Third slide"
        />

        <Carousel.Caption style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
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