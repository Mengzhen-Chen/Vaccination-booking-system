package com.example.vaccination.portal.controller;

import com.example.vaccination.portal.model.User;
import com.example.vaccination.portal.repository.UserRepository;
import com.example.vaccination.portal.request.EditProfileReq;
import com.example.vaccination.portal.request.LoginReq;
import com.example.vaccination.portal.request.LoginRes;
import com.example.vaccination.portal.request.SignupReq;
import com.example.vaccination.portal.security.JwtUtils;
import com.example.vaccination.portal.security.UserDetailsImpl;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController extends BaseController{

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginReq loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

		return ResponseEntity.ok(new LoginRes(jwt, userDetails.getId(), userDetails.getUsername(), roles, userRepository.findById(userDetails.getId()).orElse(null)));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody @Valid EditProfileReq editProfileReq) {
		User user = new User();
		BeanUtils.copyProperties(editProfileReq, user);
		if (StringUtils.isNotEmpty(editProfileReq.getEmail())) {
			user.setUsername(editProfileReq.getEmail());
		}
		if (StringUtils.isNotEmpty(editProfileReq.getPhone())) {
			user.setUsername(editProfileReq.getPhone());
		}
		user.setVaccinationStatus(0);
		user.setPassword(encoder.encode(user.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok("User registered successfully!");
	}

	@GetMapping("/myProfile")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> myProfile() {
		UserDetailsImpl userDetails = getCurrentUser();
		Optional<User> user= userRepository.findById(userDetails.getId());
		return user.map(ResponseEntity::ok).orElse(null);
	}

	@PostMapping("/editProfile")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> editProfile(@RequestBody @Valid EditProfileReq editProfileReq) {
		UserDetailsImpl userDetails = getCurrentUser();
		User user = userRepository.findById(userDetails.getId()).orElse(null);
		if (null == user) {
			return ResponseEntity.ok("");
		}
		BeanUtils.copyProperties(editProfileReq, user);
		if (StringUtils.isNotEmpty(editProfileReq.getEmail())) {
			user.setUsername(editProfileReq.getEmail());
		}
		if (StringUtils.isNotEmpty(editProfileReq.getPhone())) {
			user.setUsername(editProfileReq.getPhone());
		}
		user.setPassword(encoder.encode(editProfileReq.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok("successful");
	}
}
