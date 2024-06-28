package com.farmbees.server.service.buyer;

import com.farmbees.server.model.buyer.BusinessmanProfile;
import com.farmbees.server.repository.buyer.BusinessmanRepository;
import com.farmbees.server.service.security.TokenService;
import org.springframework.stereotype.Service;

@Service
public class BusinessmanService {
    private final BusinessmanRepository businessmanRepository;
    private final TokenService tokenService;

    public BusinessmanService(BusinessmanRepository businessmanRepository, TokenService tokenService) {
        this.businessmanRepository = businessmanRepository;
        this.tokenService = tokenService;
    }

    public BusinessmanProfile getBusinessmanProfile(String token){
        if(token != null){
            if(tokenService.businessmanTokenValidator(token)){
                String businessmanEmail = tokenService.getEmailFromToken(token);

                return businessmanRepository.getBusinessmanDetailsByEmail(businessmanEmail);
            }
            else{
                return null;
            }
        }
        else{
            return null;
        }
    }
}
