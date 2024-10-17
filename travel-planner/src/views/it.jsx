import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Paper,
  Divider,
  Stack,
  Tab,
  Tabs,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Header from "./Navbar";

import { Accordion, AccordionSummary, AccordionDetails, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from "@mui/icons-material/Check";

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

const TripPlanner = () => {
  const startDate = new Date("2024-10-01"); // Fixed random start date
  const endDate = new Date("2024-10-05"); // Fixed random end date

  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1; // Total number of days

  const [activities, setActivities] = useState(
    Array.from({ length: totalDays }, () => [])
  );
  const [editingIndex, setEditingIndex] = useState(null);
  const [newActivity, setNewActivity] = useState("");

  const handleAddActivity = (dayIndex) => {
    const updatedActivities = [...activities];
    updatedActivities[dayIndex] = [
      ...updatedActivities[dayIndex],
      { text: newActivity, editing: false },
    ];
    setActivities(updatedActivities);
    setNewActivity("");
  };

  const handleEditActivity = (dayIndex, activityIndex) => {
    const updatedActivities = [...activities];
    updatedActivities[dayIndex][activityIndex].editing = true;
    setActivities(updatedActivities);
    setEditingIndex({ day: dayIndex, activity: activityIndex });
  };

  const handleSaveActivity = (dayIndex, activityIndex, updatedText) => {
    const updatedActivities = [...activities];
    updatedActivities[dayIndex][activityIndex].text = updatedText;
    updatedActivities[dayIndex][activityIndex].editing = false;
    setActivities(updatedActivities);
    setEditingIndex(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Itinerary</Typography>

      {Array.from({ length: totalDays }, (_, dayIndex) => (
        <Accordion key={dayIndex}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${dayIndex + 1}-content`}
            id={`panel${dayIndex + 1}-header`}
          >
            <Typography>{`Day ${dayIndex + 1} - Add a location`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                border: "1px dashed grey",
                padding: 2,
                borderRadius: "8px",
                mb: 2,
              }}
            >
              <Typography>
                Build your day by adding custom travel details like visit locations, food, transport, etc.
              </Typography>
            </Box>

            {/* Timeline for activities */}
            <Timeline sx={{ alignItems: 'flex-start' }}> {/* Align to the left */}
              {activities[dayIndex].map((activity, activityIndex) => (
                <TimelineItem key={activityIndex}>
                  <TimelineSeparator>
                    <TimelineDot />
                    {activityIndex < activities[dayIndex].length - 1 && (
                      <TimelineConnector />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    {activity.editing ? (
                      <Box sx={{ display: "flex", alignItems: "left" }}>
                        <TextField
                          defaultValue={activity.text}
                          onBlur={(e) =>
                            handleSaveActivity(dayIndex, activityIndex, e.target.value)
                          }
                          autoFocus
                        />
                        <IconButton
                          onClick={() =>
                            handleSaveActivity(
                              dayIndex,
                              activityIndex,
                              activity.text
                            )
                          }
                        >
                          <CheckIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "left" }}>
                        <Typography>{activity.text}</Typography>
                        <IconButton
                          onClick={() => handleEditActivity(dayIndex, activityIndex)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Box>
                    )}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>

            {/* Add new activity */}
            <Box sx={{ display: "flex", alignItems: "left", mt: 2 }}>
              <TextField
                label="Add activity"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                variant="outlined"
                size="small"
              />
              <Button
                onClick={() => handleAddActivity(dayIndex)}
                startIcon={<AddIcon />}
                sx={{ ml: 2 }}
                variant="outlined"
              >
                Add
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
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
                    <Typography variant="body1">
                      This is your detailed itinerary for the trip. You can add,
                      edit, or remove events from here.
                    </Typography>
                    <TripPlanner />
                  </Box>
                )}
                {selectedTab === 1 && (
                  <Box sx={{ width: "100%", padding: 2 }}>
                    <Typography variant="body1">
                      Recommended activities for you based on your preferences
                      and past trips.
                    </Typography>
                    <Stack spacing={3} direction="row" flexWrap="wrap">
                      {recommendedActivities.map((activity, index) => (
                        <Card key={index}>
                          <CardMedia
                            component="img"
                            height="100"
                            image={activity.image}
                            alt={activity.title}
                          />
                          <CardContent>
                            <Typography
                              variant="h6"
                              component="div"
                              gutterBottom
                            >
                              {activity.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {activity.location}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {activity.date}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Paper>
            </Paper>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default TravelPage;
