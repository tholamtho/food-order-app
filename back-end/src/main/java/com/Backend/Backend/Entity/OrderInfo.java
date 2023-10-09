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
    private String CustomersName;

    @Column(name="shipper_name")
    private String ShipperName;

    @Column(name="order_id")
    private String OrderID;

    @Column(name="order_rating")
    private int OrderRating;

    @Column(name="order_comment")
    private String OrderComment;
    @Column(name="order_detail")
    private String OrderDetail;
}
