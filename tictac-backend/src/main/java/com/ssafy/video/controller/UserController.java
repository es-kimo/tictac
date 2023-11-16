package com.ssafy.video.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.video.model.dto.User;
import com.ssafy.video.model.service.UserService;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/login")
	private ResponseEntity<?> login(User user, HttpSession session) {
		User tempUser = userService.login(user);
		if (tempUser == null) {
			return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
		}
		session.setAttribute("loginUser", user.getUsername());
		return new ResponseEntity<String>(tempUser.getUsername(), HttpStatus.UNAUTHORIZED);
	}
	
	@GetMapping("/logout")
	private ResponseEntity<Void> logout(HttpSession session) {
		session.invalidate();
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	
}
