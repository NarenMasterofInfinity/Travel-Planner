import React, { useEffect, useState } from "react";
import Header from "./Navbar";
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import dayjs from 'dayjs';
const ProfilePage = () => {
  const [user, setUser] = useState({
    username: localStorage.getItem("username"), 
    email: "",
  });
  const navigate = useNavigate();
  function onClickRedirect(index){
    index = parseInt(index);
    console.log(index);
    navigate(`/itinerary/${index}`)
  }
  const [itineraries, setItineraries] = useState([]);
//   debugger;
  // Fetch email based on username
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        // Simulated API call to fetch email using username
        const response = await axios.get(`http://localhost:8080/api/user/${user.username}`);
        const data = response.data;
        console.log("email" + data);
        if (data) {
          setUser((prevUser) => ({ ...prevUser, email: data }));
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    fetchEmail();
  }, [user.username]);

  // Fetch itineraries
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        // Simulated API call for itineraries
        const response = await axios.post(`http://localhost:8080/api/itinerary/user`, {username: user.username});
        const data = response.data;
        
        if (data) {
          setItineraries(data);
        }
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };

    fetchItineraries();
  }, [user.username]);

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 p-6">
      {/* User Info Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Welcome, {user.username}!
        </h1>
        {user.email ? (
          <p className="text-gray-600 text-lg">Email: {user.email}</p>
        ) : (
          <p className="text-gray-600 text-lg">Loading email...</p>
        )}
      </div>

      {/* Itineraries Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Your Itineraries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {itineraries.length > 0 ? (
            itineraries.map((itinerary) => (
                
              <div
                key={itinerary.id}
                onClick={event => onClickRedirect(itinerary.index)}
                className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {itinerary.title}
                </h3>
                <p className="text-gray-700">
                  Location: <span className="font-medium">{itinerary.location}</span>
                </p>
                <p className="text-gray-700">
                  Dates:{" "}
                  <span className="font-medium">
                    {dayjs(itinerary.startDate).format('DD/MM/YYYY')} to {dayjs(itinerary.endDate).format('DD/MM/YYYY')}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Loading itineraries...</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
