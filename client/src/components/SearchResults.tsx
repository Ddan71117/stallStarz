import { useState, useEffect, useCallback } from "react";
import RestroomQuery from "./RestroomQuery";

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
}

function SearchResults({ query }: SearchResultsProps) {
  const [searchData, setSearchData] = useState<Results[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );

  
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
        }));

        console.log("Mapped results:", results);
        setSearchData(results);
        setLocation(results[0].coordinates);
      } else {
        setSearchData([]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred.");
    }
  }, [query]);

  
  useEffect(() => {
    if (query) fetchData();
  }, [fetchData, query]);

  const handleLocationClick = (coordinates: { lat: number; lon: number }) => {
    console.log("Location clicked:", coordinates);
    setLocation(coordinates);
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!searchData.length && query && <p>No locations found for your search.</p>}
      {!query && <p>Enter a location to search for restrooms.</p>}
      <ul>
        {searchData.map((result) => (
          <li
            key={result.id}
            onClick={() => handleLocationClick(result.coordinates)}
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
              padding: "8px",
              margin: "4px 0",
            }}
          >
            {result.title || "Unnamed result"}
          </li>
        ))}
      </ul>
      {location && <RestroomQuery lat={location.lat} lon={location.lon} />}
    </div>
  );
}

export default SearchResults;