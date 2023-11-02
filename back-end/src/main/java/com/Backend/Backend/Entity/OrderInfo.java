package com.Backend.Backend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="order_db")
@NoArgsConstructor
public class OrderInfo {
    @Id
    @Column(name="ID")
    @GeneratedValue
    private int id;

    @Column(name="customer_name")
    private String customersName;

    @Column(name="customer_address")
    private String customersAddress;

    @Column(name="customer_phone")
    private String customersPhoneNo;

    @Column(name="shipper_name")
    private String shipperName;

    @Column(name="order_id")
    private String orderID;

    @Column(name="order_status")
    private String orderStatus;

    @Column(name="order_rating")
    private int oderRating;

    @Column(name="order_comment")
    private String orderComment;

    @Column(name="order_time")
    private String orderTime;

    @Column(name="deliver_time")
    private String deliverTime;
}
