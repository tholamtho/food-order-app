package com.Backend.Backend.Repository;

import com.Backend.Backend.Entity.OrderInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<OrderInfo,Integer> {
}
