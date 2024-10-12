import React from 'react';
import './App.css';
import Itinerary from './views/Itinerary';
import Homepage from './views/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TravelPage from './views/ItineraryDetails';

function App() {
  return (
    <>
    <Router>
    <Routes>
      <Route path = "/" element = {<Homepage/>} />
      <Route path = "/itinerary" element = {<Itinerary/>} />
      <Route path = "/itinerary/:itinerary_number" element = {<TravelPage/>} />
    </Routes>
    </Router>
    

    </>
  );
}

export default App;
