package com.example.vaccination.portal.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "age")
    private Integer age;

    @Column(name = "gender")
    private String gender;

    @Column(name = "vaccination_status")
    private Integer vaccinationStatus;

    @Column(name = "country")
    private String country;

    @Column(name = "state")
    private String state;

    @Column(name = "town")
    private String town;

    @Column(name = "street")
    private String street;

    @Column(name = "postcode")
    private String postcode;
}
