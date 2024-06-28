package com.farmbees.server.controller.expert;

import com.farmbees.server.model.LoginRequestBody;
import com.farmbees.server.model.expert.ExpertLoginResponse;
import com.farmbees.server.service.expert.ExpertLoginService;
import com.farmbees.server.service.security.TokenService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expert")
@CrossOrigin(origins = "*")
public class ExpertLoginController {
    private final ExpertLoginService expertLoginService;
    private final TokenService tokenService;

    @Autowired
    public ExpertLoginController(ExpertLoginService expertLoginService, TokenService tokenService) {
        this.expertLoginService = expertLoginService;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ExpertLoginResponse handleExpertLogin(@RequestBody LoginRequestBody loginRequestBody, HttpServletResponse response) throws Exception {
        String email = loginRequestBody.getEmail();
        String password = loginRequestBody.getPassword();

        boolean login = expertLoginService.logExpert(email, password);

        ExpertLoginResponse expertLoginResponse = new ExpertLoginResponse();
        expertLoginResponse.setLogin(login);

        if(login){
            String userType = "EXPERT";
            String authToken = tokenService.createToken(email, password, userType);
            expertLoginResponse.setToken(authToken);
            expertLoginResponse.setType(userType);
        }

        return expertLoginResponse;
    }
}
