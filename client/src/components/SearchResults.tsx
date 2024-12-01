import { useState, useEffect, useCallback } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import RestroomCard from "./RestroomCard";
import RestroomQuery from "./RestroomQuery";
import ReviewsAndRatings from "./reviewsAndRatings";

interface Geometry {
  lat: number;
  lng: number;
}

interface APIResult {
  formatted: string;
  geometry: Geometry;
}

interface SearchResultsProps {
  query: string;
}

interface Results {
  id: string;
  title: string;
  coordinates: { lat: number; lon: number };
  amenities: {
    wheelchairAccess: boolean;
    babyChanging: boolean;
    unisex: boolean;
  };
  distance: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [searchData, setSearchData] = useState<Results[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const fetchData = useCallback(async () => {
    setError(null);
    try {
      const apiUrl = "https://api.opencagedata.com/geocode/v1/json";
      const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

      if (!query.trim()) return;

      const url = `${apiUrl}?q=${encodeURIComponent(
        query
      )}&key=${apiKey}&limit=5`;
      console.log("Making request to:", url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      console.log("API response data:", data);

      if (data.results && data.results.length > 0) {
        const results = data.results.map((item: APIResult, index: number) => ({
          id: index.toString(),
          title: item.formatted,
          coordinates: {
            lat: item.geometry.lat,
            lon: item.geometry.lng,
          },
          amenities: {
            wheelchairAccess: Math.random() > 0.5,
            babyChanging: Math.random() > 0.5,
            unisex: Math.random() > 0.5,
          },
          distance: `${(Math.random() * 5).toFixed(1)} miles`,
        }));

        console.log("Mapped results:", results);
        setSearchData(results);
        setSelectedLocation(results[0].coordinates);
      } else {
        setSearchData([]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  }, [query]);

  useEffect(() => {
    if (query) fetchData();
  }, [fetchData, query]);

  const handleLocationClick = (coordinates: { lat: number; lon: number }) => {
    console.log("Location clicked:", coordinates);
    setSelectedLocation(coordinates);
  };

  return (
    // <div className="p-4">
    //   {error && <Alert variant="danger">{error}</Alert>}

    //   {!searchData.length && query && (
    //     <Alert variant="info">No locations found for your search.</Alert>
    //   )}

    //   {!query && (
    //     <Alert variant="info">Enter a location to search for restrooms.</Alert>
    //   )}

    //   <Row xs={1} md={2} lg={3} className="g-4 mb-4">
    //     {searchData.map((result) => (
    //       <Col key={result.id}>
    //         <RestroomCard
    //           id={result.id}
    //           name={result.title}
    //           coordinates={result.coordinates}
    //           distance={result.distance}
    //           amenities={result.amenities}
    //           onClick={handleLocationClick}
    //         />
    //       </Col>
    //     ))}
    //   </Row>

    //   <style>
    //     {`
    //       .hover-card {
    //         transition: transform 0.2s ease-in-out;
    //       }
    //       .hover-card:hover {
    //         transform: translateY(-5px);
    //       }
    //     `}
    //   </style>
    // </div>
    <div>
      <ReviewsAndRatings />
    </div>
  );
};

export default SearchResults;
