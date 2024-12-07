import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapComponent.css';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import Header from './Navbar';

const myAPIKey = "3ba7cb49b39f49da912edae37c16974b"; 

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const geocode = async (address) => {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${myAPIKey}`
  );
  const data = await response.json();
  if (data.features.length > 0) {
    const { lat, lon } = data.features[0].properties;
    return [lat, lon];
  } else {
    throw new Error('Location not found');
  }
};


const RoutingMachine = ({ waypoints, locations, setDistanceInfo, transportMode, myAPIKey }) => {
  const map = useMap();
  const prevRouteRef = useRef(null);  // To track the previously drawn route
  const prevMarkersRef = useRef([]);  // To track the previously added markers

  React.useEffect(() => {
    // Clear previous route and markers
    if (prevRouteRef.current) {
      map.removeLayer(prevRouteRef.current);  // Remove previous route
    }
    prevMarkersRef.current.forEach((marker) => map.removeLayer(marker));  // Remove previous markers
    prevMarkersRef.current = [];  // Reset the markers array

    // Only proceed if there are at least two waypoints
    if (waypoints.length >= 2) {
      const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints
        .map((wp) => wp.join(','))
        .join('|')}&mode=${transportMode}&apiKey=${myAPIKey}`;

      console.log(url);
      console.log(waypoints);
      console.log(locations);

      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          if (!result.features || result.features.length === 0) {
            throw new Error('No routing data found');
          }

          // Draw the new route on the map
          const routeLayer = L.geoJSON(result, {
            style: () => ({
              color: 'rgba(20, 137, 255, 0.7)',
              weight: 5,
            }),
          }).addTo(map);
          prevRouteRef.current = routeLayer;  // Save reference to the new route layer

          // Create markers for each waypoint and add them to the map
          waypoints.forEach((wp, index) => {
            const marker = L.marker([wp[0], wp[1]]).addTo(map);
            marker.bindPopup(`${locations[index]} (Lat: ${wp[0]}, Lng: ${wp[1]})`);
            prevMarkersRef.current.push(marker);  // Track the marker for future removal
          });

          // Calculate and set distance info
          const summary = result.features[0].properties; // Get properties
          const distance = summary.legs[0].distance || 0; // Access legs for distance
          const duration = summary.legs[0].time || 0; // Access legs for time
          setDistanceInfo({
            distance: (distance / 1000).toFixed(2), // Convert to kilometers
            duration: (duration / 60).toFixed(2), // Convert to minutes
          });
        })
        .catch((error) => {
          console.error(error);
          setDistanceInfo({ distance: null, duration: null }); // Reset on error
        });
    }
  }, [waypoints, map, locations, setDistanceInfo, transportMode, myAPIKey]);

  return null;
};

const MapComponent = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [passthroughs, setPassthroughs] = useState([]); // Array to hold passthrough inputs
  const [waypoints, setWaypoints] = useState([]);
  const [error, setError] = useState('');
  const [distanceInfo, setDistanceInfo] = useState({ distance: null, duration: null }); // State for distance info
  const [transportMode, setTransportMode] = useState('drive');
  const [locations, setlocations] = useState([]);

  const handleAddPassthrough = () => {
    setPassthroughs([...passthroughs, '']); // Add an empty string for new input
  };

  const handleRemovePassthrough = (index) => {
    const newPassthroughs = passthroughs.filter((_, i) => i !== index);
    setPassthroughs(newPassthroughs);
  };

  const handlePassthroughChange = (index, value) => {
    const newPassthroughs = [...passthroughs];
    newPassthroughs[index] = value;
    setPassthroughs(newPassthroughs);
  };

  const handleSubmit = async () => {
    try {
      const fromCoords = await geocode(from);
      const toCoords = await geocode(to);
      const viaCoords = await Promise.all(
        passthroughs.map((v) => geocode(v.trim())) // Handle multiple via points
      );

      const allWaypoints = [fromCoords, ...viaCoords, toCoords];

      // Check if waypoints are valid
      const validWaypoints = allWaypoints.every((wp) => Array.isArray(wp) && wp.length === 2);
      if (!validWaypoints) {
        throw new Error('Invalid waypoints');
      }
      const allLocations = [from, ...passthroughs, to];
      setWaypoints(allWaypoints);
      setlocations(allLocations);
      setError('');
      setDistanceInfo({ distance: null, duration: null }); // Reset distance info on new calculation
    } catch (err) {
      setError('Failed to resolve one or more locations. Please check the input.');
      console.error(err); // Log the error for debugging
    }
  };

  return (
    <>
    <Header/>
    <div className="map-component">
      <div className="input-container">
        <h2>Route Planner</h2>
        <input
          type="text"
          placeholder="Enter Source (place name)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Destination (place name)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <h3>Passthrough Points</h3>
        {passthroughs.map((point, index) => (
          <div key={index} className="passthrough-input">
            <input
              type="text"
              placeholder="Enter Passthrough Point"
              value={point}
              onChange={(e) => handlePassthroughChange(index, e.target.value)}
            />
            <button onClick={() => handleRemovePassthrough(index)}>Remove</button>
          </div>
        ))}
        {/* Dropdown for transport mode selection */}
        {"Modes of Transport: "}
        <ToggleButtonGroup
      value={transportMode}
      exclusive
      onChange={e => setTransportMode(e.target.value)}
      aria-label="transport mode"
    >
      <ToggleButton value="drive" aria-label="drive">
        <DirectionsCarIcon />
      </ToggleButton>
      <ToggleButton value="motorcycle" aria-label="motorcycle">
        <TwoWheelerIcon />
      </ToggleButton>
      <ToggleButton value="walk" aria-label="walk">
        <DirectionsWalkIcon />
      </ToggleButton>
      <ToggleButton value="bus" aria-label="bus">
        <DirectionsBusIcon />
      </ToggleButton>
    </ToggleButtonGroup>

        <button onClick={handleAddPassthrough}>Add More Passthrough</button>
        <button onClick={handleSubmit}>Calculate Route</button>

        
        {error && <p className="error-message">{error}</p>}

        {/* Display distance and duration information */}
        {distanceInfo.distance !== null && distanceInfo.duration !== null && (
          <div className="distance-info">
            <h3>Route Information</h3>
            <p>Distance: {distanceInfo.distance} km</p>
            <p>Duration: {Math.floor(distanceInfo.duration/60)} hr {(distanceInfo.duration%60).toFixed(0)} min </p>
          </div>
        )}
      </div>
      <div className="map-container">
        <MapContainer
          center={[20, 0]}
          zoom={1} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='Powered by Geoapify | © OpenMapTiles | © OpenStreetMap contributors'
            url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`}
          />
          {waypoints.length >= 2 && <RoutingMachine waypoints={waypoints} locations={locations} setDistanceInfo={setDistanceInfo} transportMode={transportMode} myAPIKey={myAPIKey}/>}
        </MapContainer>
      </div>
    </div>
    </>
  );
};

export default MapComponent;
