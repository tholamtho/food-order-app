package com.Backend.Backend.Service;

import com.Backend.Backend.Entity.OrderInfo;
import com.Backend.Backend.Repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepo orderRepo;

    public OrderInfo addOrderInfo(OrderInfo orderInfo) {
        return orderRepo.save(orderInfo);
    };

    public List<OrderInfo> getAllOrderInfo() {
        return orderRepo.findAll();
    }

    public OrderInfo updateOrderInfo(OrderInfo orderInfo) {
        OrderInfo updatedData = orderRepo.findById(orderInfo.getId()).orElse(null);
        if (updatedData != null) {
            System.out.println(orderInfo.isGraded());
            updatedData.setCustomersName(orderInfo.getCustomersName());
            updatedData.setShipperName(orderInfo.getShipperName());
            updatedData.setOrderID(orderInfo.getOrderID());
            updatedData.setOrderStatus(orderInfo.getOrderStatus());
            updatedData.setOderRating(orderInfo.getOderRating());
            updatedData.setOrderComment(orderInfo.getOrderComment());
            updatedData.setDeliverTime(orderInfo.getDeliverTime());
            updatedData.setOrderTime(orderInfo.getOrderTime());
            updatedData.setGraded(orderInfo.isGraded());
            updatedData.setTotalCost(orderInfo.getTotalCost());
            orderRepo.save(updatedData);
            return updatedData;
        }
        return null;
    };
}
