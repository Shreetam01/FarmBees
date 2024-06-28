package com.farmbees.server.service.expert;

import com.farmbees.server.model.expert.ExpertProfile;
import com.farmbees.server.model.expert.ExpertResponse;
import com.farmbees.server.repository.expert.ExpertRepository;
import com.farmbees.server.service.security.TokenService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpertService {

    private final TokenService tokenService;
    private final ExpertRepository expertRepository;

    public ExpertService(TokenService tokenService, ExpertRepository expertRepository) {
        this.tokenService = tokenService;
        this.expertRepository = expertRepository;
    }

    public ExpertProfile getExpertProfile(String token){
        if(token != null){
            if(tokenService.expertTokenValidator(token)){
                String expertEmail = tokenService.getEmailFromToken(token);
                return expertRepository.getExpertDetailsByEmail(expertEmail);
            }
            else{
                return null;
            }
        }
        else{
            return null;
        }
    }


    public List<ExpertResponse> getApprovedExperts(){
        boolean approved = true;
        return expertRepository.getExpertsBasedOnApproval(approved);
    }
    public List<ExpertResponse> getPendingExperts(){
        boolean approved = false;
        return expertRepository.getExpertsBasedOnApproval(approved);
    }

    public List<ExpertResponse> getRevokedExperts(){
        boolean revoked = true;
        return expertRepository.getExpertsBasedOnRevocation(revoked);
    }



    public boolean approveExpert(int id){
        if(expertRepository.expertPresent(id)){
            boolean approved = true;
            return expertRepository.updateApproval(id, approved);
        }
        else return false;
    }

    public boolean revokeExpert(int id){

        if(expertRepository.expertPresent(id)){
            boolean revoked = true;
            boolean approved = false;
            return expertRepository.updateRevocation(id, revoked, approved);
        }
        else return false;
    }



}
