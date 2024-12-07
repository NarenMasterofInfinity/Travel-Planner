package travelplanner.backend;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "itineraries")
public class Itinerary {

    @Id
    private String id;

    private String index;
    private String location;
    private String title;
    private String username;
    private Date startDate;
    private Date endDate;
    private ArrayList<ArrayList<ActivityEntry>> activities;

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public String getId() {
        return id;
    }


    public void setId(String id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public ArrayList<ArrayList<ActivityEntry>> getActivities() {
        return activities;
    }

    public void setActivities(ArrayList<ArrayList<ActivityEntry>> activities) {
        this.activities = activities;
    }

    public static class ActivityEntry {
        @Id
        private String activityId;
        private int index;
        private String time;
        private String mode;
        private String activity;
        private String departureLocation;
        private Date departureDate;
        private String arrivalLocation;
        private String name;
        private Date checkInDate;
        private Date checkOutDate;
        private String restaurantName;
        private Date reservationDate;
        private String notes;

        public int getIndex() {
            return index;
        }

        public void setIndex(int index) {
            this.index = index;
        }

        public String getActivityId() {
            return activityId;
        }

        public void setActivityId(String activityId) {
            this.activityId = activityId;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public String getMode() {
            return mode;
        }

        public void setMode(String mode) {
            this.mode = mode;
        }

        public String getActivity() {
            return activity;
        }

        public void setActivity(String activity) {
            this.activity = activity;
        }

        public String getDepartureLocation() {
            return departureLocation;
        }

        public void setDepartureLocation(String departureLocation) {
            this.departureLocation = departureLocation;
        }

        public Date getDepartureDate() {
            return departureDate;
        }

        public void setDepartureDate(Date departureDate) {
            this.departureDate = departureDate;
        }

        public String getArrivalLocation() {
            return arrivalLocation;
        }

        public void setArrivalLocation(String arrivalLocation) {
            this.arrivalLocation = arrivalLocation;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Date getCheckInDate() {
            return checkInDate;
        }

        public void setCheckInDate(Date checkInDate) {
            this.checkInDate = checkInDate;
        }

        public Date getCheckOutDate() {
            return checkOutDate;
        }

        public void setCheckOutDate(Date checkOutDate) {
            this.checkOutDate = checkOutDate;
        }

        public String getRestaurantName() {
            return restaurantName;
        }

        public void setRestaurantName(String restaurantName) {
            this.restaurantName = restaurantName;
        }

        public Date getReservationDate() {
            return reservationDate;
        }

        public void setReservationDate(Date reservationDate) {
            this.reservationDate = reservationDate;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

    }
}
