import React, { useState, useEffect } from "react";
import {
  Grid2,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Box,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import Header from "./Navbar"

const getWeatherIcon = (temperature) => {
  if (temperature <= 5) {
    return <AcUnitIcon fontSize="large" color="primary" />;
  } else if (temperature >= 30) {
    return <WbSunnyIcon fontSize="large" color="warning" />;
  } else {
    return <CloudIcon fontSize="large" color="action" />;
  }
};

const WeatherApp = () => {
  const [place, setPlace] = useState("Chennai");
  const [latitude, setLatitude] = useState(52.52);
  const [longitude, setLongitude] = useState(13.41);
  const [weatherData, setWeatherData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeatherApi = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,windspeed_10m_max`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const hourlyData = {
        time: data.hourly.time.map((t) =>
          new Date(new Date(t).getTime() + data.utc_offset_seconds * 1000).toISOString()
        ),
        temperature2m: data.hourly.temperature_2m,
        humidity: data.hourly.relative_humidity_2m,
        windspeed: data.hourly.windspeed_10m,
      };

      const dailyData = {
        date: data.daily.time,
        maxTemperature: data.daily.temperature_2m_max,
        minTemperature: data.daily.temperature_2m_min,
        maxHumidity: data.daily.relative_humidity_2m_max,
        maxWindSpeed: data.daily.windspeed_10m_max,
      };

      setWeatherData(hourlyData);
      setDailyData(dailyData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch weather data.");
      setLoading(false);
    }
  };

  const fetchCoordinates = async (placeName) => {
    const apiKey = "0cf85219e3cf43a3a05d307168c63813";
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      placeName
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setLatitude(lat);
        setLongitude(lng);
        fetchWeatherApi(lat, lng);
      } else {
        setError("Location not found.");
      }
    } catch (err) {
      setError("Failed to fetch location data.");
    }
  };

  useEffect(() => {
    fetchWeatherApi(latitude, longitude);
  }, []);

  const handleLocationSubmit = () => {
    setLoading(true);
    fetchCoordinates(place);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const currentDate = new Date().toISOString().split("T")[0];
  const currentDayWeather = weatherData?.time.find((time) =>
    time.startsWith(currentDate)
  );
  const currentTemperature = weatherData?.temperature2m[
    weatherData?.time.indexOf(currentDayWeather)
  ];
  const currentHumidity = weatherData?.humidity[
    weatherData?.time.indexOf(currentDayWeather)
  ];
  const currentWindspeed = weatherData?.windspeed[
    weatherData?.time.indexOf(currentDayWeather)
  ];

  return (
    <>
    <Header/>
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Weather Information
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
        <TextField
          label="Location"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" onClick={handleLocationSubmit}>
          Fetch Weather
        </Button>
      </Box>

      <Grid2 container spacing={3}>
        <Grid2 item xs={12} sx={{ width: '100%' }}>
          <Card elevation={5} sx={{ padding: 3, textAlign: "center" }}>
            <Typography variant="h5" component="div" gutterBottom>
              Today's Weather - {new Date().toLocaleDateString()}
            </Typography>
            <Typography variant="h2">
              {currentTemperature}°C {getWeatherIcon(currentTemperature)}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Humidity: {currentHumidity}%
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              Wind Speed: {currentWindspeed} m/s
            </Typography>
          </Card>
        </Grid2>

        <Grid2 item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Hourly Weather</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Grid2 container spacing={2}>
                {weatherData?.time.map((time, index) => {
                  const isToday = time.startsWith(currentDate);
                  const hour = new Date(time).getHours();
                  return (
                    isToday && hour < 24 && (
                      <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card elevation={2}>
                          <CardContent>
                            <Typography variant="subtitle1">
                              {new Date(time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Typography>
                            <Typography variant="body1">
                              Temp: {weatherData.temperature2m[index]}°C
                            </Typography>
                            <Typography variant="body2">
                              Humidity: {weatherData.humidity[index]}%
                            </Typography>
                            <Typography variant="body2">
                              Wind: {weatherData.windspeed[index]} m/s
                            </Typography>
                            {getWeatherIcon(weatherData.temperature2m[index])}
                          </CardContent>
                        </Card>
                      </Grid2>
                    )
                  );
                })}
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Next 7 Days</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Grid2 container spacing={2}>
                {dailyData?.date.slice(1, 8).map((date, index) => (
                  <Grid2 item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card elevation={2}>
                      <CardContent>
                        <Typography variant="subtitle1">
                          {new Date(date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1">
                          Max Temp: {dailyData.maxTemperature[index]}°C
                        </Typography>
                        <Typography variant="body1">
                          Min Temp: {dailyData.minTemperature[index]}°C
                        </Typography>
                        <Typography variant="body2">
                          Max Humidity: {dailyData.maxHumidity[index]}%
                        </Typography>
                        <Typography variant="body2">
                          Max Wind Speed: {dailyData.maxWindSpeed[index]} m/s
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid2>
                ))}
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
    </>
  );
};

export default WeatherApp;