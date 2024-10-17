import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  IconButton,
  Popover,
  Grid2
} from '@mui/material';

import {
  Box,
  Paper,
  Divider,
  Stack,
  Tab,
  Tabs,
  Drawer,
  TextField,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
 
import CheckIcon from "@mui/icons-material/Check";
 

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import Header from "./Navbar";
import dayjs from 'dayjs';
 
import {Delete as DeleteIcon } from '@mui/icons-material';

import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Flight as FlightIcon,
  Restaurant as RestaurantIcon,
  Hotel as HotelIcon,
  Notes as SharpAccessIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

// Sample activities
const recommendedActivities = [
  {
    title: "Hiking Adventure",
    date: "Oct 11, 2024",
    location: "Vagamon Hills",
    image: "https://placehold.co/300x200?text=Hiking+Adventure",
  },
  {
    title: "Paragliding",
    date: "Oct 12, 2024",
    location: "Vagamon Cliff",
    image: "https://placehold.co/300x200?text=Paragliding",
  },
  {
    title: "Waterfall Visit",
    date: "Oct 13, 2024",
    location: "Vagamon Falls",
    image: "https://placehold.co/300x200?text=Waterfall+Visit",
  },
  {
    title: "Camping",
    date: "Oct 14, 2024",
    location: "Vagamon Forest",
    image: "https://placehold.co/300x200?text=Camping",
  },
];

const icons = [
  { icon: <FlightIcon />, label: 'Flight' },
  { icon: <HotelIcon />, label: 'Hotel' },
  { icon: <RestaurantIcon />, label: 'Food' },
  { icon: <SharpAccessIcon />, label: 'Notes' },
];

const TripPlanner = () => {
  const startDate = dayjs('2024-10-15');
  const endDate = dayjs('2024-10-20');

  const calculateDays = (start, end) => {
    return end.diff(start, 'day');
  };

  const numberOfDays = calculateDays(startDate, endDate);

  const [expanded, setExpanded] = useState(false);
  const [tripActivities, setTripActivities] = useState(Array(numberOfDays + 1).fill([]));
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(null);
  const [activityInput, setActivityInput] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickAdd = (event, dayIndex) => {
    setSelectedDay(dayIndex);
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleOpenDrawer = (icon) => {
    setCurrentIcon(icon);
    setActivityInput(''); // Reset activity input when opening the drawer
    setDrawerOpen(true);
    handleClosePopover(); // Close the popover when opening the drawer
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleInputChange = (event) => {
    setActivityInput(event.target.value);
  };

  const handleAddActivity = () => {
    const newActivities = [...tripActivities];
    newActivities[selectedDay] = [
      ...newActivities[selectedDay],
      { time: '', activity: activityInput, icon: currentIcon }, // Add new activity
    ];
    setTripActivities(newActivities);
    handleCloseDrawer(); // Close the drawer after adding
  };

  const tripDays = Array.from({ length: numberOfDays + 1 }, (_, index) => startDate.add(index, 'day'));

  return (
    <div>
      <h1>Trip Planner</h1>

      <Typography variant="h6">Start Date: {startDate.format('YYYY-MM-DD')}</Typography>
      <Typography variant="h6">End Date: {endDate.format('YYYY-MM-DD')}</Typography>
      <Typography variant="h6">Total Days: {numberOfDays + 1}</Typography>

      <div className="accordions">
        {tripDays.map((day, index) => (
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            key={index}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography>Day {index + 1} - {day.format('YYYY-MM-DD')}</Typography>
              <Typography variant="body2" style={{ marginLeft: "10px" }}>
                Add a location
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1">
                {tripActivities[index].length === 0 ? (
                  <div style={{
                    border: '1px dashed gray',
                    padding: '10px',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Typography>Build your day by adding from your saves or adding custom travel details not on Tripadvisor.</Typography>
                    <IconButton
                      onClick={(event) => handleClickAdd(event, index)}
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                ) : (
                  <Timeline position="left">
                    {tripActivities[index].map((activity, activityIndex) => (
                      <TimelineItem key={activityIndex}>
                        <TimelineSeparator>
                          <TimelineDot />
                          {activityIndex < tripActivities[index].length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography variant="h6">Time: {activity.time || "Set Time"}</Typography>
                          <Typography>Activity: {activity.activity || "Set Activity"}</Typography>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                )}
              </Typography>

              {tripActivities[index].length > 0 && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={(event) => handleClickAdd(event, index)}
                >
                  Add More
                </Button>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      {/* Popover for icon options */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div style={{ padding: '10px' }}>
          <Grid2 container spacing={1}>
            {icons.map((item, index) => (
              <Grid2 item key={index}>
                <IconButton onClick={() => handleOpenDrawer(item.label)}>
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

      {/* Drawer for input based on selected icon */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleCloseDrawer}
      >
        <div style={{ padding: '20px', width: 300 }}>
          <Typography variant="h6">
            Add {currentIcon}
          </Typography>
          <TextField
            label="Activity"
            value={activityInput}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddActivity}
          >
            Add Activity
          </Button>
        </div>
      </Drawer>
    </div>
  );
};


const TravelPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Header />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Stack direction="row" spacing={2}>
          {/* Left section with image and information */}
          <Box sx={{ width: "66.66%" }}>
            <Paper
              elevation={3}
              sx={{
                backgroundImage: "url('https://placehold.co/600x400?text=Waterfall&bg=68756d')",
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
                        minWidth: 0, // Ensures button stays circular
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Paper elevation={0} sx={{ padding: 2 }}>
                <Divider>
                  <Typography variant="h6" fontWeight="bold">
                    What's this trip about? (optional)
                  </Typography>
                </Divider>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={selectedTab}
                      onChange={handleChange}
                      TabIndicatorProps={{
                        sx: { backgroundColor: "primary" }, // Change the indicator color to the primary color
                      }}
                    >
                      <Tab label="Itinerary" />
                      <Tab label="For you" />
                    </Tabs>
                  </Box>
                </Box>
                {selectedTab === 0 && (
                  <Box sx={{ padding: 2 }}>
                    <Typography variant="body1">
                      This is your detailed itinerary for the trip. You can add, edit, or remove plans for each day.
                    </Typography>
                    <TripPlanner />
                  </Box>
                )}
                {selectedTab === 1 && (
                  <Box sx={{ width: '100%', padding: 2 }}>
                    <Typography variant="body1">
                      Recommended activities for you based on your preferences
                      and past trips.
                    </Typography>
                    <Grid2 container spacing={3}>
                      {recommendedActivities.map((activity, index) => (
                        <Grid2 item xs={12} sm={6} md={4} key={index}>
                          <Card>
                            <CardMedia
                              component="img"
                              height="100"
                              image={activity.image}
                              alt={activity.title}
                            />
                            <CardContent>
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                gutterBottom
                              >
                                {activity.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {activity.date} • {activity.location}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid2>
                      ))}
                    </Grid2>
                    {/* Content for "For You" tab */}
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

export default TravelPage;
