package com.example.vaccination.portal.controller;

import com.example.vaccination.portal.repository.VaccinationPlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/vaccinationPlace")
public class VaccinationPlaceController {

    @Autowired
    private VaccinationPlaceRepository vaccinationPlaceRepository;

    @GetMapping("findByAppointment")
    @ResponseBody
        public ResponseEntity<?> findByAppointment(Integer appointmentId) {
        return ResponseEntity.ok(vaccinationPlaceRepository.findByAppointment(appointmentId));
    }
}
