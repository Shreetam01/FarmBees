package com.farmbees.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.jsonwebtoken.security.Keys;
import java.security.Key;

@Configuration
public class JwtConfig {

    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public Key secretKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public long getExpirationMs() {
        return 60*60*24*7*1000; // 7 Days in ms
    }
}

