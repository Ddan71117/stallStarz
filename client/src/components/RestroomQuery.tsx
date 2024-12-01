import { useState, useEffect, useRef } from "react";

interface Restroom {
  id: string;
  name: string;
  lat: number;
  lon: number;
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

interface RestroomSearchProps {
  lat: number;
  lon: number;
  onRestroomsFound?: (restrooms: Restroom[]) => void;
}

interface RestroomResponse {
  elements: {
    type: string;
    id: number;
    lat: number;
    lon: number;
    tags: {
      name?: string;
      amenity: string;
      access?: string;
      wheelchair?: 'yes' | 'no' | 'limited';
      'toilets:disposal'?: 'flush' | 'chemical';
      'toilets:handwashing'?: 'yes' | 'no';
      'changing_table'?: 'yes' | 'no';
      unisex?: 'yes' | 'no';
      fee?: 'yes' | 'no';
      level?: string;
      male?: 'yes' | 'no';
      female?: 'yes' | 'no';
      indoor?: 'yes' | 'no';
    };
  }[];
}

function RestroomQuery({ lat, lon, onRestroomsFound }: RestroomSearchProps) {
  const [error, setError] = useState<string | null>(null);
  // Add a ref to track if we've already fetched for these coordinates
  const lastSearch = useRef<{lat: number, lon: number} | null>(null);

  const getAddress = async (lat: number, lon: number): Promise<string> => {
    try {
      const apiUrl = "https://api.opencagedata.com/geocode/v1/json";
      const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
      const url = `${apiUrl}?q=${lat}+${lon}&key=${apiKey}&no_annotations=1`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        return data.results[0].formatted;
      }
      return "Address not found";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Address not found";
    }
  };

  useEffect(() => {
    if (lat && lon) {
      // Check if we've already fetched for these coordinates
      if (lastSearch.current?.lat === lat && lastSearch.current?.lon === lon) {
        return;
      }

      const fetchRestrooms = async () => {
        setError(null);
        try {
          const query = `[out:json];
            (
              node["amenity"="toilets"](around:2000, ${lat}, ${lon});
            );
            out body 10;
            >; out skel qt;`;
          const apiUrl = "https://overpass-api.de/api/interpreter";
          const url = `${apiUrl}?data=${encodeURIComponent(query)}`;

          console.log(`Making API call for coordinates: lat=${lat}, lon=${lon}`);
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Failed to fetch restrooms.");
          }

          const data: RestroomResponse = await response.json();
          
          // Process only 10 restrooms
          const restroomsWithAddresses = await Promise.all(
            data.elements.slice(0, 10).map(async (item) => {
              const address = await getAddress(item.lat, item.lon);
              return {
                id: item.id.toString(),
                name: item.tags.name || address,
                lat: item.lat,
                lon: item.lon,
                amenities: {
                  wheelchairAccess: item.tags.wheelchair === 'yes',
                  flushToilet: item.tags['toilets:disposal'] === 'flush',
                  handwashing: item.tags['toilets:handwashing'] === 'yes',
                  babyChanging: item.tags.changing_table === 'yes',
                  unisex: item.tags.unisex === 'yes',
                  fee: item.tags.fee === 'yes',
                  indoor: item.tags.indoor === 'yes',
                  maleFacilities: item.tags.male === 'yes',
                  femaleFacilities: item.tags.female === 'yes'
                },
                access: item.tags.access || 'public'
              };
            })
          );

          // Update last search coordinates
          lastSearch.current = { lat, lon };
          
          if (onRestroomsFound) {
            onRestroomsFound(restroomsWithAddresses);
          }
        } catch (error) {
          setError((error as Error).message);
          console.error("Error fetching restrooms:", error);
        }
      };

      fetchRestrooms();
    }
  }, [lat, lon, onRestroomsFound]);

  return null;
}

export default RestroomQuery;