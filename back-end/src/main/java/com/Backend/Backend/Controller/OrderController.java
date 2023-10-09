package com.Backend.Backend.Controller;

import com.Backend.Backend.Entity.OrderInfo;
import com.Backend.Backend.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/update-order")
    public int postUserDetails(@RequestBody OrderInfo orderInfo) {
        orderService.addOrderInfo(orderInfo);
        return 1;
    }

    @PostMapping("/get-orders")
    public List<OrderInfo> getDetails(@RequestBody OrderInfo orderInfo) {
        List<OrderInfo> orderList = orderService.getAllOrderInfo();
        System.out.println(orderInfo);
        return orderList.stream().filter(item -> orderInfo.getCustomersName().equals(item.getCustomersName()))
                .collect(Collectors.toList());
    }

    @PostMapping("/get-orders-shippers")
    public List<OrderInfo> getShipperDetails(@RequestBody OrderInfo orderInfo) {
        List<OrderInfo> orderList = orderService.getAllOrderInfo();
        return orderList.stream().filter(item -> orderInfo.getShipperName().equals(item.getShipperName()) || item.getShipperName().equals(""))
                .collect(Collectors.toList());
    }


    @PostMapping("/update-orders")
    public OrderInfo updateOrdersDetails(@RequestBody OrderInfo orderInfo) {
        return orderService.updateOrderInfo(orderInfo);
    }
}
