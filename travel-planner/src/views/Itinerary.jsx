// Itinerary.jsx
import React from "react";
import Header from "./Navbar";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // Import the Calendar icon
import PlaceIcon from "@mui/icons-material/Place"; // Import the Place icon
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Trips = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="flex justify-between space-x-4">
        {/* Create a New Trip Card */}
        <div className="w-72 p-5 border border-gray-300 rounded-lg hover:border-teal-500 transition duration-300">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12h18M12 3v18"
              />
            </svg>
            <h2 className="text-lg font-semibold">Create a new trip</h2>
          </div>
          <button className="mt-3 w-full py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition duration-300">
            Start
          </button>
        </div>

        {/* Build a Trip with AI Card */}
        <div className="w-72 p-5 border border-gray-300 rounded-lg hover:border-purple-500 transition duration-300">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold">Build a trip with AI</h2>
          </div>
          <button className="mt-3 w-full py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>

    </>
  );
};

const MyTrips = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
         <Card 
      variant="outlined" 
      style={{ display: "flex", width: "80%", height: "200px", margin: "1rem", borderRadius: "10px" }} // Increased height
    >
      {/* Image Section */}
      <CardMedia
        component="img"
        height="120" // Set the image height
        image="https://via.placeholder.com/150" // Replace with your image URL
        alt="Trip Image"
        style={{ borderRadius: "10px 0 0 10px", width: "350px" }} // Increased image width
      />
      {/* Text Section */}
      <CardContent style={{ flex: 1, padding: "0.5rem" }}> {/* Reduce padding */}
        <Typography variant="h6" component="h4" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Vagamon
        </Typography>
        <div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}>
          <CalendarTodayIcon style={{ marginRight: "0.5rem", color: "gray" }} />
          <Typography variant="body2" style={{ fontSize: "0.9rem" }}> {/* Increase text size */}
            Oct 10, 2024
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}>
          <PlaceIcon style={{ marginRight: "0.5rem", color: "gray" }} />
          <Typography variant="body2" style={{ fontSize: "0.9rem" }}> {/* Increase text size */}
            Vagamon
          </Typography>
        </div>
      </CardContent>
      <MoreHorizIcon style={{ color: "gray", alignSelf: "flex-start", margin: "0.5rem" }} />
    </Card>


      </div>
    );
}

const Itinerary = () => {
    return (
        <>
            <Header/>
            <Trips/>
            <MyTrips/>
        </>
    );
}
export default Itinerary;
