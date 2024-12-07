// Itinerary.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Navbar";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"; // Import the Calendar icon
import PlaceIcon from "@mui/icons-material/Place"; // Import the Place icon
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";

const Trips = () => {
  const navigate = useNavigate();
  const handleClickCreate = () => {
    navigate("/create");
  };
  return (
    <>
    {localStorage.getItem("username") != null && (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="flex justify-between space-x-4">
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
            <button
              className="mt-3 w-full py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition duration-300"
              onClick={handleClickCreate}
            >
              Start
            </button>
          </div>

        </div>
      </div>
      )}
    </>
  );
};

const MyTrips = () => {
  const [itineraries, setItineraries] = useState([]);

  // Fetch data from API
  useEffect(() => {
    
    const fetchItineraries = async (myuser) => {
      try {
        
        const response = await axios.post(
          "http://localhost:8080/api/itinerary/user",
          { username: myuser }
        );

        setItineraries(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching itineraries:", error);
      }
    };
    const myuser = localStorage.getItem("username");
    fetchItineraries(myuser);
  }, []);

  return (
    <div
      className="flex flex-col justify-start mt-10"
      style={{ width: "90%", margin: "0 auto" }} // Center container horizontally
    >
      {localStorage.getItem("username") == null && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
        <Typography variant="h1" style={{ fontSize: "3rem" }}>
          You are not logged in :(
        </Typography>
        </div>
      )}
      {itineraries && itineraries.map((itinerary, index) => (
        <Link
          to={`/itinerary/${index}`} // Append /itinerary/<index>
          key={index}
          style={{ textDecoration: "none" }} // Remove link underline
        >
          <Card
            variant="outlined"
            style={{
              display: "flex",
              width: "80%", // Increased width to span more horizontally
              maxWidth: "1200px", // Limit max width for responsive design
              height: "200px",
              margin: "1rem auto", // Center cards horizontally
              borderRadius: "10px",
              border: "1px solid #ccc", // Default border
              transition: "border-color 0.3s", // Smooth transition for hover effect
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.border = "2px solid teal")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.border = "1px solid #ccc")
            }
          >
            <CardMedia
              component="img"
              height="120"
              image={itinerary.image || "https://via.placeholder.com/150"} // Fallback image
              alt={itinerary.title || "Trip Image"}
              style={{
                borderRadius: "10px 0 0 10px",
                width: "300px", // Adjust image width to fit the new card dimensions
              }}
            />
            {/* Text Section */}
            <CardContent style={{ flex: 1, padding: "0.5rem" }}>
              <Typography
                variant="h6"
                component="h4"
                style={{ fontWeight: "bold", fontSize: "1.2rem" }}
              >
                {itinerary.title}
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.5rem",
                }}
              >
                <CalendarTodayIcon
                  style={{ marginRight: "0.5rem", color: "gray" }}
                />
                <Typography variant="body2" style={{ fontSize: "0.9rem" }}>
                  {itinerary.startDate.substring(
                    0,
                    itinerary.startDate.length - 19
                  ) +
                    " to " +
                    itinerary.endDate.substring(
                      0,
                      itinerary.endDate.length - 19
                    ) || "Date not available"}
                </Typography>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.5rem",
                }}
              >
                <PlaceIcon style={{ marginRight: "0.5rem", color: "gray" }} />
                <Typography variant="body2" style={{ fontSize: "0.9rem" }}>
                  {itinerary.location || "Location not available"}
                </Typography>
              </div>
            </CardContent>
            <MoreHorizIcon
              style={{
                color: "gray",
                alignSelf: "flex-start",
                margin: "0.5rem",
              }}
            />
          </Card>
        </Link>
      ))}
    </div>
  );
};

const Itinerary = () => {
  return (
    <>
      <Header />
      <Trips />
      <MyTrips />
    
    </>
  );
};
export default Itinerary;
