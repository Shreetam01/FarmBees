package com.farmbees.server.service.product;

import com.farmbees.server.model.product.Product;
import com.farmbees.server.model.product.SingleProductResponse;
import com.farmbees.server.repository.product.ProductRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final JdbcTemplate jdbcTemplate;

    public ProductService(ProductRepository productRepository, JdbcTemplate jdbcTemplate) {
        this.productRepository = productRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    private boolean checkSellerAuthenticity(String email, int pid){
        boolean returnValue = false;

        String queryForID = "SELECT ID FROM FARMER WHERE EMAIL = ?";
        Integer sid = jdbcTemplate.queryForObject(queryForID, Integer.class, email);

        if (productRepository.productPresent(pid)){
            String queryForSid = "SELECT SID FROM PRODUCT WHERE PID = ?";
            Integer productSid = jdbcTemplate.queryForObject(queryForSid, Integer.class, pid);

            if (Objects.equals(productSid, sid)){
                returnValue = true;
            }
        }

        return returnValue;
    }

    public boolean listProduct(Product product, String email){
        String queryForID = "SELECT ID FROM FARMER WHERE EMAIL = ?";
        String queryForState = "SELECT STATE FROM FARMER WHERE EMAIL = ?";

        int sid = jdbcTemplate.queryForObject(queryForID, Integer.class, email).intValue();
        String state = jdbcTemplate.queryForObject(queryForState, String.class, email);

        return productRepository.insertProduct(product, sid, state);
    }

    public boolean updateListing(String email, int pid, boolean status){
        boolean returnValue = false;

        if(checkSellerAuthenticity(email, pid)) {
            if (productRepository.changeListingStatus(pid, status)) {
                returnValue = true;
            }
        }

        return returnValue;
    }

    public boolean updateQuantity(String email, int pid, int quantity){
        boolean returnValue = false;
        if(checkSellerAuthenticity(email, pid)) {
            if (productRepository.changeQuantity(pid, quantity)) {
                returnValue = true;
            }
        }

        return returnValue;
    }

    public SingleProductResponse getSingleProductDetails(int pid){
        if(productRepository.productPresent(pid)){
            return productRepository.getProductWithSeller(pid);
        }
        else return null;
    }
}
