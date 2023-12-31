package com.Backend.Backend.Controller;

import com.Backend.Backend.Entity.UserInfo;
import com.Backend.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register-account")
    public int postUserDetails(@RequestBody UserInfo userInfo) {
        addAdminAccount();
        List<UserInfo> userList = userService.getAllUserInfo();
        boolean isExistedUser = userList.stream().anyMatch(
                o -> userInfo.getUsername().equals(o.getUsername()) || userInfo.getEmail().equals(o.getEmail()));
        if (isExistedUser) {
            return 0;
        }
        userService.addUserInfo(userInfo);
        return 1;
    }

    private boolean isHaveUser(UserInfo userInfo) {
        List<UserInfo> userList = userService.getAllUserInfo();
        return userList.stream().anyMatch(
                o -> userInfo.getUsername().equals(o.getUsername()) && userInfo.getPassword().equals(o.getPassword()));
    }

    @GetMapping("/list-user")
    private List<UserInfo> getAllUserInfo() {
        return userService.getAllUserInfo();
    }

    private List<UserInfo> getCurrentUser(@RequestBody UserInfo userInfo) {
        List<UserInfo> userList = userService.getAllUserInfo();
        return userList.stream().filter(item -> userInfo.getUsername().equals(item.getUsername()))
                .collect(Collectors.toList());
    }

    @PostMapping("/login")
    public UserInfo loginUserInfo(@RequestBody UserInfo userInfo) {
        addAdminAccount();
        UserInfo newResponsePayload = userInfo;
        if (isHaveUser(userInfo)) {
            UserInfo currentUser = getCurrentUser(userInfo).get(0);
            return currentUser;
        }
        newResponsePayload.setUsername("");
        newResponsePayload.setPassword("");
        newResponsePayload.setPermission(-1);
        newResponsePayload.setEmail("");
        return newResponsePayload;
    }

    public void addAdminAccount() {
        List<UserInfo> userList = userService.getAllUserInfo();
        if(userList.isEmpty()) {
            UserInfo adminUser = new UserInfo();
            adminUser.setUsername("admin");
            adminUser.setPassword("admin");
            adminUser.setPermission(1);
            userService.addUserInfo(adminUser);
            return;
        }
    }

    @PostMapping("/update-user")
    public void updateUser(@RequestBody UserInfo userInfo) {
            userService.updateUserInfo(userInfo);

    }
}
