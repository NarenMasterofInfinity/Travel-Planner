package travelplanner.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean createUser(User user) {
        String username = user.getUsername();
        if(userRepository.findById(username).isPresent()) {
            return false;
        }
        userRepository.save(user);
        return true;
    }

    public User getUserByUsername(String username) {
        return userRepository.findById(username).get();
    }

    public boolean verifyUser(String username, String password) {
        User user = getUserByUsername(username);
        if(!user.getPassword().equals(password)) {
            return false;
        }
        return true;
    }
}
