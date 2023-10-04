package com.Backend.Backend.Controller;

import com.Backend.Backend.Entity.UserInfo;
import com.Backend.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

//    @PostMapping("/login")
//    public String loginInfo(@RequestBody LoginInfo loginInfo){
//        userService.addUserInfo(userInfo);
//        return "Added Account";
//    }
    @PostMapping("/register-account")
    public String postUserDetails(@RequestBody UserInfo userInfo){
        userService.addUserInfo(userInfo);
        return "Added Account";
    }
}
