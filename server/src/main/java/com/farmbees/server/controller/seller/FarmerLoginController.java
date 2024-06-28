package com.farmbees.server.controller.seller;

import com.farmbees.server.model.LoginRequestBody;
import com.farmbees.server.model.seller.FarmerLoginResponse;
import com.farmbees.server.service.security.TokenService;
import com.farmbees.server.service.seller.FarmerLoginService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/farmer")
@CrossOrigin(origins = "*")
public class FarmerLoginController {
    private final FarmerLoginService farmerLoginService;
    private final TokenService tokenService;

    @Autowired
    public FarmerLoginController(FarmerLoginService farmerLoginService, TokenService tokenService) {
        this.farmerLoginService = farmerLoginService;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public FarmerLoginResponse handleFarmerLogin(@RequestBody LoginRequestBody loginRequestBody){
        String email = loginRequestBody.getEmail();
        String password = loginRequestBody.getPassword();

        boolean login = farmerLoginService.logFarmer(email, password);

        FarmerLoginResponse farmerLoginResponse = new FarmerLoginResponse();
        farmerLoginResponse.setLogin(login);

        if(login){
            String userType = "FARMER";
            String authToken = tokenService.createToken(email, password, userType);
            farmerLoginResponse.setToken(authToken);
            farmerLoginResponse.setType(userType);
        }

        return farmerLoginResponse;
    }
}
