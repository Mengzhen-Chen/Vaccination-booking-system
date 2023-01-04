package com.example.vaccination.portal.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
public class BookingReq {

    @NotNull(message = "vaccineId cannot be empty")
    private Integer vaccineId;

    @NotNull(message = "vaccinationPlaceId cannot be empty")
    private Integer vaccinationPlaceId;

    @NotNull(message = "appointmentId cannot be empty")
    private Integer appointmentId;

    @NotNull(message = "riskLeve cannot be empty")
    private Integer riskLeve;

    @NotNull(message = "madeDate cannot be empty")
    private Date madeDate;


}
