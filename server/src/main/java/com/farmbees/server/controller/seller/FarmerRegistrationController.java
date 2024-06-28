package com.farmbees.server.controller.seller;

import com.farmbees.server.model.seller.Farmer;
import com.farmbees.server.model.seller.FarmerRegistrationResponse;
import com.farmbees.server.service.seller.FarmerRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/farmer")
@CrossOrigin(origins = "*")
public class FarmerRegistrationController {

    private final FarmerRegistrationService farmerRegistrationService;

    @Autowired
    public FarmerRegistrationController(FarmerRegistrationService farmerRegistrationService) {
        this.farmerRegistrationService = farmerRegistrationService;
    }

    @PostMapping("/register")
    public FarmerRegistrationResponse controlSellerRegistration(@RequestBody Farmer farmer){
        return farmerRegistrationService.registerFarmer(farmer);
    }
}
