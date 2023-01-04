package com.example.vaccination.portal.repository;

import com.example.vaccination.portal.model.Booking;
import com.example.vaccination.portal.model.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

}
