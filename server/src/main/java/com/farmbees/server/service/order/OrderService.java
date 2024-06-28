package com.farmbees.server.service.order;

import com.farmbees.server.model.order.Order;
import com.farmbees.server.model.order.OrderRequest;
import com.farmbees.server.model.order.OrderResponse;
import com.farmbees.server.model.order.SingleOrderResponse;
import com.farmbees.server.repository.buyer.BusinessmanRepository;
import com.farmbees.server.repository.order.OrderRepository;
import com.farmbees.server.repository.product.ProductRepository;
import com.farmbees.server.repository.seller.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final FarmerRepository farmerRepository;
    private final BusinessmanRepository businessmanRepository;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, FarmerRepository farmerRepository, BusinessmanRepository businessmanRepository, JdbcTemplate jdbcTemplate) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.farmerRepository = farmerRepository;
        this.businessmanRepository = businessmanRepository;
        this.jdbcTemplate = jdbcTemplate;
    }

    private Order createOrder(OrderRequest orderRequest, String email){
        Order order = new Order();

        order.setPid(orderRequest.getPid());
        order.setSid(productRepository.getSidByPid(orderRequest.getPid()));
        order.setBid(businessmanRepository.getIdByEmail(email));
        order.setQuantity(orderRequest.getQuantity());

        int currentPrice = productRepository.getPriceByPid(orderRequest.getPid());
        int totalPrice = currentPrice * orderRequest.getQuantity();

        order.setPrice(currentPrice);
        order.setTotalPrice(totalPrice);

        return order;
    }

    private boolean checkSellerAuthenticity(Integer sid, int oid){
        boolean returnValue = false;

        if (orderRepository.orderPresent(oid)){
            Integer orderSid = orderRepository.getSidByOid(oid);

            if (Objects.equals(orderSid, sid)){
                returnValue = true;
            }
        }

        return returnValue;
    }

    private boolean checkBuyerAuthenticity(Integer bid, int oid){
        boolean returnValue = false;

        if (orderRepository.orderPresent(oid)){
            Integer orderBid = orderRepository.getBidByOid(oid);

            if (Objects.equals(orderBid, bid)){
                returnValue = true;
            }
        }

        return returnValue;
    }

    private boolean ordersAvailableForSeller(int sid){
        String queryToGetOrderCount = "SELECT COUNT(*) FROM ORDERS WHERE SID = ?";
        Integer orderCount = jdbcTemplate.queryForObject(queryToGetOrderCount, Integer.class, sid);
        return !Objects.equals(orderCount, 0);
    }

    private boolean ordersAvailableForBuyer(int bid){
        String queryToGetOrderCount = "SELECT COUNT(*) FROM ORDERS WHERE BID = ?";
        Integer orderCount = jdbcTemplate.queryForObject(queryToGetOrderCount, Integer.class, bid);
        return !Objects.equals(orderCount, 0);
    }

    public boolean placeOrder(OrderRequest orderRequest, String email){
        Order order = createOrder(orderRequest, email);
        boolean returnValue = false;
        if(productRepository.decreaseQuantity(order.getPid(), order.getQuantity())){
            if(orderRepository.insertOrder(order)){
                returnValue = true;
            }
            else{
                productRepository.increaseQuantity(order.getPid(), order.getQuantity());
            }
        }

        return returnValue;
    }

    public boolean processOrder(String sellerEmail, int oid){
        boolean returnValue = false;

        Integer sid = farmerRepository.getFarmerIdByEmail(sellerEmail);

        if(checkSellerAuthenticity(sid, oid)){
            String status = "PROCESSING";
            if(orderRepository.updateOrderStatus(oid, status)){
                returnValue = true;
            }
        }

        return returnValue;
    }

    public boolean cancelOrderByBuyer(String buyerEmail, int oid){
        boolean returnValue = false;

        Integer bid = businessmanRepository.getIdByEmail(buyerEmail);

        if(checkBuyerAuthenticity(bid, oid)){
            String status = "CANCELLED";
            if(orderRepository.updateOrderStatus(oid, status)){
                returnValue = true;
            }
        }

        return returnValue;
    }

    public boolean cancelOrderBySeller(String sellerEmail, int oid){
        boolean returnValue = false;

        Integer sid = farmerRepository.getFarmerIdByEmail(sellerEmail);

        if(checkSellerAuthenticity(sid, oid)){
            String status = "CANCELLED";
            if(orderRepository.updateOrderStatus(oid, status)){
                returnValue = true;
            }
        }

        return returnValue;
    }

    public boolean completeOrder(String buyerEmail, int oid){
        boolean returnValue = false;

        Integer bid = businessmanRepository.getIdByEmail(buyerEmail);

        if(checkBuyerAuthenticity(bid, oid)){
            String status = "COMPLETED";
            if(orderRepository.updateOrderStatus(oid, status)){
                returnValue = true;
            }
        }

        return returnValue;
    }


    public List<OrderResponse> getAllOrdersForSeller(int sid){
        if(ordersAvailableForSeller(sid)){
            return orderRepository.getAllOrdersBySid(sid);
        }
        else {
            return null;
        }
    }

    public List<OrderResponse> getAllOrdersForBuyer(int bid){
        if(ordersAvailableForBuyer(bid)){
            return orderRepository.getAllOrdersByBid(bid);
        }
        else {
            return null;
        }
    }

    public SingleOrderResponse getOrderForSeller(Integer sid, int oid){
        if (checkSellerAuthenticity(sid, oid)){
            return orderRepository.getOrderDetailsByOid(oid);
        }
        else {
            return null;
        }
    }

    public SingleOrderResponse getOrderForBuyer(Integer bid, int oid){
        if (checkBuyerAuthenticity(bid, oid)){
            return orderRepository.getOrderDetailsByOid(oid);
        }
        else {
            return null;
        }
    }

}
