package com.example.vaccination.portal.repository;

import com.example.vaccination.portal.model.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccineRepository extends JpaRepository<Vaccine, Integer> {

}
