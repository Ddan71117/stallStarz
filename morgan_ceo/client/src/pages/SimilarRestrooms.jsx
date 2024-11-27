import React from 'react';
import { CardGroup, Card } from 'react-bootstrap';
import './SimilarRestrooms.css';

const SimilarRestrooms = () => {
  const restrooms = [
    { name: 'Portland Loo (Jefferson Location)', img: 'https://lh3.googleusercontent.com/p/AF1QipP2u9fUORi1BeIpoK0B2w-zaJmwOGCnX_7vHj14=s1360-w1360-h1020' },
    { name: 'Portland Loo (Ben & Jerry`s)', img: 'https://lh3.googleusercontent.com/p/AF1QipNvnnIN20IR2EifjLAFjRt1xVOFILGM8e3qCJgJ=s1360-w1360-h1020' },
    { name: 'Portland Loo (Downtown)', img: 'https://lh3.googleusercontent.com/p/AF1QipNO0BjLuobfd2B0hgsrQElnkRhx-eTaI4mkNoJA=s1360-w1360-h1020' },
  ];

  return (
    <CardGroup>
      {restrooms.map((restroom, index) => (
        <Card key={index}>
          <Card.Img
            className="restroom-image"
            variant="top"
            src={restroom.img}
            alt={restroom.name}
          />
          <Card.Body>
            <Card.Title>{restroom.name}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
  );
};

export default SimilarRestrooms;