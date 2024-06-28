package com.farmbees.server.service.expert;

import com.farmbees.server.model.expert.Expert;
import com.farmbees.server.model.expert.ExpertRegistrationResponse;
import com.farmbees.server.repository.expert.ExpertRepository;
import com.farmbees.server.service.security.PasswordEncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpertRegistrationService {

    private final ExpertRepository expertRepository;
    private final PasswordEncryptionService passwordEncryptionService;

    @Autowired
    public ExpertRegistrationService(
            ExpertRepository expertRepository,
            PasswordEncryptionService passwordEncryptionService)
    {
        this.expertRepository = expertRepository;
        this.passwordEncryptionService = passwordEncryptionService;
    }

    public ExpertRegistrationResponse registerExpert(Expert expert){
        ExpertRegistrationResponse expertRegistrationResponse = new ExpertRegistrationResponse();

        boolean emailNotPresent = false;

        // Checking if the email is already present
        if(!expertRepository.emailPresent(expert.getEmail())){
            emailNotPresent = true;
            expertRegistrationResponse.setEmail(true);
        }


        if(emailNotPresent){
            String fullName = expert.getFullName();
            String email = expert.getEmail();
            String qualification = expert.getQualification();

            // Encrypting password before inserting to database
            String password = passwordEncryptionService.encryptPassword(expert.getPassword());

            boolean updated = expertRepository.insertNewExpert(fullName, email, qualification, password);
            expertRegistrationResponse.setRegistration(updated);

        }

        return expertRegistrationResponse;
    }
}
