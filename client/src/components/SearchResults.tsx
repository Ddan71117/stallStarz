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
console.log("process...");
function SearchResults({ query }: SearchResultsProps) {
  const [searchData, setSearchData] = useState<Results[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const fetchData = useCallback(async () => {
    setError(null);
    try {
      const apiUrl = "https://api.opencagedata.com/geocode/v1/json";
      const apiKey = "07c816057971476cacff9911c96755b7";
      // const apiUrl = process.env.REACT_APP_OPENCAGE_BASE_URL;
      // const apiKey = process.env.REACT_APP_OPENCAGE_API;

      const url = `${apiUrl}?q=${encodeURIComponent(query)}&key=${apiKey}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data: { results: APIResult[] } = await response.json();

      const results = data.results.map((item, index) => ({
        id: index.toString(),
        title: item.formatted,
        coordinates: {
          lat: item.geometry.lat,
          lon: item.geometry.lon,
        },
      }));

      if (results.length > 0) {
        setLocation(results[0].coordinates);
      }
      setSearchData(results);
    } catch (error) {
      setError((error as Error).message);
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [fetchData, query]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!searchData.length && <p>No restrooms in your area.</p>}
      <ul>
        {searchData.map((result) => (
          <li key={result.id} onClick={() => setLocation(result.coordinates)}>
            {result.title || "Unnamed result"}
          </li>
        ))}
      </ul>
      {location && <RestroomQuery lat={location.lat} lon={location.lon} />}
    </div>
  );
}

export default SearchResults;
