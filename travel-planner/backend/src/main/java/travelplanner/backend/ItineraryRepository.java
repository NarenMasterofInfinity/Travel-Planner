package travelplanner.backend;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ItineraryRepository extends MongoRepository<Itinerary, String> {
    List<Itinerary> findItinerariesByUsername(String username);

    Optional<Itinerary> findByIndex(String index);
}