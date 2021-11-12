import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import banner1 from '../../../../images/banner/banner1.png';
import banner2 from '../../../../images/banner/banner2.png';
import banner3 from '../../../../images/banner/banner3.png';

const Header = () => {
  useEffect(() => {
    document.title = "Baby's Dream";
  }, []);

  return (
    <div style={{ backgroundColor: '#CF102D' }}>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src={banner1} alt="fast slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={banner3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Header;
