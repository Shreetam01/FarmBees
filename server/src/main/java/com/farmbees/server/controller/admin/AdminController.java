package com.farmbees.server.controller.admin;

import com.farmbees.server.model.CatchID;
import com.farmbees.server.model.LoginRequestBody;
import com.farmbees.server.model.admin.AdminLoginResponse;
import com.farmbees.server.model.expert.ExpertResponse;
import com.farmbees.server.service.admin.AdminService;
import com.farmbees.server.service.expert.ExpertService;
import com.farmbees.server.service.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    private final AdminService adminService;
    private final TokenService tokenService;
    private final ExpertService expertService;

    public AdminController(AdminService adminService, TokenService tokenService, ExpertService expertService) {
        this.adminService = adminService;
        this.tokenService = tokenService;
        this.expertService = expertService;
    }

    @PostMapping("/login")
    public AdminLoginResponse handleAdminLogin(@RequestBody LoginRequestBody loginRequestBody){
        String email = loginRequestBody.getEmail();
        String password = loginRequestBody.getPassword();
        boolean login = adminService.logAdmin(email, password);

        AdminLoginResponse adminLoginResponse = new AdminLoginResponse();
        adminLoginResponse.setLogin(login);

        if(login){
            String userType = "ADMIN";
            String authToken = tokenService.createToken(email, password, userType);
            adminLoginResponse.setToken(authToken);
            adminLoginResponse.setType(userType);
        }

        return adminLoginResponse;
    }

    @GetMapping("/get-pending-exp")
    public List<ExpertResponse> getPendingExperts(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if (token != null){
            if (tokenService.adminTokenValidator(token)){
                return expertService.getPendingExperts();
            }
            else return null;
        }
        else return null;
    }

    @GetMapping("/get-approved-exp")
    public List<ExpertResponse> getApprovedExperts(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if (token != null){
            if (tokenService.adminTokenValidator(token)){
                return expertService.getApprovedExperts();
            }
            else return null;
        }
        else return null;
    }

    @GetMapping("/get-revoked-exp")
    public List<ExpertResponse> getRevokedExperts(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if (token != null){
            if (tokenService.adminTokenValidator(token)){
                return expertService.getRevokedExperts();
            }
            else return null;
        }
        else return null;
    }

    @PostMapping("/approve-exp")
    public void approveExpert(@RequestBody CatchID catchID, HttpServletRequest request, HttpServletResponse response){
        String token = request.getHeader("Authorization");
        if (token != null){
            if (tokenService.adminTokenValidator(token)){
                if(expertService.approveExpert(catchID.getId())){
                    response.setStatus(200);
                }
                else{
                    response.setStatus(500);
                }
            }
            else{
                response.setStatus(401);
            }
        }
        else{
            response.setStatus(401);
        }
    }

    @PostMapping("/revoke-exp")
    public void revokeExpert(@RequestBody CatchID catchID, HttpServletRequest request, HttpServletResponse response){
        String token = request.getHeader("Authorization");
        if (token != null){
            if (tokenService.adminTokenValidator(token)){
                if(expertService.revokeExpert(catchID.getId())){
                    response.setStatus(200);
                }
                else{
                    response.setStatus(500);
                }
            }
            else{
                response.setStatus(401);
            }
        }
        else{
            response.setStatus(401);
        }
    }
}
