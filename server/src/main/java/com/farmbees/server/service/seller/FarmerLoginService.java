package com.farmbees.server.service.seller;

import com.farmbees.server.repository.seller.FarmerRepository;
import com.farmbees.server.service.security.PasswordEncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FarmerLoginService {

    private final FarmerRepository farmerRepository;
    private final PasswordEncryptionService passwordEncryptionService;

    @Autowired
    public FarmerLoginService(
            FarmerRepository farmerRepository,
            PasswordEncryptionService passwordEncryptionService)
    {
        this.farmerRepository = farmerRepository;
        this.passwordEncryptionService = passwordEncryptionService;
    }

    public boolean logFarmer(String email, String password){
        boolean returnValue = false;

        if(farmerRepository.emailPresent(email)){
            String dbPassword = farmerRepository.getFarmerPassword(email);
            if (passwordEncryptionService.validatePassword(password, dbPassword)){
                returnValue = true;
            }
        }

        return returnValue;
    }


}
