package com.farmbees.server.service.security;

import com.farmbees.server.config.JwtConfig;
import com.farmbees.server.model.ParsedToken;
import com.farmbees.server.repository.buyer.BusinessmanRepository;
import com.farmbees.server.repository.expert.ExpertRepository;
import com.farmbees.server.repository.seller.FarmerRepository;
import com.farmbees.server.service.admin.AdminService;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Objects;

import io.jsonwebtoken.Claims;

@Service
public class TokenService {

    private final JwtConfig jwtConfig;
    private final FarmerRepository farmerRepository;
    private final BusinessmanRepository businessmanRepository;
    private final ExpertRepository expertRepository;
    private final PasswordEncryptionService passwordEncryptionService;
    private final AdminService adminService;

    public TokenService(JwtConfig jwtConfig, FarmerRepository farmerRepository, BusinessmanRepository businessmanRepository, ExpertRepository expertRepository, PasswordEncryptionService passwordEncryptionService, AdminService adminService) {
        this.jwtConfig = jwtConfig;
        this.farmerRepository = farmerRepository;
        this.businessmanRepository = businessmanRepository;
        this.expertRepository = expertRepository;
        this.passwordEncryptionService = passwordEncryptionService;
        this.adminService = adminService;
    }

    public String createToken(String email, String password, String type){
        String userData = type + ":" + email + ":" + password;

        return Jwts.builder()
                .setSubject(userData)
//                .claim("type", type)
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + jwtConfig.getExpirationMs()))
                .signWith(jwtConfig.secretKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public boolean isJwtToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(jwtConfig.secretKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    private ParsedToken parseToken(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(jwtConfig.secretKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String decryptedData = claims.getSubject();
        String[] userInformation = decryptedData.split(":", 3);

        return new ParsedToken(userInformation[0], userInformation[1], userInformation[2]);
    }

    public String getEmailFromToken(String token){
        return parseToken(token).getEmail();
    }

    public String getTypeFromToken(String token){
        return parseToken(token).getType();
    }

    public boolean farmerTokenValidator(String token){
        ParsedToken parsedToken = parseToken(token);
        boolean returnValue = false;

        if (Objects.equals(parsedToken.getType(), "FARMER")){
            if(farmerRepository.emailPresent(parsedToken.getEmail())){
                String dbPassword = farmerRepository.getFarmerPassword(parsedToken.getEmail());
                if (passwordEncryptionService.validatePassword(parsedToken.getPassword(), dbPassword)){
                    returnValue = true;
                }
            }
        }

        return returnValue;
    }

    public boolean businessmanTokenValidator(String token){
        ParsedToken parsedToken = parseToken(token);
        boolean returnValue = false;

        if (Objects.equals(parsedToken.getType(), "BUSINESSMAN")){
            if(businessmanRepository.emailPresent(parsedToken.getEmail())){
                String dbPassword = businessmanRepository.getBusinessmanPassword(parsedToken.getEmail());
                if (passwordEncryptionService.validatePassword(parsedToken.getPassword(), dbPassword)){
                    returnValue = true;
                }
            }
        }

        return returnValue;
    }

    public boolean expertTokenValidator(String token){
        ParsedToken parsedToken = parseToken(token);
        boolean returnValue = false;

        if (Objects.equals(parsedToken.getType(), "EXPERT")){
            if(expertRepository.emailPresent(parsedToken.getEmail())){
                if(expertRepository.isExpertApproved(parsedToken.getEmail())){
                    String dbPassword = expertRepository.getExpertPassword(parsedToken.getEmail());
                    if (passwordEncryptionService.validatePassword(parsedToken.getPassword(), dbPassword)){
                        returnValue = true;
                    }
                }
            }
        }

        return returnValue;
    }

    public boolean adminTokenValidator(String token){
        ParsedToken parsedToken = parseToken(token);
        boolean returnValue = false;

        if (Objects.equals(parsedToken.getType(), "ADMIN")){
            if (adminService.logAdmin(parsedToken.getEmail(), parsedToken.getPassword())){
                returnValue = true;
            }
        }

        return returnValue;
    }

}
