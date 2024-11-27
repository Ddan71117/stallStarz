import React from 'react';
import { Carousel } from 'react-bootstrap';

const RestroomCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC"
          alt="Restroom 1"
        />
        <Carousel.Caption>
          {/* <p>Restroom interior</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.portland.gov/sites/default/files/styles/2_1_1600w/public/2020-02/main-gallery.jpg?itok=Rgx9qbwC"
          alt="Restroom 2"
        />
        <Carousel.Caption>
          {/* <p>Clean sinks</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default RestroomCarousel;