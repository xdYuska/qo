"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Default view: central Baku.
const DEFAULT_LAT = 40.4093;
const DEFAULT_LON = 49.8671;

type NominatimResult = {
  display_name: string;
  lat: string;
  lon: string;
};

type AddressPickerProps = {
  onAddressChange: (address: string) => void;
  disabled?: boolean;
};

export default function AddressPicker({
  onAddressChange,
  disabled,
}: AddressPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const skipNextSearchRef = useRef(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize the map once, on mount — always visible.
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView(
      [DEFAULT_LAT, DEFAULT_LON],
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    // Clicking anywhere on the map places (or moves) the pin.
    mapRef.current.on("click", async (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      placeMarker(lat, lng);
      await reverseGeocode(lat, lng);
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Debounced search against Nominatim, restricted to Azerbaijan.
  useEffect(() => {
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      setResults([]);
      return;
    }

    if (query.trim().length < 3) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&countrycodes=az&limit=5&q=${encodeURIComponent(
            query
          )}`
        );
        const data: NominatimResult[] = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Address search failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [query]);

  function placeMarker(lat: number, lon: number) {
    if (!mapRef.current) return;

    mapRef.current.setView([lat, lon], 16);

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lon]);
    } else {
      markerRef.current = L.marker([lat, lon], {
        icon: defaultIcon,
        draggable: true,
      }).addTo(mapRef.current);

      markerRef.current.on("dragend", async () => {
        const position = markerRef.current!.getLatLng();
        await reverseGeocode(position.lat, position.lng);
      });
    }
  }

  async function reverseGeocode(lat: number, lon: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      if (data?.display_name) {
        onAddressChange(data.display_name);
        skipNextSearchRef.current = true;
        setQuery(data.display_name);
      }
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
    }
  }

  function handleSelectResult(result: NominatimResult) {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);

    skipNextSearchRef.current = true;
    setQuery(result.display_name);
    setResults([]);
    onAddressChange(result.display_name);
    placeMarker(lat, lon);
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={disabled}
          placeholder="Search your address, or click the map below"
          className="w-full border rounded-md px-3 py-2 disabled:opacity-60"
        />

        {results.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-md max-h-56 overflow-y-auto">
            {results.map((result, index) => (
              <li
                key={index}
                onClick={() => handleSelectResult(result)}
                className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}

        {isSearching && (
          <p className="text-xs text-gray-400 mt-1">Searching...</p>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Click the map or drag the pin to set your exact location
      </p>
      <div
        ref={mapContainerRef}
        className="w-full h-64 rounded-md border"
      />
    </div>
  );
}