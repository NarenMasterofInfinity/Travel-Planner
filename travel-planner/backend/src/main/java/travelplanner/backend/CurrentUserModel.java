package travelplanner.backend;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "current_user")
public class CurrentUserModel {
    String username;
    String token;

    public CurrentUserModel(String token, String username) {
        this.token = token;
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
