package com.farmbees.server.service.buyer;

import com.farmbees.server.repository.buyer.BusinessmanRepository;
import com.farmbees.server.service.security.PasswordEncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessmanLoginService {

    private final BusinessmanRepository businessmanRepository;
    private final PasswordEncryptionService passwordEncryptionService;

    @Autowired
    public BusinessmanLoginService(
            BusinessmanRepository businessmanRepository,
            PasswordEncryptionService passwordEncryptionService)
    {
        this.businessmanRepository = businessmanRepository;
        this.passwordEncryptionService = passwordEncryptionService;
    }

    public boolean logBusinessman(String email, String password){

        boolean returnValue = false;

        if(businessmanRepository.emailPresent(email)){
            String dbPassword = businessmanRepository.getBusinessmanPassword(email);
            if (passwordEncryptionService.validatePassword(password, dbPassword)){
                returnValue = true;
            }
        }

        return returnValue;
    }


}
