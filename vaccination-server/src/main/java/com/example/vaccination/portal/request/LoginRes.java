package com.example.vaccination.portal.request;

import com.example.vaccination.portal.model.User;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class LoginRes {

    private String token;

    private String type = "Bearer";

    private Integer id;

    private String username;

    private User user;

    private List<String> roles;

    public LoginRes(String token, Integer id, String username, List<String> roles, User user) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.roles = roles;
        this.user = user;
    }
}
