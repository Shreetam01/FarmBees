package com.farmbees.server.controller.buyer;

import com.farmbees.server.model.LoginRequestBody;
import com.farmbees.server.model.buyer.BusinessmanLoginResponse;
import com.farmbees.server.service.buyer.BusinessmanLoginService;
import com.farmbees.server.service.security.TokenService;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/businessman")
@CrossOrigin(origins = "*")
public class BusinessmanLoginController {
    private final BusinessmanLoginService businessmanLoginService;
    private final TokenService tokenService;

    public BusinessmanLoginController(BusinessmanLoginService businessmanLoginService, TokenService tokenService) {
        this.businessmanLoginService = businessmanLoginService;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public BusinessmanLoginResponse handleBusinessmanLogin(@RequestBody LoginRequestBody loginRequestBody){
        String email = loginRequestBody.getEmail();
        String password = loginRequestBody.getPassword();
        boolean login = businessmanLoginService.logBusinessman(email, password);

        BusinessmanLoginResponse businessmanLoginResponse = new BusinessmanLoginResponse();
        businessmanLoginResponse.setLogin(login);

        if(login){
            String userType = "BUSINESSMAN";
            String authToken = tokenService.createToken(email, password, userType);
            businessmanLoginResponse.setToken(authToken);
            businessmanLoginResponse.setType(userType);
        }

        return businessmanLoginResponse;
    }
}
