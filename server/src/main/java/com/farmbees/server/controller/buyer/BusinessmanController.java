package com.farmbees.server.controller.buyer;

import com.farmbees.server.model.buyer.BusinessmanProfile;
import com.farmbees.server.service.buyer.BusinessmanService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/businessman")
@CrossOrigin(origins = "*")
public class BusinessmanController {

    private final BusinessmanService businessmanService;

    @Autowired
    public BusinessmanController(BusinessmanService businessmanService) {
        this.businessmanService = businessmanService;
    }

    @GetMapping("/profile")
    public BusinessmanProfile getBusinessmanProfile(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        return businessmanService.getBusinessmanProfile(token);
    }
}
