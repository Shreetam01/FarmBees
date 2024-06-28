package com.farmbees.server.service.general;

import com.farmbees.server.repository.expert.ExpertRepository;
import com.farmbees.server.repository.seller.FarmerRepository;
import com.farmbees.server.service.security.TokenService;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {
    private final TokenService tokenService;
    private final FarmerRepository farmerRepository;
    private final ExpertRepository expertRepository;

    public UserService(TokenService tokenService, FarmerRepository farmerRepository, ExpertRepository expertRepository) {
        this.tokenService = tokenService;
        this.farmerRepository = farmerRepository;
        this.expertRepository = expertRepository;
    }

    public int validateTokenAndGetId(String token){
        int id = 0;

        String type = tokenService.getTypeFromToken(token);
        if (Objects.equals(type, "FARMER")){
            if(tokenService.farmerTokenValidator(token)){
                String email = tokenService.getEmailFromToken(token);
                id = farmerRepository.getFarmerIdByEmail(email);
            }
        }
        else if (Objects.equals(type, "EXPERT")){
            if(tokenService.expertTokenValidator(token)){
                String email = tokenService.getEmailFromToken(token);
                id = expertRepository.getExpertIdByEmail(email);
            }
        }

        return id;
    }
}
