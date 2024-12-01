import { useState, useEffect, useCallback } from "react";
import { Row, Col, Alert, Pagination } from "react-bootstrap";
import RestroomCard from "./RestroomCard";
import RestroomQuery from "./RestroomQuery";
// import ReviewsAndRatings from "./reviewsAndRatings"; Uncomment when ready to use.

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

interface Restroom {
  id: string;
  name: string;
  lat: number;
  lon: number;
  distance: string;
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
}

const ITEMS_PER_PAGE = 5;

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [searchData, setSearchData] = useState<APIResult[]>([]);
  const [restroomData, setRestroomData] = useState<Restroom[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination values
  const totalPages = Math.ceil(restroomData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRestrooms = restroomData.slice(startIndex, endIndex);

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

  const handleRestroomsFound = (restrooms: Restroom[]) => {
      // Sort restrooms by distance
  const sortedRestrooms = restrooms.sort((a, b) => {
    // Convert distance strings to numbers for comparison
    const distanceA = parseFloat(a.distance?.split(' ')[0] || '0');
    const distanceB = parseFloat(b.distance?.split(' ')[0] || '0');
    return distanceA - distanceB;  // Ascending order
    });
    setRestroomData(restrooms);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): string => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c * 0.621371; // Convert km to miles
  
  return `${distance.toFixed(1)} miles`;
};

  return (
    <div className="p-4">
      {error && <Alert variant="danger">{error}</Alert>}

      {!searchData.length && query && (
        <Alert variant="info">No locations found for your search.</Alert>
      )}

      {!query && (
        <Alert variant="info">Enter a location to search for restrooms.</Alert>
      )}

      <Row xs={1} md={2} lg={3} className="g-4 mb-4">
        {currentRestrooms.map((restroom) => (
          <Col key={restroom.id}>
            <RestroomCard
              id={restroom.id}
              name={restroom.name}
              coordinates={{ lat: restroom.lat, lon: restroom.lon }}
              distance={restroom.distance} 
              amenities={restroom.amenities}
            />
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {/* Show page numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}

      {selectedLocation && (
        <RestroomQuery
          lat={selectedLocation.lat}
          lon={selectedLocation.lon}
          onRestroomsFound={handleRestroomsFound}
        />
      )}

      <style>
        {`
          .hover-card {
            transition: transform 0.2s ease-in-out;
          }
          .hover-card:hover {
            transform: translateY(-5px);
          }
          .pagination {
            margin-bottom: 2rem;
          }
          .page-item.active .page-link {
            background-color: #0d6efd;
            border-color: #0d6efd;
          }
          .page-link {
            color: #0d6efd;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default SearchResults;
