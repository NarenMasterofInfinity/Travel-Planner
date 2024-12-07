import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for missing marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const LocationMap = ({ location }) => {
  const GEOAPIFY_API_KEY = '3ba7cb49b39f49da912edae37c16974b';
 
  const [coordinates, setCoordinates] = useState(null);

  // Fetch coordinates for the given location
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
            location
          )}&apiKey=${GEOAPIFY_API_KEY}`
        );
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const { lat, lon } = data.features[0].properties;
          setCoordinates({ lat, lon });
          console.log(`lat and long ${lat} ${lon}`)
        } else {
          console.error("Coordinates not found for the location.");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();

  }, [location, GEOAPIFY_API_KEY]);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      {coordinates ? (
        <MapContainer
          center={[coordinates.lat, coordinates.lon]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`}
            attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> contributors'
          />
          <Marker position={[coordinates.lat, coordinates.lon]}>
            <Popup>
              <b>Location:</b> {location}
              <br />
              Lat: {coordinates.lat}, Lon: {coordinates.lon}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading map for {location}...</p>
      )}
    </div>
  );
};

export default LocationMap;
