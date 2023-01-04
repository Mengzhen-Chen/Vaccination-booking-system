package com.example.vaccination.portal.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "booking")
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "vaccination_place_id")
    private Integer vaccinationPlaceId;

    @Column(name = "vaccine_id")
    private Integer vaccineId;

    @Column(name = "made_date")
    private Date madeDate;

    @Column(name = "create_time")
    private Date createTime;

    @Column(name = "vaccine_status")
    private Integer vaccineStatus;

    @Column(name = "risk_level")
    private Integer riskLevel;



}
