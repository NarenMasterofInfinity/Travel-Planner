package travelplanner.backend;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.SessionScope;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
//@SessionScope
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CurrentUserService currentUserService;

    @GetMapping("/")
    public List<User> listAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{username}")
    public String getEmail(@PathVariable String username) {
        return userService.getUserByUsername(username).getEmail();
    }

    @PostMapping("/create")
    public boolean createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

//    @GetMapping("/session")
//    public String getSessionDetails(HttpSession session) {
//
//        return "done";
//    }

    @PostMapping("/login")
    public boolean verify(@RequestBody Map<String, Object> body) {

        String username = body.get("username").toString();
        String password = body.get("password").toString();
        return userService.verifyUser(username, password);
    }

    @GetMapping("/logout")
    public void logout(HttpSession session) {
        return;
    }
}
