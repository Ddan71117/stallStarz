// Fetch user's restrooms cards to display on favorites page.

import React from 'react';
import { Card, Badge } from 'react-bootstrap';

interface RestroomCardProps {
  id: string;
  name: string;
  distance?: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  amenities?: {
    wheelchairAccess?: boolean;
    babyChanging?: boolean;
    unisex?: boolean;
  };
  onClick: (coordinates: { lat: number; lon: number }) => void;
}

const RestroomCard: React.FC<RestroomCardProps> = ({
  name,
  distance,
  coordinates,
  amenities = {},
  onClick
}) => {
  return (
    <Card 
      onClick={() => onClick(coordinates)}
      className="h-100 shadow-sm hover-card"
      style={{ cursor: 'pointer' }}
    >
      <Card.Body>
        <Card.Title className="text-truncate">
          {name}
        </Card.Title>
        <Card.Text>
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-geo-alt me-2"></i>
            {distance || 'Distance not available'}
          </div>
        </Card.Text>
        <div className="d-flex gap-2 flex-wrap">
          {amenities.wheelchairAccess && (
            <Badge bg="primary">
              <i className="bi bi-wheelchair me-1"></i>
              Wheelchair Access
            </Badge>
          )}
          {amenities.babyChanging && (
            <Badge bg="success">
              <i className="bi bi-person-arms-up me-1"></i>
              Baby Changing
            </Badge>
          )}
          {amenities.unisex && (
            <Badge bg="info">
              <i className="bi bi-gender-ambiguous me-1"></i>
              Unisex
            </Badge>
          )}
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <small>Click to view on map</small>
      </Card.Footer>
    </Card>
  );
};

export default RestroomCard;