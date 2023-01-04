package com.example.vaccination.portal.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class BookingRes {

    private Date madeDate;

    private String vaccineType;

    private String address;

    private Integer id;

    private Integer times;


}
