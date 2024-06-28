package com.farmbees.server.controller.buyer;

import com.farmbees.server.model.buyer.Businessman;
import com.farmbees.server.model.buyer.BusinessmanRegistrationResponse;
import com.farmbees.server.service.buyer.BusinessmanRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/businessman")
@CrossOrigin(origins = "*")
public class BusinessmanRegistrationController {

    private final BusinessmanRegistrationService businessmanRegistrationService;

    @Autowired
    public BusinessmanRegistrationController(BusinessmanRegistrationService businessmanRegistrationService) {
        this.businessmanRegistrationService = businessmanRegistrationService;
    }

    @PostMapping("/register")
    public BusinessmanRegistrationResponse controlBuyerRegistration(@RequestBody Businessman businessman){
        return businessmanRegistrationService.registerBusinessman(businessman);
    }
}
