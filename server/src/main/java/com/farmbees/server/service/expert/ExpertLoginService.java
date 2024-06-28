package com.farmbees.server.service.expert;

import com.farmbees.server.repository.expert.ExpertRepository;
import com.farmbees.server.service.security.PasswordEncryptionService;
import com.farmbees.server.service.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpertLoginService {

    private final ExpertRepository expertRepository;
    private final PasswordEncryptionService passwordEncryptionService;

    @Autowired
    public ExpertLoginService(
            ExpertRepository expertRepository,
            PasswordEncryptionService passwordEncryptionService)
    {
        this.expertRepository = expertRepository;
        this.passwordEncryptionService = passwordEncryptionService;
    }

    public boolean logExpert(String email, String password){
        boolean returnValue = false;

        if(expertRepository.emailPresent(email)){
            if(expertRepository.isExpertApproved(email)){
                String dbPassword = expertRepository.getExpertPassword(email);
                if (passwordEncryptionService.validatePassword(password, dbPassword)){
                    returnValue = true;
                }
            }
        }
        return returnValue;
    }


}
