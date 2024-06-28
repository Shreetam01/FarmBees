package com.farmbees.server.service.buyer;

import com.farmbees.server.model.buyer.Businessman;
import com.farmbees.server.model.buyer.BusinessmanRegistrationResponse;
import com.farmbees.server.repository.buyer.BusinessmanRepository;
import com.farmbees.server.service.security.PasswordEncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessmanRegistrationService {

    private final BusinessmanRepository businessmanRepository;
    private final PasswordEncryptionService passwordEncryptionService;

    @Autowired
    public BusinessmanRegistrationService(
            BusinessmanRepository businessmanRepository,
            PasswordEncryptionService passwordEncryptionService)
    {
        this.businessmanRepository = businessmanRepository;
        this.passwordEncryptionService = passwordEncryptionService;
    }

    public BusinessmanRegistrationResponse registerBusinessman(Businessman businessman){
        BusinessmanRegistrationResponse businessmanRegistrationResponse = new BusinessmanRegistrationResponse();

        boolean emailNotPresent = false;
        boolean phoneNumberNotPresent = false;
        boolean panNumberNotPresent = false;

        // Checking if the email is already present
        if(!businessmanRepository.emailPresent(businessman.getEmail())){
            emailNotPresent = true;
            businessmanRegistrationResponse.setEmail(true);
        }

        // Checking if the phone number is already present
        if(!businessmanRepository.phoneNumberPresent(businessman.getPhoneNumber())){
            businessmanRegistrationResponse.setPhoneNumber(true);
            phoneNumberNotPresent = true;
        }

        // Checking if the pan number is already present
        if(!businessmanRepository.panNumberPresent(businessman.getPanNumber())){
            businessmanRegistrationResponse.setPanNumber(true);
            panNumberNotPresent = true;
        }


        if(emailNotPresent && phoneNumberNotPresent && panNumberNotPresent){
            String fullName = businessman.getFullName();
            String email = businessman.getEmail();
            String phoneNumber = businessman.getPhoneNumber();
            String panNumber = businessman.getPanNumber();
            String state = businessman.getState();
            int pinNumber = businessman.getPinNumber();

            // Encrypting password before inserting to database
            String password = passwordEncryptionService.encryptPassword(businessman.getPassword());

            String address = businessman.getAddress();

            boolean updated = businessmanRepository.insertNewBusinessman(fullName, email, phoneNumber, panNumber, state, pinNumber, password, address);
            businessmanRegistrationResponse.setRegistration(updated);

        }


        return businessmanRegistrationResponse;
    }
}
