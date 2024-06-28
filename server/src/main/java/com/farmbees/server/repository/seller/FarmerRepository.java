package com.farmbees.server.repository.seller;

import com.farmbees.server.model.buyer.BusinessmanProfile;
import com.farmbees.server.model.seller.FarmerProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Objects;

@Repository
public class FarmerRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FarmerRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean insertNewFarmer(String name, String email, String phoneNo, String panNo, String state, int pinNo, String password, String address){
        String queryToRegisterFarmer = "INSERT INTO FARMER(NAME, EMAIL, PHONE_NO, PAN_NO, STATE, PIN_NO, PASSWORD, ADDRESS) VALUES (?,?,?,?,?,?,?,?)";
        int updated = jdbcTemplate.update(queryToRegisterFarmer, name, email, phoneNo, panNo, state, pinNo, password, address);
        return updated != 0;
    }

    public boolean emailPresent(String email){
        String queryForEmail = "SELECT COUNT(*) FROM Farmer WHERE EMAIL = ?";
        Integer emailCount = jdbcTemplate.queryForObject(queryForEmail, Integer.class, email);
        return !Objects.equals(emailCount, 0);
    }


    public boolean phoneNumberPresent(String phoneNumber){
        String queryForPhoneNumber = "SELECT COUNT(*) FROM Farmer WHERE PHONE_NO = ?";
        Integer phoneNumberCount = jdbcTemplate.queryForObject(queryForPhoneNumber, Integer.class, phoneNumber);
        return !Objects.equals(phoneNumberCount, 0);
    }

    public boolean panNumberPresent(String panNumber){
        String queryForPanNumber = "SELECT COUNT(*) FROM Farmer WHERE PAN_NO = ?";
        Integer panNumberCount = jdbcTemplate.queryForObject(queryForPanNumber, Integer.class, panNumber);
        return !Objects.equals(panNumberCount, 0);
    }

    public String getFarmerPassword(String email){
        String queryForPassword = "SELECT PASSWORD FROM FARMER WHERE EMAIL = ?";
        return jdbcTemplate.queryForObject(queryForPassword, String.class, email);
    }

    public Integer getFarmerIdByEmail(String email){
        String queryForId = "SELECT ID FROM FARMER WHERE EMAIL = ?";
        return jdbcTemplate.queryForObject(queryForId, Integer.class, email);
    }

    public FarmerProfile getFarmerDetailsByEmail(String email) {
        String sql = "SELECT NAME, EMAIL, PHONE_NO, PAN_NO, ADDRESS, STATE, PIN_NO FROM FARMER WHERE EMAIL = ?";
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            FarmerProfile farmerProfile = new FarmerProfile();
            farmerProfile.setFullName(rs.getString("NAME"));
            farmerProfile.setEmail(rs.getString("EMAIL"));
            farmerProfile.setPhoneNumber(rs.getString("PHONE_NO"));
            farmerProfile.setPanNumber(rs.getString("PAN_NO"));
            farmerProfile.setAddress(rs.getString("ADDRESS"));
            farmerProfile.setState(rs.getString("STATE"));
            farmerProfile.setPinNumber(rs.getInt("PIN_NO"));
            return farmerProfile;
        }, email);
    }




}
