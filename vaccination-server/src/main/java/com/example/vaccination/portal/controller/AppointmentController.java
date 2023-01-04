package com.example.vaccination.portal.controller;

import com.example.vaccination.portal.model.Appointment;
import com.example.vaccination.portal.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping("findByVaccine")
    @ResponseBody
    public ResponseEntity<?> findByVaccine(Integer vaccineId) {
        Appointment appointment = new Appointment();
        appointment.setVaccineId(vaccineId);
        Example example = Example.of(appointment);
        return ResponseEntity.ok(appointmentRepository.findAll(example));
    }

}
