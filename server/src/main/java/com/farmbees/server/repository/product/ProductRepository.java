package com.farmbees.server.repository.product;

import com.farmbees.server.model.product.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Repository
public class ProductRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean insertProduct(Product product, int sid, String state){
        String name = product.getName();
        String category = product.getCategory();
        int quantity = product.getQuantity();
        int price = product.getPrice();
        String imageData = product.getImageData();

        String queryToInsertProduct = "INSERT INTO PRODUCT(SID, NAME, CATEGORY, QUANTITY, PRICE, IMAGE_DATA, LISTING, STATE) VALUES(?,?,?,?,?,?,?,?)";

        int inserted = jdbcTemplate.update(queryToInsertProduct, sid, name, category, quantity, price, imageData, true, state);

        return inserted != 0;

    }

    public boolean isSellerSelling(int sid){
        String query = "SELECT COUNT(*) FROM PRODUCT WHERE SID = ?";
        Integer sidCount = jdbcTemplate.queryForObject(query, Integer.class, sid);
        return !Objects.equals(sidCount, 0);
    }

    public boolean productPresent(int pid){
        String queryForPid = "SELECT COUNT(*) FROM PRODUCT WHERE PID = ?";
        Integer pidCount = jdbcTemplate.queryForObject(queryForPid, Integer.class, pid);
        return !Objects.equals(pidCount, 0);
    }

    public boolean changeListingStatus(int pid, boolean status){
        String queryToChangeListing = "UPDATE PRODUCT SET LISTING = ? WHERE PID = ?";
        int changed = jdbcTemplate.update(queryToChangeListing, status, pid);
        return changed != 0;
    }

    public boolean changeQuantity(int pid, int quantity){
        String queryToUpdateQuantity = "UPDATE PRODUCT SET QUANTITY = ? WHERE PID = ?";
        int changed = jdbcTemplate.update(queryToUpdateQuantity, quantity, pid);
        return changed != 0;
    }

    public int getSidByPid(int pid){
        String queryToGetSid = "SELECT SID FROM PRODUCT WHERE PID = ?";
        return jdbcTemplate.queryForObject(queryToGetSid, Integer.class, pid).intValue();
    }

    public int getPriceByPid(int pid){
        String queryToGetPrice = "SELECT PRICE FROM PRODUCT WHERE PID = ?";
        return jdbcTemplate.queryForObject(queryToGetPrice, Integer.class, pid).intValue();
    }

    public boolean decreaseQuantity(int pid, int quantity){
        String queryToDecreaseQuantity = "UPDATE PRODUCT SET QUANTITY = QUANTITY - ? WHERE PID = ?";
        int decreased = jdbcTemplate.update(queryToDecreaseQuantity, quantity, pid);
        return decreased != 0;
    }

    public boolean increaseQuantity(int pid, int quantity){
        String queryToIncreaseQuantity = "UPDATE PRODUCT SET QUANTITY = QUANTITY + ? WHERE PID = ?";
        int decreased = jdbcTemplate.update(queryToIncreaseQuantity, quantity, pid);
        return decreased != 0;
    }

    public List<ProductResponse> getAllProducts() {
        String queryToGetAllProducts = "SELECT PID, NAME, CATEGORY, QUANTITY, PRICE, IMAGE_DATA, STATE FROM PRODUCT WHERE LISTING = TRUE";
        return jdbcTemplate.query(queryToGetAllProducts,(rs, rowNum) -> {
            ProductResponse product = new ProductResponse();
            product.setPid(rs.getInt("PID"));
            product.setName(rs.getString("NAME"));
            product.setCategory(rs.getString("CATEGORY"));
            product.setQuantity(rs.getInt("QUANTITY"));
            product.setPrice(rs.getInt("PRICE"));
            product.setImageData(rs.getString("IMAGE_DATA"));
            product.setState(rs.getString("STATE"));
            return product;
        });
    }

    public List<ProductResponse> getListedProductsBySid(int sid) {
        String queryToGetAllProducts = "SELECT PID, NAME, CATEGORY, QUANTITY, PRICE, IMAGE_DATA, STATE FROM PRODUCT WHERE SID = ? AND LISTING = TRUE";
        return jdbcTemplate.query(queryToGetAllProducts,(rs, rowNum) -> {
            ProductResponse product = new ProductResponse();
            product.setPid(rs.getInt("PID"));
            product.setName(rs.getString("NAME"));
            product.setCategory(rs.getString("CATEGORY"));
            product.setQuantity(rs.getInt("QUANTITY"));
            product.setPrice(rs.getInt("PRICE"));
            product.setImageData(rs.getString("IMAGE_DATA"));
            product.setState(rs.getString("STATE"));
            return product;
        }, sid);
    }

    public List<ProductResponse> getUnlistedProductsBySid(int sid) {
        String queryToGetAllProducts = "SELECT PID, NAME, CATEGORY, QUANTITY, PRICE, IMAGE_DATA, STATE FROM PRODUCT WHERE SID = ? AND LISTING = FALSE";
        return jdbcTemplate.query(queryToGetAllProducts,(rs, rowNum) -> {
            ProductResponse product = new ProductResponse();
            product.setPid(rs.getInt("PID"));
            product.setName(rs.getString("NAME"));
            product.setCategory(rs.getString("CATEGORY"));
            product.setQuantity(rs.getInt("QUANTITY"));
            product.setPrice(rs.getInt("PRICE"));
            product.setImageData(rs.getString("IMAGE_DATA"));
            product.setState(rs.getString("STATE"));
            return product;
        }, sid);
    }

    public SingleProductResponse getProductWithSeller(int pid) {
        String sql = "SELECT P.PID, P.NAME AS P_NAME, P.CATEGORY, P.QUANTITY, P.PRICE, P.IMAGE_DATA, "
                + "F.ID, F.NAME AS F_NAME, F.ADDRESS, F.STATE, F.PIN_NO "
                + "FROM PRODUCT P "
                + "JOIN FARMER F ON P.SID = F.ID "
                + "WHERE P.PID = ?";

        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            SprProduct product = new SprProduct();
            product.setPid(rs.getInt("PID"));
            product.setName(rs.getString("P_NAME"));
            product.setCategory(rs.getString("CATEGORY"));
            product.setQuantity(rs.getInt("QUANTITY"));
            product.setPrice(rs.getInt("PRICE"));
            product.setImageData(rs.getString("IMAGE_DATA"));

            SprSeller seller = new SprSeller();
            seller.setSid(rs.getInt("ID"));
            seller.setName(rs.getString("F_NAME"));
            seller.setAddress(rs.getString("ADDRESS"));
            seller.setState(rs.getString("STATE"));
            seller.setPinNumber(rs.getString("PIN_NO"));

            return new SingleProductResponse(product, seller);
        }, pid);
    }


}
