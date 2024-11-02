package travelplanner.backend;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ItineraryRepository extends MongoRepository<Itinerary, String> {
    List<Itinerary> findItinerariesByUsername(String username);

}