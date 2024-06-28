package com.farmbees.server.service.security;

import org.springframework.stereotype.Service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class PasswordEncryptionService {
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public String encryptPassword(String password){
        return passwordEncoder.encode(password);
    }

    public boolean validatePassword(String rawPassword, String encryptedPassword){
        return passwordEncoder.matches(rawPassword, encryptedPassword);
    }

}
