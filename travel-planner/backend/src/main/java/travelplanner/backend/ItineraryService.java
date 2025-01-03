package travelplanner.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Language;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItineraryService {

    @Autowired
    ItineraryRepository itineraryRepository;

    public List<Itinerary> findAll() {
        return itineraryRepository.findAll();
    }

    public Optional<Itinerary> findById(String id) {
        return itineraryRepository.findById(id);
    }

    public Itinerary save(Itinerary itinerary) {
        return itineraryRepository.save(itinerary);
    }

    public void deleteItineraryById(String id) {
        itineraryRepository.deleteById(id);
    }

    public void deleteItineraryActivityEntry(String id, int dayIndex, int activityIndex) {
        Optional<Itinerary> itinerary = itineraryRepository.findById(id);
        if (itinerary.isPresent()) {
            Itinerary it = itinerary.get();
            ArrayList<ArrayList<Itinerary.ActivityEntry>> activities = it.getActivities();
            activities.get(dayIndex).remove(activityIndex);
            it.setActivities(activities);
            itineraryRepository.save(it);
        }
    }

    public boolean updateItineraryById(String id, Itinerary itinerary) {
        Optional<Itinerary> optionalItinerary = itineraryRepository.findById(id);
        if(optionalItinerary.isPresent()) {
            Itinerary it = optionalItinerary.get();
            it.setLocation(itinerary.getLocation());
            it.setEndDate(itinerary.getEndDate());
            it.setTitle(itinerary.getTitle());
            it.setStartDate(itinerary.getStartDate());
            itineraryRepository.save(it);
            return true;
        }
        return false;
    }

    public void addNewActivity(String index, int dayIndex, Itinerary.ActivityEntry entry) {
        Optional<Itinerary> itinerary = itineraryRepository.findById(index);
        if (itinerary.isPresent()) {
            Itinerary it = itinerary.get();
            ArrayList<ArrayList<Itinerary.ActivityEntry>> activities = it.getActivities();
            if(activities == null) {
                activities = new ArrayList<>();
                activities.add(new ArrayList<>());
            }
            activities.get(dayIndex).add(entry);
            it.setActivities(activities);
            itineraryRepository.save(it);
        }
    }

    public void updateItineraryActivity(String id, int dayIndex, int activityIndex, Itinerary.ActivityEntry activityEntry) {
        Optional<Itinerary> optionalItinerary = itineraryRepository.findById(id);
        if(optionalItinerary.isPresent()) {
            Itinerary it = optionalItinerary.get();
            ArrayList<ArrayList<Itinerary.ActivityEntry>> activities = it.getActivities();
            activities.get(dayIndex).set(activityIndex, activityEntry);
            it.setActivities(activities);
            itineraryRepository.save(it);
        }
    }

    public List<Itinerary> findItinerariesByUsername(String username) {
        return itineraryRepository.findItinerariesByUsername(username);
    }

    public String translateText(String text, String source, String dest){
        return LanguageTranslation.doTranslation(text, source, dest);
    }

    public void saveCreateItinerary(Itinerary itinerary) {
        itineraryRepository.save(itinerary);
    }
}
