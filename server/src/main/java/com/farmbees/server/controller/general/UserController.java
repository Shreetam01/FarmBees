package com.farmbees.server.controller.general;

import com.farmbees.server.model.CatchID;
import com.farmbees.server.model.CatchToken;
import com.farmbees.server.service.general.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/id")
    public CatchID getUserID(@RequestBody CatchToken catchToken){
        CatchID catchID = new CatchID();
        String token = catchToken.getToken();

        if(token != null){
            int id = userService.validateTokenAndGetId(token);
            catchID.setId(id);
        }

        return catchID;
    }
}
