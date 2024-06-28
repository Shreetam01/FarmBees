package com.farmbees.server.controller.seller;

import com.farmbees.server.model.product.ProductResponse;
import com.farmbees.server.model.seller.FarmerProfile;
import com.farmbees.server.service.security.TokenService;
import com.farmbees.server.service.seller.FarmerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/farmer")
@CrossOrigin(origins = "*")
public class FarmerController {

    private final FarmerService farmerService;
    private final TokenService tokenService;

    public FarmerController(FarmerService farmerService, TokenService tokenService) {
        this.farmerService = farmerService;
        this.tokenService = tokenService;
    }

    @GetMapping("/profile")
    public FarmerProfile getFarmerProfile(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        return farmerService.getFarmerProfile(token);
    }

    @GetMapping("/products/listed")
    public List<ProductResponse> getListedProducts(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if (token != null){
            if (tokenService.farmerTokenValidator(token)){
                String farmerEmail = tokenService.getEmailFromToken(token);
                return farmerService.getListedProducts(farmerEmail);
            }
            else{
                return null;
            }
        }
        else{
            return null;
        }
    }

    @GetMapping("/products/unlisted")
    public List<ProductResponse> getUnlistedProducts(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if (token != null){
            if (tokenService.farmerTokenValidator(token)){
                String farmerEmail = tokenService.getEmailFromToken(token);
                return farmerService.getUnlistedProducts(farmerEmail);
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
