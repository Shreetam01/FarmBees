package com.farmbees.server.controller.order;


import com.farmbees.server.model.order.OrderCompCancelReq;
import com.farmbees.server.model.order.OrderRequest;
import com.farmbees.server.model.order.OrderResponse;
import com.farmbees.server.model.order.SingleOrderResponse;
import com.farmbees.server.repository.buyer.BusinessmanRepository;
import com.farmbees.server.repository.seller.FarmerRepository;
import com.farmbees.server.service.order.OrderService;
import com.farmbees.server.service.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/order")
public class OrderController {
    private final TokenService tokenService;
    private final OrderService orderService;

    private final FarmerRepository farmerRepository;
    private final BusinessmanRepository businessmanRepository;

    @Autowired
    public OrderController(TokenService tokenService, OrderService orderService, FarmerRepository farmerRepository, BusinessmanRepository businessmanRepository) {
        this.tokenService = tokenService;
        this.orderService = orderService;
        this.farmerRepository = farmerRepository;
        this.businessmanRepository = businessmanRepository;
    }

    @PostMapping("/place")
    public void placeOrder(@RequestBody OrderRequest orderRequest, HttpServletRequest request, HttpServletResponse response){
        String token = request.getHeader("Authorization");
        if (token != null){
            if(tokenService.businessmanTokenValidator(token)){
                String businessmanEmail = tokenService.getEmailFromToken(token);
                boolean placed = orderService.placeOrder(orderRequest, businessmanEmail);

                if(placed){
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

    @PostMapping("/process")
    public void processOrder(@RequestBody OrderCompCancelReq orderCompCancelReq, HttpServletRequest request, HttpServletResponse response){
        String token = request.getHeader("Authorization");
        if (token != null) {
            if(tokenService.farmerTokenValidator(token)){
                String farmerEmail = tokenService.getEmailFromToken(token);
                boolean processed = orderService.processOrder(farmerEmail, orderCompCancelReq.getOid());

                if(processed){
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

    @PostMapping("/cancel")
    public void cancelOrder(@RequestBody OrderCompCancelReq orderCompCancelReq, HttpServletRequest request, HttpServletResponse response){
        String token = request.getHeader("Authorization");
        if (token != null){
            if(tokenService.businessmanTokenValidator(token)){
                String businessmanEmail = tokenService.getEmailFromToken(token);
                boolean cancelled = orderService.cancelOrderByBuyer(businessmanEmail, orderCompCancelReq.getOid());

                if(cancelled){
                    response.setStatus(200);
                }
                else{
                    response.setStatus(500);
                }
            }
            else if(tokenService.farmerTokenValidator(token)){
                String farmerEmail = tokenService.getEmailFromToken(token);
                boolean cancelled = orderService.cancelOrderBySeller(farmerEmail, orderCompCancelReq.getOid());

                if(cancelled){
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

    @PostMapping("/complete")
    public void completeOrder(@RequestBody OrderCompCancelReq orderCompCancelReq, HttpServletRequest request, HttpServletResponse response){
        String token = request.getHeader("Authorization");
        if (token != null){
            if(tokenService.businessmanTokenValidator(token)){
                String businessmanEmail = tokenService.getEmailFromToken(token);
                boolean completed = orderService.completeOrder(businessmanEmail, orderCompCancelReq.getOid());

                if(completed){
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

    @GetMapping("/owner-orders")
    public List<OrderResponse> getAllOrdersOfOrderOwners(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if(token != null){
            String userType = tokenService.getTypeFromToken(token);
            if (Objects.equals(userType, "FARMER")){
                if(tokenService.farmerTokenValidator(token)){
                    int sid = farmerRepository.getFarmerIdByEmail(tokenService.getEmailFromToken(token));
                    return orderService.getAllOrdersForSeller(sid);
                }
                else {
                    return null;
                }
            }
            else if (Objects.equals(userType, "BUSINESSMAN")) {
                if(tokenService.businessmanTokenValidator(token)){
                    int bid = businessmanRepository.getIdByEmail(tokenService.getEmailFromToken(token));
                    return orderService.getAllOrdersForBuyer(bid);
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }

    @GetMapping("/{oid}")
    public SingleOrderResponse getDetailsOfOrder(@PathVariable int oid, HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if(token != null){
            String userType = tokenService.getTypeFromToken(token);
            if (Objects.equals(userType, "FARMER")){
                if(tokenService.farmerTokenValidator(token)){
                    Integer sid = farmerRepository.getFarmerIdByEmail(tokenService.getEmailFromToken(token));
                    return orderService.getOrderForSeller(sid, oid);
                }
                else {
                    return null;
                }
            }
            else if (Objects.equals(userType, "BUSINESSMAN")) {
                if(tokenService.businessmanTokenValidator(token)){
                    int bid = businessmanRepository.getIdByEmail(tokenService.getEmailFromToken(token));
                    return orderService.getOrderForBuyer(bid, oid);
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }

}
