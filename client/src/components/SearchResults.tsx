import { useState, useEffect, useCallback } from "react";
import RestroomQuery from "./RestroomQuery";

interface Geometry {
  lat: number;
  lon: number;
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
  
  console.log("Component rendered with query:", query);
  console.log("Environment API key:", import.meta.env.VITE_OPENCAGE_API_KEY);
  
  const [searchData, setSearchData] = useState<Results[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const fetchData = useCallback(async () => {
    console.log("fetchData called with query:", query);
    setError(null);
    try {
      const apiUrl = "https://api.opencagedata.com/geocode/v1/json";
      const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
      
      if (!query.trim()) {
        console.log("Empty query, skipping API call");
        return;
      }

      const url = `${apiUrl}?q=${encodeURIComponent(query)}&key=${apiKey}&limit=5`;
      console.log("Making request to:", url);

      const response = await fetch(url);
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        throw new Error(`Failed to fetch data: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response data:", data);

      if (data.results && data.results.length > 0) {
        console.log("Found locations:", data.results.length);
        const results = data.results.map((item: APIResult, index: number) => ({
          id: index.toString(),
          title: item.formatted,
          coordinates: {
            lat: item.geometry.lat,
            lon: item.geometry.lon,
          },
        }));

        console.log("Processed results:", results);
        if (results.length > 0) {
          setLocation(results[0].coordinates);
        }
        setSearchData(results);
      } else {
        console.log("No results found");
        setSearchData([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      console.log("Query changed, fetching new data:", query); // Debug log
      fetchData();
    }
  }, [fetchData, query]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!searchData.length && query && <p>No locations found for your search.</p>}
      {!query && <p>Enter a location to search for restrooms.</p>}
      <ul>
        {searchData.map((result) => (
          <li 
            key={result.id} 
            onClick={() => setLocation(result.coordinates)}
            style={{ cursor: 'pointer', padding: '8px', margin: '4px 0' }}
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