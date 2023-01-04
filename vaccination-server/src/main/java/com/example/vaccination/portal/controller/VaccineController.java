package com.example.vaccination.portal.controller;

import com.example.vaccination.portal.model.Vaccine;
import com.example.vaccination.portal.repository.VaccineRepository;
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
@RequestMapping("/vaccine")
public class VaccineController {

    @Autowired
    private VaccineRepository vaccineRepository;

    @GetMapping("list")
    @ResponseBody
    public ResponseEntity<?> list() {
        Vaccine vaccine = new Vaccine();
        vaccine.setStatus(1);
        Example example = Example.of(vaccine);
        return ResponseEntity.ok(vaccineRepository.findAll(example));
    }
}
