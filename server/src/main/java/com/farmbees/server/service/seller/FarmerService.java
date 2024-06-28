package com.farmbees.server.service.seller;

import com.farmbees.server.model.product.ProductResponse;
import com.farmbees.server.model.seller.FarmerProfile;
import com.farmbees.server.repository.product.ProductRepository;
import com.farmbees.server.repository.seller.FarmerRepository;
import com.farmbees.server.service.security.TokenService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmerService {
    private final FarmerRepository farmerRepository;
    private final ProductRepository productRepository;
    private final TokenService tokenService;

    public FarmerService(FarmerRepository farmerRepository, ProductRepository productRepository, TokenService tokenService) {
        this.farmerRepository = farmerRepository;
        this.productRepository = productRepository;
        this.tokenService = tokenService;
    }

    public FarmerProfile getFarmerProfile(String token){
        if(token != null){
            if(tokenService.farmerTokenValidator(token)){
                String farmerEmail = tokenService.getEmailFromToken(token);

                return farmerRepository.getFarmerDetailsByEmail(farmerEmail);
            }
            else{
                return null;
            }
        }
        else{
            return null;
        }
    }

    public List<ProductResponse> getListedProducts(String email){
        int farmerId = farmerRepository.getFarmerIdByEmail(email);
        if(productRepository.isSellerSelling(farmerId)){
            return productRepository.getListedProductsBySid(farmerId);
        }
        else{
            return null;
        }
    }

    public List<ProductResponse> getUnlistedProducts(String email){
        int farmerId = farmerRepository.getFarmerIdByEmail(email);
        if(productRepository.isSellerSelling(farmerId)){
            return productRepository.getUnlistedProductsBySid(farmerId);
        }
        else{
            return null;
        }
    }

}
