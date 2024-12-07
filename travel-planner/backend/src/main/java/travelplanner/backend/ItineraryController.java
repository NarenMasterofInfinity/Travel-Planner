package travelplanner.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/itinerary")
public class ItineraryController {
    @Autowired
    private ItineraryService itineraryService;

    @Autowired
    private CurrentUserService currentUserService;

    private String username;

    @PostMapping("/user")
    public List<Itinerary> getItineraries(@RequestBody Map<String, Object> body) {
        System.out.println(body);
        String username = (String) body.get("username");
        if(username == null || Objects.equals(username, "")){
            return null;
        }
        System.out.println(username);
        return itineraryService.findItinerariesByUsername(username);
    }

    @PostMapping("/{itinerary_number}")
    public Itinerary getItinerary(@PathVariable String itinerary_number, @RequestBody Map<String, Object> body) {
        String username = (String)body.get("username");
        if(username == null) {
            return null;
        }
        List<Itinerary> itineraries = itineraryService.findItinerariesByUsername(username);
        return itineraries.get(Integer.parseInt(itinerary_number));
    }

    @GetMapping("/")
    public List<Itinerary> getAllItineraries() {
        return itineraryService.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteItinerary(@PathVariable String id) {
        itineraryService.deleteItineraryById(id);
    }
    @GetMapping("/id/{username}/{index}")
    public String getID(@PathVariable String username, @PathVariable String index) {
        return itineraryService.findItinerariesByUsername(username).get(Integer.parseInt(index)).getId();
    }
    @DeleteMapping("/activity/{itinerary_number}/{dayIndex}/{activityIndex}")
    public String deleteActivity(@PathVariable String itinerary_number, @PathVariable int dayIndex, @PathVariable int activityIndex) {
        itineraryService.deleteItineraryActivityEntry(itinerary_number, dayIndex, activityIndex);
        return "Successfully deleted!";
    }

    @PostMapping("/activity/{itinerary_number}/{dayIndex}")
    public boolean addActivity(@PathVariable String itinerary_number, @PathVariable int dayIndex, @RequestBody Itinerary.ActivityEntry activityEntry) {
        itineraryService.addNewActivity(itinerary_number,dayIndex,activityEntry);
        return true;
    }


    @PutMapping("/{itinerary_number}")
    public void updateItinerary(@PathVariable String itinerary_number, @RequestBody Map<String, Object> body) {
        Itinerary itinerary = new Itinerary();
        itinerary.setLocation(body.get("location").toString());
        itinerary.setTitle(body.get("title").toString());
        String start = body.get("startDate").toString();
        String end = body.get("endDate").toString();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate startLDate = LocalDate.parse(start, formatter);
        LocalDate endLDate = LocalDate.parse(end, formatter);
        Date startDate = Date.from(startLDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(endLDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        itinerary.setStartDate(startDate);
        itinerary.setEndDate(endDate);
        itineraryService.updateItineraryById(itinerary_number, itinerary);
    }

    @PutMapping("/activity/{itinerary_number}/{dayIndex}/{activityIndex}")
    public String updateActivity(@PathVariable String itinerary_number, @PathVariable int dayIndex, @PathVariable int activityIndex, @RequestBody Itinerary.ActivityEntry entry ) {
        itineraryService.updateItineraryActivity(itinerary_number,dayIndex,activityIndex,entry);
        return "Updated Successfully";
    }

    @GetMapping("/count")
    public int getCountItinerary(String username){
        return itineraryService.findItinerariesByUsername(username).size();
    }

    @GetMapping("/fullcount")
    public int getFullCountItinerary(){
        return itineraryService.findAll().size();
    }
    @PostMapping("/create")
    public int createItinerary(@RequestBody Map<String, Object> requestBody){
        String username = (String) requestBody.get("username");
        if(username == null){
            return -1;
        }
        int index = getCountItinerary(username);
        String title = (String) requestBody.get("title");
        String location = (String) requestBody.get("location");

        String start = (String) requestBody.get("startDate");
        String end = (String) requestBody.get("endDate");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate startLDate = LocalDate.parse(start, formatter);
        LocalDate endLDate = LocalDate.parse(end, formatter);
        Date startDate = Date.from(startLDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(endLDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        long daysBetween = ChronoUnit.DAYS.between(startLDate, endLDate);
        ArrayList<ArrayList<Itinerary.ActivityEntry>> activites = new ArrayList<>();
        for(int i = 0; i < daysBetween; i++){
            activites.add(new ArrayList<>());
        }
        Itinerary itinerary = new Itinerary();
        itinerary.setIndex(String.valueOf(index));
        itinerary.setUsername(username);
        itinerary.setTitle(title);
        itinerary.setLocation(location);
        itinerary.setStartDate(startDate);
        itinerary.setEndDate(endDate);
        itinerary.setActivities(activites);
        itinerary.setActivities(activites);
        itineraryService.save(itinerary);
        return index;
    }
}
