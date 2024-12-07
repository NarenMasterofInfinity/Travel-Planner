package travelplanner.backend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CurrentUserRepository extends MongoRepository<CurrentUserModel, String> {
}
