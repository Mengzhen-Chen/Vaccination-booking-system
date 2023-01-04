package com.example.vaccination.portal.controller;

import com.example.vaccination.portal.model.Booking;
import com.example.vaccination.portal.model.VaccinationPlace;
import com.example.vaccination.portal.model.Vaccine;
import com.example.vaccination.portal.repository.BookingRepository;
import com.example.vaccination.portal.repository.VaccinationPlaceRepository;
import com.example.vaccination.portal.repository.VaccineRepository;
import com.example.vaccination.portal.request.BookingReq;
import com.example.vaccination.portal.request.BookingRes;
import com.example.vaccination.portal.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/booking")
public class BookingController extends BaseController{

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VaccineRepository vaccineRepository;

    @Autowired
    private VaccinationPlaceRepository vaccinationPlaceRepository;


    @PostMapping("booking")
    @ResponseBody
    public ResponseEntity<?> booking(@RequestBody @Valid BookingReq bookingReq) {
        UserDetailsImpl userDetails = getCurrentUser();
        Booking booking = new Booking();
        booking.setVaccineId(bookingReq.getVaccineId());
        booking.setUserId(userDetails.getId());
        booking.setCreateTime(new Date());
        booking.setRiskLevel(bookingReq.getRiskLeve());
        booking.setVaccinationPlaceId(bookingReq.getVaccinationPlaceId());
        booking.setVaccineStatus(0);
        booking.setMadeDate(bookingReq.getMadeDate());
        bookingRepository.save(booking);
        bookingRepository.flush();

        Vaccine vaccine = vaccineRepository.findById(booking.getVaccineId()).orElse(null);
        Booking bookingCount = new Booking();
        bookingCount.setUserId(userDetails.getId());
        Example<Booking> countTimes = Example.of(bookingCount);
        long times = bookingRepository.count(countTimes);
        BookingRes bookingRes = new BookingRes();
        bookingRes.setId(booking.getId());
        bookingRes.setTimes((int) (times + 1));
        bookingRes.setMadeDate(booking.getMadeDate());
        Optional<VaccinationPlace> vaccinationPlaceOptional = vaccinationPlaceRepository.findById(booking.getVaccinationPlaceId());
        vaccinationPlaceOptional.ifPresent(vaccinationPlace -> bookingRes.setAddress(vaccinationPlace.getAddress()));
        if (null != vaccine) {
            bookingRes.setVaccineType(vaccine.getCategory());
        }
        return ResponseEntity.ok(bookingRes);
    }
}
