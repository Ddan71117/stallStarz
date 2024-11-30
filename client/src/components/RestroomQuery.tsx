import { useState, useEffect } from "react";

// Define the Restroom interface
interface Restroom {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

// Define the RestroomResponse interface for the API response
interface RestroomResponse {
  elements: {
    id: number;
    lat: number;
    lon: number;
    tags: {
      name?: string;
    };
  }[];
}

function RestroomQuery() {
  const [restrooms, setRestrooms] = useState<Restroom[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [loadingLocation, setLoadingLocation] = useState(true);

  // Fetch user's location using the Geolocation API
  useEffect(() => {
    const fetchLocation = () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        setLoadingLocation(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLoadingLocation(false);
        },
        () => {
          setError("Unable to retrieve your location.");
          setLoadingLocation(false);
        }
      );
    };

    fetchLocation();
  }, []);

  // Fetch restrooms when location is available
  useEffect(() => {
    if (location) {
      const fetchRestrooms = async () => {
        setError(null);
        try {
          const bRoomQuery = `[out:json];
          node["amenity"="toilets"](around:2000, ${location.lat}, ${location.lon});
          out;`;
          const apiUrl = "https://overpass-api.de/api/interpreter";
          const url = `${apiUrl}?data=${encodeURIComponent(bRoomQuery)}`;

          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Fetch restrooms failed.");
          }

          const data: RestroomResponse = await response.json();

          // Filter out "Nameless Restroom" and transform data
          const restrooms = data.elements
            .filter((item) => item.tags.name) // Only keep restrooms with a name
            .map((item) => ({
              id: item.id.toString(),
              name: item.tags.name!,
              lat: item.lat,
              lon: item.lon,
            }));

          setRestrooms(restrooms);
        } catch (error) {
          setError((error as Error).message);
        }
      };
      fetchRestrooms();
    }
  }, [location]);

  return (
    <div>
      <h1>Nearby Restrooms</h1>
      {loadingLocation && <p>Fetching your location...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loadingLocation && !location && !error && (
        <p>Unable to fetch location. Please enable location services.</p>
      )}
      {restrooms.length === 0 && !error && location && (
        <p>No restrooms found in this area.</p>
      )}
      <ul>
        {restrooms.map((restroom) => (
          <li key={restroom.id}>
            <strong>{restroom.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestroomQuery;