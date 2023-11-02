package com.Backend.Backend.Service;

import com.Backend.Backend.Entity.OrderInfo;
import com.Backend.Backend.Entity.UserInfo;
import com.Backend.Backend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;
    public UserInfo addUserInfo(UserInfo userInfo){
        return userRepo.save(userInfo);
    };
    public List<UserInfo> getAllUserInfo(){
        return userRepo.findAll();
    }

    public UserInfo updateUserInfo(UserInfo userInfo) {
        UserInfo targetUser = userRepo.findById(userInfo.getId()).orElse(null);
        if (targetUser != null) {
            targetUser.setPassword(userInfo.getPassword());
            targetUser.setEmail(userInfo.getEmail());
            targetUser.setPhoneNo(userInfo.getPhoneNo());
            targetUser.setUserAddress(userInfo.getUserAddress());
            targetUser.setBanned(userInfo.isBanned());
            userRepo.save(targetUser);
            return targetUser;
        }
        return null;
    }
}
