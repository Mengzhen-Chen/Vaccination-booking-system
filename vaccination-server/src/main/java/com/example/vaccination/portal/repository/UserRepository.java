package com.example.vaccination.portal.repository;

import com.example.vaccination.portal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
