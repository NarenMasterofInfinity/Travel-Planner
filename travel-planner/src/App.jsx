import React from 'react';
import './App.css';
import Itinerary from './views/Itinerary';
import Homepage from './views/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TravelPage from './views/ItineraryDetails';
import MapComponent from './views/MapComponent';
import WeatherApp from "./views/Weather"
import CreateItinerary from "./views/CreateItinerary"
import SigninPage from './views/Signin';
import SignupPage from './views/SignUp';
import Suggestion from './views/Suggestions';
import Translator from './views/Translator';
import ProfilePage from './views/Profile';

function App() {
  return (
    <>
 
    <Routes>
      <Route path = "/signup" element= {<SignupPage/>}></Route>
      <Route path = "/signin" element={<SigninPage/>}></Route>
      <Route path = "/" element = {<Homepage/>} />
      <Route path = "/itinerary" element = {<Itinerary/>} />
      <Route path = "/itinerary/:itinerary_number" element = {<TravelPage/>} />
      <Route path = "/map" element = {<MapComponent/>}/>
      <Route path = "/weather" element={<WeatherApp/>}></Route>
      <Route path = "/create" element = {<CreateItinerary/>}></Route>
      <Route path = "/suggestion" element = {<Suggestion/>}/>
      <Route path = "/translate" element={<Translator/>}/>
      <Route path = "/profile" element={<ProfilePage/>}/>
    </Routes>
   

    </>
  );
}

export default App;
