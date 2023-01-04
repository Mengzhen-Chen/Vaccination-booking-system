package com.example.vaccination.portal.repository;

import com.example.vaccination.portal.model.VaccinationPlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VaccinationPlaceRepository extends JpaRepository<VaccinationPlace, Integer> {

    @Query(value="select vp.* from appointment_place ap left join vaccination_place vp on ap.vaccination_place_id = vp.id where ap.appointment_id= :appointmentId", nativeQuery=true)
    List<VaccinationPlace> findByAppointment(Integer appointmentId);

}
