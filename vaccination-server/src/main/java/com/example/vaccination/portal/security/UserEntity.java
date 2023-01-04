package com.example.vaccination.portal.security;

import com.example.vaccination.portal.model.Role;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
public class UserEntity {

    private Integer id;

    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private Integer vaccinationStatus;

    private List<Role> roles;
}
