package com.farmbees.server.repository.expert;

import com.farmbees.server.model.expert.ExpertProfile;
import com.farmbees.server.model.expert.ExpertResponse;
import com.farmbees.server.model.seller.FarmerProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public class ExpertRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ExpertRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean insertNewExpert(String name, String email, String qualification, String password){
        String queryToRegisterExpert = "INSERT INTO Expert(NAME, EMAIL, QUALIFICATION, PASSWORD, APPROVED, REVOKED) VALUES (?,?,?,?, false, false)";
        int updated = jdbcTemplate.update(queryToRegisterExpert, name, email, qualification, password);
        return updated != 0;
    }

    public boolean emailPresent(String email){
        String queryForEmail = "SELECT COUNT(*) FROM EXPERT WHERE EMAIL = ?";
        Integer emailCount = jdbcTemplate.queryForObject(queryForEmail, Integer.class, email);
        return !Objects.equals(emailCount, 0);
    }

    public boolean expertPresent(int id){
        String queryForId = "SELECT COUNT(*) FROM EXPERT WHERE ID = ?";
        Integer count = jdbcTemplate.queryForObject(queryForId, Integer.class, id);
        return !Objects.equals(count, 0);
    }

    public boolean isExpertApproved(String email){
        String queryToGetStatus = "SELECT APPROVED FROM EXPERT WHERE EMAIL = ?";
        return Boolean.TRUE.equals(jdbcTemplate.queryForObject(queryToGetStatus, Boolean.class, email));
    }

    public boolean updateApproval(int id, boolean approval){
        String queryToUpdate = "UPDATE EXPERT SET APPROVED = ? WHERE ID = ?";
        int update = jdbcTemplate.update(queryToUpdate, approval, id);
        return update != 0;
    }

    public boolean updateRevocation(int id, boolean revoked, boolean approved){
        String queryToUpdate = "UPDATE EXPERT SET REVOKED = ?, APPROVED = ? WHERE ID = ?";
        int update = jdbcTemplate.update(queryToUpdate, revoked, approved, id);
        return update != 0;
    }

    public String getExpertPassword(String email){
        String queryForPassword = "SELECT PASSWORD FROM EXPERT WHERE EMAIL = ?";
        return jdbcTemplate.queryForObject(queryForPassword, String.class, email);
    }

    public int getExpertIdByEmail(String email){
        String queryToGetId = "SELECT ID FROM EXPERT WHERE EMAIL = ?";
        return jdbcTemplate.queryForObject(queryToGetId, Integer.class, email).intValue();
    }

    public ExpertProfile getExpertDetailsByEmail(String email){
        String queryToGetDetails = "SELECT NAME, EMAIL, QUALIFICATION FROM EXPERT WHERE EMAIL = ?";
        return jdbcTemplate.queryForObject(queryToGetDetails, (rs, rowNum) -> {
            ExpertProfile expertProfile = new ExpertProfile();

            expertProfile.setFullName(rs.getString("NAME"));
            expertProfile.setEmail(rs.getString("EMAIL"));
            expertProfile.setQualification(rs.getString("QUALIFICATION"));

            return expertProfile;

        }, email);
    }

    public List<ExpertResponse> getExpertsBasedOnApproval(boolean approved){
        String queryToGetDetails = "SELECT ID, NAME, EMAIL, QUALIFICATION, APPROVED, REVOKED FROM EXPERT WHERE APPROVED = ? AND REVOKED = false";
        return jdbcTemplate.query(queryToGetDetails, (rs, rowNum) -> {
            ExpertResponse expert = new ExpertResponse();

            expert.setId(rs.getInt("ID"));
            expert.setFullName(rs.getString("NAME"));
            expert.setEmail(rs.getString("EMAIL"));
            expert.setQualification(rs.getString("QUALIFICATION"));
            expert.setApproved(rs.getBoolean("APPROVED"));
            expert.setRevoked(rs.getBoolean("REVOKED"));
            return expert;

        }, approved);
    }

    public List<ExpertResponse> getExpertsBasedOnRevocation(boolean revoked){
        String queryToGetDetails = "SELECT ID, NAME, EMAIL, QUALIFICATION, APPROVED, REVOKED FROM EXPERT WHERE REVOKED = ?";
        return jdbcTemplate.query(queryToGetDetails, (rs, rowNum) -> {
            ExpertResponse expert = new ExpertResponse();

            expert.setId(rs.getInt("ID"));
            expert.setFullName(rs.getString("NAME"));
            expert.setEmail(rs.getString("EMAIL"));
            expert.setQualification(rs.getString("QUALIFICATION"));
            expert.setApproved(rs.getBoolean("APPROVED"));
            expert.setRevoked(rs.getBoolean("REVOKED"));

            return expert;

        }, revoked);
    }

}
