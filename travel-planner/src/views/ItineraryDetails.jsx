import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  IconButton,
  Popover,
  Grid2,
  Box,
  Paper,
  Divider,
  Stack,
  Tab,
  Tabs,
  Card,
  CardContent,
} from "@mui/material";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import "./Itinerary.css";
import Drawers from "./Drawers";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import Header from "./Navbar";
import dayjs from "dayjs";

import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Flight as FlightIcon,
  Restaurant as RestaurantIcon,
  Hotel as HotelIcon,
  Notes as SharpAccessIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

// Sample activities

const icons = [
  { icon: <FlightIcon />, label: "Transportation" },
  { icon: <HotelIcon />, label: "Hotel" },
  { icon: <RestaurantIcon />, label: "Food" },
  { icon: <SharpAccessIcon />, label: "Notes" },
];

const LLMAPIKEY = "";
  // "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";

const TripPlanner = () => {
  const startDate = dayjs("2024-10-15");
  const endDate = dayjs("2024-10-20");

  const calculateDays = (start, end) => {
    return end.diff(start, "day");
  };

  const numberOfDays = calculateDays(startDate, endDate);
  const [editingIndex, setEditingIndex] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [tripActivities, setTripActivities] = useState(
    Array(numberOfDays + 1).fill([])
  );

  const [drawerType, setDrawerType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(null);
  // const [activityInput, setActivityInput] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [activityInput, setActivityInput] = useState({
    time: "",
    mode: "",
    activity: "",
    departureLocation: "",
    departureDate: "",
    arrivalLocation: "",
    name: "",
    checkInDate: "",
    checkOutDate: "",
    restaurantName: "",
    reservationDate: "",
    notes: "",
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickAdd = (event, dayIndex) => {
    setSelectedDay(dayIndex);
    setAnchorEl(event.currentTarget);
    setOpenPopover(false);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleOpenDrawer = (
    icon,
    activity = null,
    dayIndex = null,
    activityIndex = null
  ) => {
    setCurrentIcon(icon);
    // console.log(icon.label)
    const label = icon.label.toLowerCase();
    // console.log(label)
    setDrawerType(label);

    // If editing an existing activity, pre-fill inputs
    if (activity) {
      setActivityInput(activity); // Load existing activity details for editing
      setEditingIndex({ dayIndex, activityIndex }); // Track the activity's index for updating
    } else {
      // Reset inputs for adding a new activity
      setActivityInput({
        time: "",
        mode: "",
        activity: icon.label,
        icon: icon.icon,
        departureLocation: "",
        departureDate: "",
        arrivalLocation: "",
        hotelName: "",
        name: "",
        checkInDate: "",
        checkOutDate: "",
        restaurantName: "",
        reservationDate: "",
        notes: "",
      });
      setEditingIndex(null); // No editing index if adding a new activity
    }

    setDrawerOpen(true);
    handleClosePopover(); // Close popover when opening the drawer
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };
  const handleInputChange = (key, value) => {
    setActivityInput((prevInput) => ({
      ...prevInput,
      [key]: value,
    }));
  };

  const handleAddActivity = () => {
    const updatedActivities = [...tripActivities];
    const newActivity = {
      time: activityInput.time,
      mode: activityInput.mode,
      activity: activityInput.activity || "",
      icon: currentIcon.icon,
      departureLocation: activityInput.departureLocation || "",
      departureDate: activityInput.departureDate || "",
      arrivalLocation: activityInput.arrivalLocation || "",
      hotelName: activityInput.hotelName || "",
      name: activityInput.name || "",
      checkInDate: activityInput.checkInDate || "",
      checkOutDate: activityInput.checkOutDate || "",
      restaurantName: activityInput.restaurantName || "",
      reservationDate: activityInput.reservationDate || "",
      notes: activityInput.notes || "",
    };

    if (editingIndex) {
      // If editing, update the existing activity
      updatedActivities[editingIndex.dayIndex][editingIndex.activityIndex] =
        newActivity;
    } else {
      // If adding, push the new activity
      updatedActivities[selectedDay] = [
        ...updatedActivities[selectedDay],
        newActivity,
      ];
    }

    setTripActivities(updatedActivities);
    handleCloseDrawer(); // Close the drawer after adding or editing
  };

  const tripDays = Array.from({ length: numberOfDays + 1 }, (_, index) =>
    startDate.add(index, "day")
  );


  const handleDeleteActivity = (dayIndex, activityIndex) => {
    const updatedActivities = [...tripActivities];
    updatedActivities[dayIndex].splice(activityIndex, 1); // Remove the specified activity
    setTripActivities(updatedActivities);
  };

  return (
    <div>
      <Box sx={{ maxWidth: 600, padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Start Date: <strong>{startDate.format("DD-MM-YYYY")}</strong>
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          End Date: <strong>{endDate.format("DD-MM-YYYY")}</strong>
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Total Days: <strong>{numberOfDays + 1}</strong>
        </Typography>

        <Divider sx={{ marginBottom: 2 }} />

        <div className="accordions">
          {tripDays.map((day, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                backgroundColor: "#f9f9f9", // Light background for accordion
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // Subtle shadow
                "&:before": {
                  display: "none", // Hide the default border
                },
                "&.Mui-expanded": {
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)", // Darker shadow on expansion
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
                sx={{
                  padding: 2,
                  "& .MuiAccordionSummary-content": {
                    margin: 0, // Remove default margin
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Day {index + 1} - {day.format("DD-MM-YYYY")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: "100%" }}>
                  {tripActivities[index].length === 0 ? (
                    <Box
                      sx={{
                        border: "1px dashed gray",
                        padding: 2,
                        marginBottom: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: "4px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <Typography>Cook your Itinerary here!</Typography>
                      <IconButton
                        onClick={(event) => handleClickAdd(event, index)}
                        color="primary"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <Timeline
                      position="left"
                      sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                          flex: 0.15,
                        },
                      }}
                    >
                      {console.log(tripActivities)}
                      {tripActivities[index].map((activity, activityIndex) => (
                        <TimelineItem key={activityIndex} position="right">
                          <TimelineSeparator>
                            <TimelineDot>{activity.icon}</TimelineDot>
                            {activityIndex <
                              tripActivities[index].length - 1 && (
                              <TimelineConnector />
                            )}
                          </TimelineSeparator>

                          <TimelineOppositeContent color="textSecondary">
                            <Typography variant="h6">
                              {activity.time || "Set Time"}
                            </Typography>
                          </TimelineOppositeContent>

                          <TimelineContent>
                          <div style= {{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ flexGrow: 1 }}>
                            <Typography
                              variant="h6"
                              style={{
                                fontWeight: "bold",
                                marginBottom: "8px",
                              }}
                            >
                              {activity.activity || "Set Activity"}
                            </Typography>

                            {activity.mode && (
                              <Typography
                                variant="body2"
                                style={{ color: "#757575" }}
                              >
                                Mode of transport : {activity.mode}
                              </Typography>
                            )}

                            {activity.departureLocation && (
                              <Typography
                                variant="body2"
                                style={{ color: "#757575" }}
                              >
                                Departure: {activity.departureLocation}
                              </Typography>
                            )}

                            {activity.arrivalLocation && (
                              <Typography
                                variant="body2"
                                style={{ color: "#757575" }}
                              >
                                Arrival: {activity.arrivalLocation}
                              </Typography>
                            )}

                            {activity.name && (
                              <Typography
                                variant="body2"
                                style={{ color: "#757575" }}
                              >
                                Name: {activity.name}
                              </Typography>
                            )}

                            {activity.checkInDate && (
                              <Typography
                                variant="body2"
                                style={{ color: "#757575" }}
                              >
                                Check-in Date: {activity.checkInDate}
                              </Typography>
                            )}

                            {activity.checkOutDate && (
                              <Typography
                                variant="body2"
                                style={{ color: "#757575" }}
                              >
                                Check-out Date: {activity.checkOutDate}
                              </Typography>
                            )}

                            {activity.restaurantName && (
                              <Typography
                                variant="body2"
                                style={{ color: "#757575" }}
                              >
                                Restaurant: {activity.restaurantName}
                              </Typography>
                            )}

                            {activity.reservationDate && (
                              <Typography
                                variant="body2"
                                style={{ color: "#757575" }}
                              >
                                Reservation: {activity.reservationDate}
                              </Typography>
                            )}

                            {activity.notes && (
                              <Typography
                                variant="body2"
                                style={{ color: "#757575" }}
                              >
                                Notes: {activity.notes}
                              </Typography>
                            )}
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <IconButton
                                color="primary"
                                onClick={() =>{
                                  console.log(activity);
                                console.log(activity.icon);
                                  handleOpenDrawer(
                                    {icon : activity.icon, label : activity.activity},
                                    activity,
                                    index,
                                    activityIndex
                                  )
                                }
                                }
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="secondary"
                                onClick={() =>
                                  handleDeleteActivity(index, activityIndex)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                            </div>
                            </div>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  )}

                  {tripActivities[index].length > 0 && (
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={(event) => handleClickAdd(event, index)}
                      sx={{ marginTop: 2 }}
                    >
                      Add More
                    </Button>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Box>

      {/* Popover for icon options */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "10px" }}>
          <Grid2 container spacing={1}>
            {icons.map((item, index) => (
              <Grid2 item key={index}>
                <IconButton onClick={() => handleOpenDrawer(item)}>
                  {item.icon}
                </IconButton>
                <Typography variant="caption">{item.label}</Typography>
              </Grid2>
            ))}
          </Grid2>
          <IconButton onClick={handleClosePopover} color="secondary">
            <CancelIcon />
          </IconButton>
        </div>
      </Popover>

      <Drawers
        open={drawerOpen}
        onClose={handleCloseDrawer}
        onAddActivity={handleAddActivity}
        activityInput={activityInput}
        handleInputChange={handleInputChange}
        drawerType={drawerType}
      />
    </div>
  );
};

const TravelPage1 = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const [recommendedActivities, setrecommendedActivities] = useState([]);

  const [location, setlocation] = useState("Vagamon");
  useEffect(() => {
    const fetchRecommendedActivities = async () => {
      const apiURL = "https://openrouter.ai/api/v1/chat/completions";
      const headers = {
        Authorization: `Bearer ${LLMAPIKEY}`,
        "Content-Type": "application/json",
      };
      const prompt = `I'm planning a trip to ${location} and want to discover hidden or lesser-known tourist spots that capture the essence of the area. Please provide a list of 5 unique locations from ${location}, with each entry containing only the following: a Title, a Description explaining what makes it interesting, a Specialty highlighting what’s unique about it, and a Recommendation for the best way to enjoy the place. Avoid any additional information or lengthy introductions. Keep the format consistent and concise.`;
      const body = {
        model: "google/gemini-flash-1.5-8b-exp",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
            ],
          },
        ],
      };
      const response = await axios.post(apiURL, body, { headers });

      function customTrim(input) {
        console.log(input);
        const trimmedInput = input.trim();
        return trimmedInput.replace(/^[\W0-9]+|[\W0-9]+$/g, "");
      }
      console.log(response);
      //let jsonresponse = await JSON.parse(response);

      let data = response.data.choices[0].message.content;
      data = data.split("\n").filter((d) => d.length > 0);
      // data = data.splice(1);
      data = data.map(customTrim);
      for (let i = 0; i < data.length; i += 4) {
        if (data[i].length === 0) {
          continue;
        }
        let j = i;
        let doc = {
          Name: data[j],
          Description: customTrim(data[j + 1].split(":")[1]),
          Speciality: customTrim(data[j + 2].split(":")[1]),
          Recommendation: customTrim(data[j + 3].split(":")[1]),
        };
        setrecommendedActivities((prevActivities) => [...prevActivities, doc]);
      }
    };
    fetchRecommendedActivities();
  }, [location]);

  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Stack direction="row" spacing={2}>
          <Box sx={{ width: "66.66%" }}>
            <Paper
              elevation={3}
              sx={{
                backgroundImage:
                  "url('https://placehold.co/600x400?text=Waterfall&bg=68756d')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 500,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box p={2} display="flex" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" color="white" fontWeight="bold">
                    Vagamon
                  </Typography>
                  <Typography variant="body2" color="white">
                    Oct 10
                  </Typography>
                  <Typography variant="body2" color="white">
                    Vagamon
                  </Typography>
                </Box>
                <Box display="flex" gap={1}>
                  <IconButton sx={{ backgroundColor: "white" }}>
                    <EditIcon
                      sx={{
                        mt: 1,
                        borderColor: "black",
                        color: "grey",
                        width: 60,
                        height: 35,
                        borderRadius: "30%",
                        minWidth: 0,
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Paper elevation={0} sx={{ padding: 2 }}>
                <Divider>
                  <Typography variant="h6" fontWeight="bold">
                    What's this trip about?
                  </Typography>
                </Divider>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={selectedTab}
                      onChange={handleChange}
                      TabIndicatorProps={{
                        sx: { backgroundColor: "primary" },
                      }}
                    >
                      <Tab label="Itinerary" />
                      <Tab label="For you" />
                    </Tabs>
                  </Box>
                </Box>
                {selectedTab === 0 && (
                  <Box sx={{ padding: 2 }}>
                    <TripPlanner />
                  </Box>
                )}
                {selectedTab === 1 && (
                  <Box sx={{ width: "100%", padding: 2 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      Recommended Locations Adhering to SDG 8 (in and around{" "}
                      {location})
                    </Typography>
                    <Grid2 container spacing={3}>
                      {recommendedActivities.map((activity, index) => (
                        <Grid2 item xs={12} sm={6} md={4} key={index}>
                          <Card
                            variant="outlined"
                            sx={{
                              height: "100%",
                              width: "700px",
                              display: "flex",
                              flexDirection: "column",
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Added shadow for depth
                              borderRadius: "8px", // Rounded corners
                              transition: "transform 0.2s, box-shadow 0.2s", // Smooth hover effect
                              "&:hover": {
                                transform: "scale(1.02)", // Scale effect on hover
                                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Stronger shadow on hover
                              },
                            }}
                          >
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                              >
                                {activity.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                              >
                                <strong>Location:</strong> {activity.Name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                              >
                                <strong>Description:</strong>{" "}
                                {activity.Description}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                              >
                                <strong>Speciality:</strong>{" "}
                                {activity.Speciality}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                <strong>Recommendation:</strong>{" "}
                                {activity.Recommendation}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid2>
                      ))}
                    </Grid2>
                  </Box>
                )}
              </Paper>
            </Paper>
          </Box>
          <Box sx={{ width: "33.33%" }}>
            <Paper elevation={3} sx={{ height: 320, padding: 2 }}>
              <img
                src="https://placehold.co/300x400?text=Map"
                alt="Placeholder map of Vagamon region"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Paper>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default TravelPage1;
