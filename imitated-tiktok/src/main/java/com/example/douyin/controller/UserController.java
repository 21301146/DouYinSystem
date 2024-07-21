package com.example.douyin.controller;

import com.example.douyin.common.ResponseResult;
import com.example.douyin.entity.User;
import com.example.douyin.service.UserService;
import com.example.douyin.utils.Limiting;
import com.example.douyin.utils.RequestTiming;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestTiming
    @Limiting(limitNum = 0.5, name = "user-limiting1")
    @PreAuthorize("hasAnyAuthority('0')")
    @GetMapping("/getByUserId/{userId}")
    public ResponseResult<User> getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }


    @RequestTiming
    @Limiting(limitNum = 0.5, name = "user-limiting2")
    @GetMapping("/getByUsername/{username}")
    public ResponseResult<User> getByUsername(@PathVariable String username){
        return userService.getByUsername(username);
    }
    @RequestTiming
    @Limiting(limitNum = 0.5, name = "user-limiting3")
    @PreAuthorize("hasAnyAuthority('0')")
    @PostMapping("/create")
    public ResponseResult createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @RequestTiming
    @Limiting(limitNum = 0.5, name = "user-limiting4")
    @PreAuthorize("hasAnyAuthority('0')")
    @PutMapping("/update")
    public ResponseResult updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @RequestTiming
    @Limiting(limitNum = 0.5, name = "user-limiting5")
    @PreAuthorize("hasAnyAuthority('0')")
    @DeleteMapping("/delete/{userId}")
    public ResponseResult deleteUser(@PathVariable Long userId) {
        return userService.deleteUser(userId);
    }

    /*
    @PutMapping("/{userId}/videoCount/{newCount}")
    public ResponseResult updateVideoCount(@PathVariable Long userId, @PathVariable Integer newCount) {
        return userService.updateVideoCount(userId, newCount);
    }

    @PutMapping("/{userId}/favouriteCount/{newCount}")
    public ResponseResult updateFavouriteCount(@PathVariable Long userId, @PathVariable Integer newCount) {
        return userService.updateFavouriteCount(userId, newCount);
    }*/
}
