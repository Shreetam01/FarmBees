package com.farmbees.server.repository.order;

import com.farmbees.server.model.order.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public class OrderRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public OrderRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public boolean insertOrder(Order order){
        int pid = order.getPid();
        int sid = order.getSid();
        int bid = order.getBid();
        int quantity = order.getQuantity();
        int price = order.getPrice();
        int totalPrice = order.getTotalPrice();
        String status = "PENDING";

        String queryToInsertOrder = "INSERT INTO ORDERS(PID, SID, BID, QUANTITY, PRICE, TOTAL_PRICE, STATUS) VALUES(?,?,?,?,?,?,?)";

        int inserted = jdbcTemplate.update(queryToInsertOrder, pid, sid, bid, quantity, price, totalPrice, status);
        return inserted != 0;
    }

    public boolean orderPresent(int oid){
        String queryForPid = "SELECT COUNT(*) FROM ORDERS WHERE OID = ?";
        Integer pidCount = jdbcTemplate.queryForObject(queryForPid, Integer.class, oid);
        return !Objects.equals(pidCount, 0);
    }

    public Integer getSidByOid(int oid){
        String queryForSid = "SELECT SID FROM ORDERS WHERE OID = ?";
        return jdbcTemplate.queryForObject(queryForSid, Integer.class, oid);
    }

    public Integer getBidByOid(int oid){
        String queryForSid = "SELECT BID FROM ORDERS WHERE OID = ?";
        return jdbcTemplate.queryForObject(queryForSid, Integer.class, oid);
    }

    public boolean updateOrderStatus(int oid, String status){
        String queryToUpdateCancellation = "UPDATE ORDERS SET STATUS = ? WHERE OID = ?";
        int updated = jdbcTemplate.update(queryToUpdateCancellation, status, oid);
        return updated != 0;
    }


    public List<OrderResponse> getAllOrdersBySid(int sid){
        String sql = "SELECT O.OID, O.QUANTITY, O.TOTAL_PRICE, O.STATUS, O.DATE, "
                + "P.NAME, P.IMAGE_DATA "
                + "FROM ORDERS O "
                + "JOIN PRODUCT P ON O.PID = P.PID "
                + "WHERE O.SID = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            OrderResponse orderResponse = new OrderResponse();

            orderResponse.setOid(rs.getInt("OID"));
            orderResponse.setQuantity(rs.getInt("QUANTITY"));
            orderResponse.setTotalPrice(rs.getInt("TOTAL_PRICE"));
            orderResponse.setStatus(rs.getString("STATUS"));
            orderResponse.setDate(rs.getString("DATE"));

            orderResponse.setName(rs.getString("NAME"));
            orderResponse.setImageData(rs.getString("IMAGE_DATA"));
            return orderResponse;

        }, sid);
    }

    public List<OrderResponse> getAllOrdersByBid(int bid){
        String sql = "SELECT O.OID, O.QUANTITY, O.TOTAL_PRICE, O.STATUS, O.DATE, "
                + "P.NAME, P.IMAGE_DATA "
                + "FROM ORDERS O "
                + "JOIN PRODUCT P ON O.PID = P.PID "
                + "WHERE O.BID = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            OrderResponse orderResponse = new OrderResponse();

            orderResponse.setOid(rs.getInt("OID"));
            orderResponse.setQuantity(rs.getInt("QUANTITY"));
            orderResponse.setTotalPrice(rs.getInt("TOTAL_PRICE"));
            orderResponse.setStatus(rs.getString("STATUS"));
            orderResponse.setDate(rs.getString("DATE"));

            orderResponse.setName(rs.getString("NAME"));
            orderResponse.setImageData(rs.getString("IMAGE_DATA"));
            return orderResponse;

        }, bid);
    }

    public SingleOrderResponse getOrderDetailsByOid(int oid){
        String sql = "SELECT O.OID, O.QUANTITY, O.PRICE, O.TOTAL_PRICE, O.STATUS, O.DATE, "
                + "P.PID, P.NAME AS P_NAME, P.IMAGE_DATA, "
                + "S.ID AS SID, S.NAME AS S_NAME, S.EMAIL AS S_EMAIL, S.PHONE_NO AS S_PHONE, S.ADDRESS AS S_ADDR, S.STATE AS S_STATE, S.PIN_NO AS S_PIN, "
                + "B.ID AS BID, B.NAME AS B_NAME, B.EMAIL AS B_EMAIL, B.PHONE_NO AS B_PHONE, B.ADDRESS AS B_ADDR, B.STATE AS B_STATE, B.PIN_NO AS B_PIN "
                + "FROM ORDERS O "
                + "JOIN PRODUCT P ON O.PID = P.PID "
                + "JOIN FARMER S ON O.SID = S.ID "
                + "JOIN BUSINESSMAN B ON O.BID = B.ID "
                + "WHERE O.OID = ?";
        return (jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            SorOrder order = new SorOrder();
            order.setOid(rs.getInt("OID"));
            order.setQuantity(rs.getInt("QUANTITY"));
            order.setPrice(rs.getInt("PRICE"));
            order.setTotalPrice(rs.getInt("TOTAL_PRICE"));
            order.setStatus(rs.getString("STATUS"));
            order.setDate(rs.getString("DATE"));

            SorProduct product = new SorProduct();
            product.setPid(rs.getInt("PID"));
            product.setName(rs.getString("P_NAME"));
            product.setImageData(rs.getString("IMAGE_DATA"));

            SorSeller seller = new SorSeller();
            seller.setSid(rs.getInt("SID"));
            seller.setName(rs.getString("S_NAME"));
            seller.setEmail(rs.getString("S_EMAIL"));
            seller.setPhoneNumber(rs.getString("S_PHONE"));
            seller.setAddress(rs.getString("S_ADDR"));
            seller.setState(rs.getString("S_STATE"));
            seller.setPinNumber(rs.getString("S_PIN"));

            SorBuyer buyer = new SorBuyer();
            buyer.setBid(rs.getInt("BID"));
            buyer.setName(rs.getString("B_NAME"));
            buyer.setEmail(rs.getString("B_EMAIL"));
            buyer.setPhoneNumber(rs.getString("B_PHONE"));
            buyer.setAddress(rs.getString("B_ADDR"));
            buyer.setState(rs.getString("B_STATE"));
            buyer.setPinNumber(rs.getString("B_PIN"));

            return new SingleOrderResponse(order, product, seller, buyer);
        }, oid));
    }
}
