package com.farmbees.server.service.admin;

import com.farmbees.server.config.AdminConfig;
import com.farmbees.server.service.security.PasswordEncryptionService;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AdminService {
    private final AdminConfig adminConfig;
    private final PasswordEncryptionService passwordEncryptionService;

    public AdminService(AdminConfig adminConfig, PasswordEncryptionService passwordEncryptionService) {
        this.adminConfig = adminConfig;
        this.passwordEncryptionService = passwordEncryptionService;
    }

    public boolean logAdmin(String email, String password){
        boolean returnValue = false;

        String adminEmail = adminConfig.getEmail();
        String adminPassword = adminConfig.getPassword();

        if(Objects.equals(email, adminEmail)){
            if(passwordEncryptionService.validatePassword(password, adminPassword)){
                returnValue = true;
            }
        }
        return returnValue;
    }
}
