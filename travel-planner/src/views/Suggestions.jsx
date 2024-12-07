import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Navbar";

const Suggestion = () => {
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const locationQuery = window.location.search.split("=")[1];
  const [location, setlocation] = useState(locationQuery);
  const [done, setdone] = useState(false);
  // Extract location from URL

  // Function to remove numbers from the string
  function removeNumbers(inputString) {
    return inputString.replace(/\d+/g, "");
  }

  // Function to fetch suggested locations
  const fetchSuggestedLocations = async (locationData) => {
    console.log(location + "  " + locationData);
    const prompt = `List of recommended locations in ${location}. Provide a title for each place, followed by recommended activities. The output should be structured with 'title', 'location', and 'recommendedActivities'.`;
    const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

    try {
      const response = await axios.post(
        apiUrl,
        {
          model: "meta-llama/llama-3.2-3b-instruct:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer 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`, // Replace with your API key
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data.choices[0].message.content.trim();
      let data = result.split("\n");

      data = data.filter((item) => item.length > 0);
      data = data.map((item) => `${item.trim()}`);
      const locationsData = parseLocations(data);
      setSuggestedLocations(locationsData);
      console.log("Suggested" + suggestedLocations);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestedLocations([]);
    }
    setIsLoading(false);
  };

  function parseLocations(array) {
    const places = [];
    let currentPlace = null;

    array.forEach((line) => {
      line = line.trim();
      console.log("Line"  +line);
      // Check for a new title
      if (/^\d+\./.test(line) || /^### \d\./.test(line)) {
        if (currentPlace) {
          // Push the previous place object to the array
          places.push(currentPlace);
        }
        // Initialize a new place object
        currentPlace = {
          title: line
            .replace(/^\d+\.\s\*\*/, "")
            .replace(/^\d+\.\*\*/, "")
            .replace(/\*\*$/, "")
            .replace(/^### /, "")
            .trim(),
          location: "",
          recommendedActivities: [],
        };
      } else if (line.startsWith("* Location:")) {
        // Extract and set location
        // console.log(line);
        if (currentPlace) {
          currentPlace.location = line.replace("* Location:", "").replace(/\*\*/g,"").trim();
        }
      } else if (line.startsWith("- ") || line.startsWith("+ ")) {
        // Extract and add recommended activities
        if (line.startsWith("- ") && currentPlace) {
          currentPlace.recommendedActivities.push(
            line.replace("- ", "").trim()
          );
        }else if (line.startsWith("+ ") && currentPlace) {
          currentPlace.recommendedActivities.push(
            line.replace("+ ", "").trim()
          );
        }
      }
    });

    // Push the last place to the list if it exists
    if (currentPlace) {
      places.push(currentPlace);
    }

    console.log("Places " + places);

    return places;
  }
  // Navigate to itinerary creation page
  const navigateToItinerary = (title) => {
    navigate(
      `/create?title=${encodeURIComponent(title)}&location=${encodeURIComponent(
        location
      )}`
    );
  };

  // UseEffect to fetch data once when the location changes or on initial load
  useEffect(() => {

      setlocation(locationQuery);
      setIsLoading(true);
      fetchSuggestedLocations(location);
      
    
  }, [location]); // This will run only when the `location` changes

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        {/* Location Header */}
        <div className="flex justify-center">
          <h1 className="text-6xl font-bold text-center text-gray-900">
            {location.replace(/%20/g, " ")}
          </h1>
        </div>

        {/* Subtitle */}
        <div className="flex justify-center mt-4">
          <p className="text-xl text-gray-600">List of Suggested Locations</p>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex justify-center mt-8">
            <div className="animate-spin border-t-4 border-blue-500 border-solid w-12 h-12 rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mx-6">
            {suggestedLocations.map((locationData, index) => (
              <div
                key={index}
                className="max-w-xs rounded overflow-hidden shadow-lg bg-white cursor-pointer border-2 border-gray-300 hover:border-blue-500 transition-all duration-300"
                onClick={() => navigateToItinerary(locationData.title)}
              >
                <div className="px-6 py-4">
                  <div className="font-bold text-xl text-gray-800">
                    {locationData.title}
                  </div>
                  <p className="text-gray-600 mt-2">
                    {locationData.recommendedActivities.join(", ")}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
                    {locationData.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Suggestion;
