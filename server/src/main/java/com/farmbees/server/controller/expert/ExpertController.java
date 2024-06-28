package com.farmbees.server.controller.expert;

import com.farmbees.server.model.expert.ExpertProfile;
import com.farmbees.server.service.expert.ExpertService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/expert")
@CrossOrigin(origins = "*")
public class ExpertController {
    private  final ExpertService expertService;

    @Autowired
    public ExpertController(ExpertService expertService) {
        this.expertService = expertService;
    }

    @GetMapping("/profile")
    public ExpertProfile getExpertProfile(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        return expertService.getExpertProfile(token);
    }
}
