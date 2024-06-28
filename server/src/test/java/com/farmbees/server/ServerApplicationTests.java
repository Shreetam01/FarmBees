package com.farmbees.server;
import com.farmbees.server.model.buyer.BusinessmanProfile;
import com.farmbees.server.model.order.OrderRequest;
import com.farmbees.server.model.seller.FarmerProfile;
import com.farmbees.server.repository.buyer.BusinessmanRepository;
import com.farmbees.server.repository.product.ProductRepository;
import com.farmbees.server.repository.seller.FarmerRepository;
import com.farmbees.server.service.order.OrderService;
import com.farmbees.server.service.security.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.List;

@SpringBootTest
class ServerApplicationTests {

    @Autowired
    TokenService tokenService;

    @Autowired
    BusinessmanRepository businessmanRepository;

    @Autowired
    FarmerRepository farmerRepository;

    @Autowired
    OrderService orderService;


    @Test
    public void tokenCreate(){
        String email = "rameshmohan36@gmail.com";
        String password = "Ramesh@36";
        String type = "FARMER";

        String token = tokenService.createToken(email, password, type);
        System.out.println(token);
    }


    @Test
    public void validateToken() {

        final String SECRET_KEY = "in0farmBees0comingTo0farmBees0comin0farmBees0comingTo0farmBees0comin0farmBees0comingTo0farmBees0com";

        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJGQVJNRVI6cmFtZXNobW9oYW4zNkBnbWFpbC5jb206UmFtZXNoQDM2In0.LY0_RuhSqEZRtMySUwc1c8qm7q6JuMNcXnqtlG_YCjXcCapCU_nLpbzAG6JjEIjRt4Fn3HmZ1aU-a9lHVFlaCQ";
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY.getBytes())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();


        } catch (ExpiredJwtException e) {
            // Token expired
            System.err.println("JWT token expired: " + e.getMessage());
        } catch (Exception e) {
            // Other exceptions
            System.err.println("Error validating JWT token: " + e.getMessage());
        }
    }

    @Test
    public void newTest(){
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJGQVJNRVI6dGFuYXlAZ21haWwuY29tOlRhbmF5QDEyMyJ9.Fwmv9Yu2mMTEpRpAK0d0T-evZi6o-s_tWbt0FRgcsrTmzni_8CLn5sAloBU8qB-aXv3enM5uX0mHXAsE1nm3XQ";
        String type = tokenService.getTypeFromToken(token);
        System.out.println(type);
    }
}
