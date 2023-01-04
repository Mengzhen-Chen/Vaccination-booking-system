package com.example.vaccination.portal.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class SignupReq {

    @NotNull(message = "Password cannot be empty")
    private String password;

    @NotNull(message = "Name cannot be empty")
    private String name;

    private String gender;

    private String email;

    private String phone;

    private Integer age;

    private String country;

    private String state;

    private String town;

    private String street;

    private String postcode;



}
