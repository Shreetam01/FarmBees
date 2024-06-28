package com.farmbees.server.controller.expert;

import com.farmbees.server.model.expert.Expert;
import com.farmbees.server.model.expert.ExpertRegistrationResponse;
import com.farmbees.server.service.expert.ExpertRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expert")
@CrossOrigin(origins = "*")
public class ExpertRegistrationController {

    private final ExpertRegistrationService expertRegistrationService;

    @Autowired
    public ExpertRegistrationController(ExpertRegistrationService expertRegistrationService) {
        this.expertRegistrationService = expertRegistrationService;
    }

    @PostMapping("/register")
    public ExpertRegistrationResponse controlExpertRegistration(@RequestBody Expert expert){
        return expertRegistrationService.registerExpert(expert);
    }


}
