package com.Backend.Backend.Repository;

import com.Backend.Backend.Entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserInfo,Integer> {
}
