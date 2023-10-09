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
}
