package com.farmbees.server.repository.general;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    public boolean userPhonePresent(String phoneNumber){
        return true;
    }

    public boolean userEmailPresent(String email){
        return true;
    }

    public boolean userPanNoPresent(String panNumber){
        return true;
    }


}
