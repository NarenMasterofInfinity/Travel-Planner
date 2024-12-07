package travelplanner.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CurrentUserService {
    @Autowired
    private CurrentUserRepository currentUserRepository;

    public String getCurrentUserName() {
        if(currentUserRepository.findAll().isEmpty()) {
            return "naren";
        };
        return currentUserRepository.findAll().get(0).getUsername();
    }

    public void deleteAll(){
        currentUserRepository.deleteAll();
    }

    public void save(CurrentUserModel user) {
        currentUserRepository.save(user);
    }
}
