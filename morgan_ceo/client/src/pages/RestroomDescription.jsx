import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RestroomCarousel from './RestroomCarousel'; // Carousel Component
import ReviewsAndRatings from './ReviewsAndRatings'; // Reviews Section Component
import SimilarRestrooms from './SimilarRestrooms'; // Similar Restrooms Component

const RestroomDescription = () => {
  // Mock data for listing
  const listing = {
    name: 'The Portland Loo',
    reviews: [
      { title: 'Clean and Spacious', content: 'The restroom was clean and spacious.' },
      { title: 'Convenient Location', content: 'Great location, but could use better lighting.' },
    ],
  };

  return (
    <Container fluid className="py-4">
      {/* Header Section */}
      <Row>
        <Col md={8}>
          <h1>{listing.name}</h1>
          <p className="text-muted">810 NW 11th Avenue, Portland, OR 97209</p>
          <p>
            The Portland Loo® is both a standard restroom style used in parks around Portland and a product that is owned
            and sold to other communities by the City of Portland. A portion of the profits from sales supports Portland's
            provision of public restrooms locally.
          </p>
          <p>
            <strong>Keywords:</strong> Accessible, outdoor, emergency
          </p>
        </Col>
        <Col md={4} className="text-end">
          <p>
            <strong>Average Rating:</strong> 4.3
          </p>
          {/* Simple bar chart example */}
          <div style={{ width: '100%', height: '20px', background: '#f0f0f0', borderRadius: '5px' }}>
            <div style={{ width: '85%', height: '100%', background: '#28a745', borderRadius: '5px' }}></div>
          </div>
          <Button variant="outline-primary" className="mt-2">
            Add to Favorites
          </Button>
        </Col>
      </Row>

      {/* Image Carousel Section */}
      <Row className="my-4">
        <Col>
          <RestroomCarousel />
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row>
        <Col>
          <h3>Popular Reviews</h3>
          {/* Use the ReviewsAndRatings component */}
          <ReviewsAndRatings listing={listing} />
        </Col>
      </Row>

      {/* Similar Restrooms Section */}
      <Row className="mt-4">
        <Col>
          <h3>Similar Restrooms</h3>
          <SimilarRestrooms />
        </Col>
      </Row>
    </Container>
  );
};

export default RestroomDescription;