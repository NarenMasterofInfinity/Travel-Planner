import React from 'react';
import './App.css';
import Itinerary from './views/Itinerary';
import Homepage from './views/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TravelPage from './views/ItineraryDetails';
import MapComponent from './views/MapComponent';
import WeatherApp from "./views/Weather"
import CreateItinerary from "./views/CreateItinerary"
function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path = "/" element = {<Homepage/>} />
      <Route path = "/itinerary" element = {<Itinerary/>} />
      <Route path = "/itinerary/:itinerary_number" element = {<TravelPage/>} />
      <Route path = "/map" element = {<MapComponent/>}/>
      <Route path = "/weather" element={<WeatherApp/>}></Route>
      <Route path = "/create" element = {<CreateItinerary/>}></Route>
    </Routes>
    </Router>

    </>
  );
}

export default App;
