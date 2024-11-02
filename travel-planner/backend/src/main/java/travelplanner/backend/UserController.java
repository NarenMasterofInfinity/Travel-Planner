package travelplanner.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }

    @PostMapping("/login")
    public boolean verify(@RequestBody Map<String, Object> body) {
        String username = body.get("username").toString();
        String password = body.get("password").toString();
        return userService.verifyUser(username, password);
    }
}
