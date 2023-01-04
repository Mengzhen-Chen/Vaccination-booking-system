package com.example.vaccination.portal.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "vaccine")
@Data
public class Vaccine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "category")
    private String category;

    @Column(name = "status")
    private Integer status;

    @Column(name = "introduction")
    private String introduction;
}
