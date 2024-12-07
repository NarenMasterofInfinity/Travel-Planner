import React from 'react';
import { Drawer, Typography, TextField, Button } from '@mui/material';

const Drawers = ({ 
  itineraryNumber,
  dayIndex,
  open, 
  onClose, 
  onAddActivity, 
  activityInput, 
  handleInputChange, 
  drawerType 
}) => {
  
  const renderDrawerContent = () => {
    switch (drawerType) {
      case 'transportation':
        return (
          <>
            <Typography variant="h6">Add Transportation</Typography>
            <TextField
              label="Mode of Transport"
              value={activityInput.mode}
              onChange={(e) => handleInputChange('mode', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Departure Location"
              value={activityInput.departureLocation}
              onChange={(e) => handleInputChange('departureLocation', e.target.value)}
              fullWidth
              margin="normal"
            />
      
            <TextField
              label="Time"
              type="time"
              sx={{
                shrink: true,
              }}
              value={activityInput.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Arrival Location"
              value={activityInput.arrivalLocation}
              onChange={(e) => handleInputChange('arrivalLocation', e.target.value)}
              fullWidth
              margin="normal"
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <Button color="secondary" onClick={onClose}>Clear</Button>
              <Button variant="contained" color="primary" onClick={onAddActivity}>Add to Itinerary</Button>
            </div>
          </>
        );

      case 'hotel':
        return (
          <>
            <Typography variant="h6">Add Hotel</Typography>
            <TextField
              label="Hotel Name"
              value={activityInput.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Time"
              type="time"
              sx={{
                shrink: true,
              }}
              value={activityInput.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Check-in Date"
              type="date"
              sx={{
                shrink: true,
              }}
              value={activityInput.checkInDate}
              onChange={(e) => handleInputChange('checkInDate', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Check-out Date"
              type="date"
              sx={{
                shrink: true,
              }}
              value={activityInput.checkOutDate}
              onChange={(e) => handleInputChange('checkOutDate', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Location"
              value={activityInput.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              fullWidth
              margin="normal"
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <Button color="secondary" onClick={onClose}>Clear</Button>
              <Button variant="contained" color="primary" onClick={onAddActivity}>Add to Itinerary</Button>
            </div>
          </>
        );

      case 'food':
        return (
          <>
            <Typography variant="h6">Add Food</Typography>
            <TextField
              label="Restaurant Name"
              value={activityInput.restaurantName}
              onChange={(e) => handleInputChange('restaurantName', e.target.value)}
              fullWidth
              margin="normal"
            />
            
            <TextField
              label="Time"
              type="time"
              sx={{
                shrink: true,
              }}
              value={activityInput.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              fullWidth
              margin="normal"
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <Button color="secondary" onClick={onClose}>Clear</Button>
              <Button variant="contained" color="primary" onClick={onAddActivity}>Add to Itinerary</Button>
            </div>
          </>
        );

      case 'notes':
        return (
          <>
            <Typography variant="h6">Add Miscellenuous Activity</Typography>
            <TextField
              label="Time"
              type="time"
              sx={{
                shrink: true,
              }}
              value={activityInput.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Activity Description"
              value={activityInput.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <Button color="secondary" onClick={onClose}>Clear</Button>
              <Button variant="contained" color="primary" onClick={onAddActivity}>Add to Itinerary</Button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ padding: "20px", width: 500 }}>
        {renderDrawerContent()}
      </div>
    </Drawer>
  );
};

export default Drawers;
