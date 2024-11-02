package travelplanner.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/itinerary")
public class ItineraryController {

    @Autowired
    private ItineraryService itineraryService;

    @GetMapping("/{itinerary_number}")
    public Itinerary getItinerary(@PathVariable String itinerary_number) {
        return itineraryService.findById(itinerary_number).get();
    }

    @GetMapping("/{username}")
    public List<Itinerary> getItineraries(@PathVariable String username) {
        return itineraryService.findItinerariesByUsername(username);
    }

    @GetMapping("/")
    public List<Itinerary> getAllItineraries() {
        return itineraryService.findAll();
    }

    @DeleteMapping("/{itinerary_number}")
    public void deleteItinerary(@PathVariable String itinerary_number) {
        itineraryService.deleteItineraryById(itinerary_number);
    }

    @DeleteMapping("/activity/{itinerary_number}/{dayIndex}/{activityIndex}")
    public void deleteActivity(@PathVariable String itinerary_number, @PathVariable int dayIndex, @PathVariable int activityIndex) {
        itineraryService.deleteItineraryActivityEntry(itinerary_number, dayIndex, activityIndex);
    }

    @PostMapping("/activity/{itinerary_number}/{dayIndex}")
    public void addActivity(@PathVariable String itinerary_number, @PathVariable int dayIndex, @RequestBody Itinerary.ActivityEntry activityEntry) {
        itineraryService.addNewActivity(itinerary_number,dayIndex,activityEntry);
    }


    @PutMapping("/{itinerary_number}")
    public void updateItinerary(@PathVariable String itinerary_number, @RequestBody Map<String, Object> body) {
        Itinerary itinerary = new Itinerary();
        itinerary.setLocation(body.get("location").toString());
        itinerary.setTitle(body.get("title").toString());
        itinerary.setStartDate((Date) body.get("startDate"));
        itinerary.setEndDate((Date) body.get("endDate"));
        itineraryService.updateItineraryById(itinerary_number, itinerary);
    }

    @PutMapping("/activity/{itinerary_number}/{dayIndex}/{activityIndex}")
    public void updateActivity(@PathVariable String itinerary_number, @PathVariable int dayIndex, @PathVariable int activityIndex, @RequestBody Itinerary.ActivityEntry entry ) {
        itineraryService.updateItineraryActivity(itinerary_number,dayIndex,activityIndex,entry);
    }


    @PostMapping("/create")
    public void createItinerary(@RequestBody Map<String, Object> requestBody){
        String title = (String) requestBody.get("title");
        String location = (String) requestBody.get("location");
        Date startDate = (Date) requestBody.get("startDate");
        Date endDate = (Date) requestBody.get("endDate");
        Itinerary itinerary = new Itinerary();
        itinerary.setTitle(title);
        itinerary.setLocation(location);
        itinerary.setStartDate(startDate);
        itinerary.setEndDate(endDate);
        itineraryService.save(itinerary);
    }
}
