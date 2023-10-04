package com.Backend.Backend.Service;

import com.Backend.Backend.Entity.UserInfo;
import com.Backend.Backend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    public UserInfo addUserInfo(UserInfo userInfo){
        return userRepo.save(userInfo);
    };
}
