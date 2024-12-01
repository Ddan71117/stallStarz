import React from "react";
import { Card, Badge } from "react-bootstrap";

interface RestroomCardProps {
  id: string;
  name: string;
  distance?: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  amenities: {
    wheelchairAccess: boolean;
    flushToilet: boolean;
    handwashing: boolean;
    babyChanging: boolean;
    unisex: boolean;
    fee: boolean;
    indoor: boolean;
    maleFacilities: boolean;
    femaleFacilities: boolean;
  };
  access?: string;
  onClick: (coordinates: { lat: number; lon: number }) => void;
}

const RestroomCard: React.FC<RestroomCardProps> = ({
  name,
  distance,
  coordinates,
  amenities = {
    wheelchairAccess: false,
    flushToilet: false,
    handwashing: false,
    babyChanging: false,
    unisex: false,
    fee: false,
    indoor: false,
    maleFacilities: false,
    femaleFacilities: false,
  },
}) => {
  const getGoogleMapsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lon}`;
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title className="text-truncate">
          {name || "Unnamed Location"}
        </Card.Title>
        <Card.Text>
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-geo-alt me-2"></i>
            {distance || "Distance unknown"}
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
        <a
          href={getGoogleMapsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          <small>
            <i className="bi bi-map me-1"></i>
            Get Directions
          </small>
        </a>
      </Card.Footer>
    </Card>
  );
};

export default RestroomCard;
