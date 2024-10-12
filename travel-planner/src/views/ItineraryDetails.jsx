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
  Grid2
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Header from "./Navbar";

//sample activities
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


const TravelPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue);
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
                      This is your detailed itinerary for the trip. You can add,
                      edit, or remove events from here.
                    </Typography>
                    {/* Additional Itinerary details */}
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
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2, borderColor: "black", color: "black" }}
                >
                  Edit
                </Button>
              </Paper>
            </Paper>
          </Box>

          {/* Right section with map */}
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
