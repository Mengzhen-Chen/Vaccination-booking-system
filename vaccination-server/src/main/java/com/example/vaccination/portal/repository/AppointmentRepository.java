package com.example.vaccination.portal.repository;

import com.example.vaccination.portal.model.Appointment;
import com.example.vaccination.portal.model.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

}
