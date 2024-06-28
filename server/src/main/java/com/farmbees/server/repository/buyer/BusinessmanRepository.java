package com.farmbees.server.repository.buyer;

import com.farmbees.server.model.buyer.BusinessmanProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;
import java.util.Objects;

@Repository
public class BusinessmanRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BusinessmanRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean insertNewBusinessman(String name, String email, String phoneNo, String panNo, String state, int pinNo, String password, String address){
        String queryToRegisterBusinessman = "INSERT INTO BUSINESSMAN(NAME, EMAIL, PHONE_NO, PAN_NO, STATE, PIN_NO, PASSWORD, ADDRESS) VALUES (?,?,?,?,?,?,?,?)";
        int updated = jdbcTemplate.update(queryToRegisterBusinessman, name, email, phoneNo, panNo, state, pinNo, password, address);
        return updated != 0;
    }

    public boolean emailPresent(String email){
        String queryForEmail = "SELECT COUNT(*) FROM businessman WHERE EMAIL = ?";
        Integer emailCount = jdbcTemplate.queryForObject(queryForEmail, Integer.class, email);
        return !Objects.equals(emailCount, 0);
    }

    public boolean phoneNumberPresent(String phoneNumber){
        String queryForPhoneNumber = "SELECT COUNT(*) FROM BUSINESSMAN WHERE PHONE_NO = ?";
        Integer phoneNumberCount = jdbcTemplate.queryForObject(queryForPhoneNumber, Integer.class, phoneNumber);
        return !Objects.equals(phoneNumberCount, 0);
    }

    public boolean panNumberPresent(String panNumber){
        String queryForPanNumber = "SELECT COUNT(*) FROM BUSINESSMAN WHERE PAN_NO = ?";
        Integer panNumberCount = jdbcTemplate.queryForObject(queryForPanNumber, Integer.class, panNumber);
        return !Objects.equals(panNumberCount, 0);
    }

    public String getBusinessmanPassword(String email){
        String queryForPassword = "SELECT PASSWORD FROM BUSINESSMAN WHERE EMAIL = ?";
        return jdbcTemplate.queryForObject(queryForPassword, String.class, email);
    }



    public Integer getIdByEmail(String email){
        String queryToGetID = "SELECT ID FROM BUSINESSMAN WHERE EMAIL = ?";
        return jdbcTemplate.queryForObject(queryToGetID, Integer.class, email);
    }

    public BusinessmanProfile getBusinessmanDetailsByEmail(String email) {
        String sql = "SELECT NAME, EMAIL, PHONE_NO, PAN_NO, ADDRESS, STATE, PIN_NO FROM BUSINESSMAN WHERE EMAIL = ?";
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            BusinessmanProfile businessmanProfile = new BusinessmanProfile();
            businessmanProfile.setFullName(rs.getString("NAME"));
            businessmanProfile.setEmail(rs.getString("EMAIL"));
            businessmanProfile.setPhoneNumber(rs.getString("PHONE_NO"));
            businessmanProfile.setPanNumber(rs.getString("PAN_NO"));
            businessmanProfile.setAddress(rs.getString("ADDRESS"));
            businessmanProfile.setState(rs.getString("STATE"));
            businessmanProfile.setPinNumber(rs.getInt("PIN_NO"));
            return businessmanProfile;
        }, email);
    }
}
