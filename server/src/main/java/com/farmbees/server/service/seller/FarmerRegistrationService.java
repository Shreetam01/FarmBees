package com.farmbees.server.service.seller;

import com.farmbees.server.model.seller.Farmer;
import com.farmbees.server.model.seller.FarmerRegistrationResponse;
import com.farmbees.server.repository.seller.FarmerRepository;
import com.farmbees.server.service.security.PasswordEncryptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FarmerRegistrationService {

    private final FarmerRepository farmerRepository;
    private final PasswordEncryptionService passwordEncryptionService;

    @Autowired
    public FarmerRegistrationService(
            FarmerRepository farmerRepository,
            PasswordEncryptionService passwordEncryptionService)
    {
        this.farmerRepository = farmerRepository;
        this.passwordEncryptionService = passwordEncryptionService;
    }

    public FarmerRegistrationResponse registerFarmer(Farmer farmer){
        FarmerRegistrationResponse farmerRegistrationResponse = new FarmerRegistrationResponse();

        boolean emailNotPresent = false;
        boolean phoneNumberNotPresent = false;
        boolean panNumberNotPresent = false;

        // Checking if the email is already present
        if(!farmerRepository.emailPresent(farmer.getEmail())){
            emailNotPresent = true;
            farmerRegistrationResponse.setEmail(true);
        }

        // Checking if the phone number is already present
        if(!farmerRepository.phoneNumberPresent(farmer.getPhoneNumber())){
            farmerRegistrationResponse.setPhoneNumber(true);
            phoneNumberNotPresent = true;
        }

        // Checking if the pan number is already present
        if(!farmerRepository.panNumberPresent(farmer.getPanNumber())){
            farmerRegistrationResponse.setPanNumber(true);
            panNumberNotPresent = true;
        }

        //

        if(emailNotPresent && phoneNumberNotPresent && panNumberNotPresent){
            String fullName = farmer.getFullName();
            String email = farmer.getEmail();
            String phoneNumber = farmer.getPhoneNumber();
            String panNumber = farmer.getPanNumber();
            String state = farmer.getState();
            int pinNumber = farmer.getPinNumber();

            // Encrypting password before inserting to database
            String password = passwordEncryptionService.encryptPassword(farmer.getPassword());

            String address = farmer.getAddress();

            boolean updated = farmerRepository.insertNewFarmer(fullName, email, phoneNumber, panNumber, state, pinNumber, password, address);
            farmerRegistrationResponse.setRegistration(updated);

        }


        return farmerRegistrationResponse;
    }
}
