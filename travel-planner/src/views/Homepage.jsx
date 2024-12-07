import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Navbar";
import "./Homepage.css";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Include skeleton CSS

const Cards = ({ state, country, town, isLoading }) => {
  return (
    <div className="past-destination">
      <Card
        className="py-4 black custom-card"
        isHoverable
        css={{ padding: "$6", borderRadius: "$lg" }}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">
            {isLoading ? <Skeleton width={80} /> : state}
          </p>
          <small className="text-default-500">
            {isLoading ? <Skeleton width={60} /> : country}
          </small>
          <h4 className="font-bold text-large">
            {isLoading ? <Skeleton width={120} /> : town}
          </h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          {isLoading ? (
            <Skeleton width={270} height={150} />
          ) : (
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src="/home/naren-root/Documents/Semester 5/Travel-Planner/travel-planner/public/logo192.png"
              width={270}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

const Homepage = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationsLoading, setLocationsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [fullLocations, setFullLocations] = useState([]);
  const [indices, setIndices] = useState([]);
  const debounceTimeout = 400; // Adjust debounce delay
  const apiKey = "3ba7cb49b39f49da912edae37c16974b"; // Replace with your Geoapify API key
  const navigate = useNavigate();

  const onClickSearchButton = (location) => {
    navigate(`/suggestion?location=${location}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText) {
        fetchSuggestions();
      } else {
        setSuggestions([]); // Clear suggestions if input is empty
      }
    }, debounceTimeout);

    return () => clearTimeout(timer); // Cleanup on input change
  }, [searchText]);

  const fetchSuggestions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete`,
        {
          params: {
            text: searchText,
            format: "json",
            apiKey: apiKey,
          },
        }
      );
      setSuggestions(response.data.results || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLocations = async (username) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/itinerary/user",
        { username }
      );
      let itineraries = response.data;
      const locs = itineraries.map((itinerary) => itinerary.location);
      const indexes = itineraries.map((itinerary) => itinerary.index);
      setIndices(indexes);
      setLocations(locs);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLocationsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("username")) {
      fetchLocations(localStorage.getItem("username"));
    }
  }, []);

  const fetchLocationData = async (location) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search`,
        {
          params: {
            text: location,
            apiKey: apiKey,
            format: "json",
          },
        }
      );

      const data = response.data;
      if (data.results && data.results.length > 0) {
        const properties = data.results[0];
        let state = properties.state || properties.county || "No state";
        let country = properties.country || "No country";
        return {
          location: location,
          state,
          country,
        };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching location data for ${location}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllLocationData = async () => {
      if (locations.length > 0) {
        try {
          const locationPromises = locations.map((location) =>
            fetchLocationData(location)
          );
          const allLocationData = await Promise.all(locationPromises);
          const validLocations = allLocationData.filter(
            (data) => data !== null
          );
          setFullLocations(validLocations);
        } catch (error) {
          console.error("Error fetching location data in batch:", error);
        }
      }
    };

    fetchAllLocationData();
  }, [locations]);

  return (
    <>
      <Header />
      <div className="flex justify-center mt-8">
        <p className="font-bold text-2xl">Where to?</p>
      </div>

      <div className="flex justify-center items-center mt-8 relative">
        <Input
          clearable
          placeholder="Places to go, things to do..."
          className="w-96"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          color="primary"
          className="ml-4"
          onClick={() => onClickSearchButton(searchText)}
        >
          Search
        </Button>

        {suggestions.length > 0 && (
          <ul className="absolute top-16 bg-white border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto w-100">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => setSearchText(suggestion.formatted)}
              >
                {suggestion.formatted}
              </li>
            ))}
          </ul>
        )}
        {/* {isLoading && <Skeleton width={400} />} */}
      </div>

      <div className="mt-64">
        {localStorage.getItem("username") && (
          <div className="flex justify-center">
            <p className="font-bold text-2xl">Past Destinations</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {localStorage.getItem("username") != null && locationsLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Cards key={index} isLoading={true} />
              ))
            : fullLocations.map(({ location, state, country }, index) => (
                <div
                  key={index}
                  onClick={() =>
                    (window.location.href = `http://localhost:3000/itinerary/${indices[index]}`)
                  }
                >
                  <Cards
                    key={index}
                    state={state}
                    country={country}
                    town={location}
                    isLoading={false}
                  />
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
