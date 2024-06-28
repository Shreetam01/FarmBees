package com.farmbees.server.service.security;

import com.farmbees.server.service.buyer.BusinessmanLoginService;
import com.farmbees.server.service.expert.ExpertLoginService;
import com.farmbees.server.service.seller.FarmerLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final FarmerLoginService farmerLoginService;
    private final BusinessmanLoginService businessmanLoginService;
    private final ExpertLoginService expertLoginService;

    @Autowired
    public AuthenticationService( FarmerLoginService farmerLoginService,
                                 BusinessmanLoginService businessmanLoginService,
                                 ExpertLoginService expertLoginService )
    {
        this.farmerLoginService = farmerLoginService;
        this.businessmanLoginService = businessmanLoginService;
        this.expertLoginService = expertLoginService;
    }


    public boolean validateFarmer(String email, String password){
        return farmerLoginService.logFarmer(email, password);
    }

    public boolean validateBusinessman(String email, String password){
        return businessmanLoginService.logBusinessman(email, password);
    }

    public boolean validateExpert(String email, String password){
        return expertLoginService.logExpert(email, password);
    }

}
