package com.farmbees.server.controller.product;

import com.farmbees.server.model.product.*;
import com.farmbees.server.repository.product.ProductRepository;
import com.farmbees.server.service.product.ProductService;
import com.farmbees.server.service.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/product")
public class ProductController {
    private final TokenService tokenService;
    private final ProductService productService;
    private final ProductRepository productRepository;

    @Autowired
    public ProductController(TokenService tokenService, ProductService productService, ProductRepository productRepository) {
        this.tokenService = tokenService;
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @PostMapping("/list")
    public void listProduct(@RequestBody Product product, HttpServletResponse response, HttpServletRequest request) throws Exception{
        String token = request.getHeader("Authorization");
        if (token != null){
           if(tokenService.farmerTokenValidator(token)){
               String farmerEmail = tokenService.getEmailFromToken(token);
               boolean listed = productService.listProduct(product, farmerEmail);

               if(listed){
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

    @PostMapping("/update")
    public void updateProductListing(@RequestBody ProductListingUpdate productListingUpdate, HttpServletResponse response, HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if (token != null){
           if (tokenService.farmerTokenValidator(token)){
               String farmerEmail = tokenService.getEmailFromToken(token);
               if (productService.updateListing(farmerEmail, productListingUpdate.getPid(), productListingUpdate.isListed())){
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

    @PutMapping("/update")
    public void updateProductQuantity(@RequestBody ProductUpdate productUpdate, HttpServletRequest request, HttpServletResponse response){
        String token = request.getHeader("Authorization");
        if (token != null){
            if (tokenService.farmerTokenValidator(token)){
                String farmerEmail = tokenService.getEmailFromToken(token);
                if (productService.updateQuantity(farmerEmail, productUpdate.getPid(), productUpdate.getQuantity())){
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

    @GetMapping("/all")
    public List<ProductResponse> getAllProducts(){
        return productRepository.getAllProducts();
    }

    @GetMapping("/{pid}")
    public SingleProductResponse getSingleProductDetails(@PathVariable int pid){
        return productService.getSingleProductDetails(pid);
    }
}
