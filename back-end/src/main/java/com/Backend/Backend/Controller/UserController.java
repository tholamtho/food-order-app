package com.Backend.Backend.Controller;

import com.Backend.Backend.Entity.UserInfo;
import com.Backend.Backend.Service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register-account")
    public int postUserDetails(@RequestBody UserInfo userInfo){
        List<UserInfo> userList = userService.getAllUserInfo();
        boolean isExistedUser = userList.stream().anyMatch(o -> userInfo.getUsername().equals(o.getUsername()) || userInfo.getEmail().equals(o.getEmail()));
        if (isExistedUser) {
            return 0;
        }
        userService.addUserInfo(userInfo);
        return 1;
    }


    private boolean checkHaveUser(UserInfo userInfo){
        List<UserInfo> userList = userService.getAllUserInfo();
        return userList.stream().anyMatch(o -> userInfo.getUsername().equals(o.getUsername())&& userInfo.getPassword().equals(o.getPassword()));
    }

    @PostMapping("/login")
    public UserInfo loginUserInfo (@RequestBody UserInfo userInfo){
        UserInfo newResponsePayload = userInfo;
        if (checkHaveUser(userInfo)){
            newResponsePayload.setPassword("************");
            return newResponsePayload;
        }
        newResponsePayload.setUsername("");
        newResponsePayload.setPassword("");
        newResponsePayload.setPermission(-1);
        newResponsePayload.setEmail("");
        return newResponsePayload;
    }
}
