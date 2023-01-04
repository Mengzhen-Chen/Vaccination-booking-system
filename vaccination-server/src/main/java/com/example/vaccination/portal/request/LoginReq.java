package com.example.vaccination.portal.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class LoginReq {

    @NotNull(message = "Username cannot be empty")
    private String username;

    @NotNull(message = "Password cannot be empty")
    private String password;
}
