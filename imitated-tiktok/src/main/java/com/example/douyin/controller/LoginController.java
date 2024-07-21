package com.example.douyin.controller;

import com.example.douyin.entity.User;
import com.example.douyin.common.ResponseResult;
import com.example.douyin.service.LoginService;
import com.example.douyin.utils.Limiting;
import com.example.douyin.utils.RequestTiming;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/index")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //注册
    @RequestTiming
    @Limiting(limitNum = 0.5, name = "login-limiting1")
    @PostMapping("/register")
    public ResponseResult register(@RequestBody User user){
        System.out.println(user);
        return loginService.register(user);
    }

    //登录
    @RequestTiming
    @Limiting(limitNum = 0.5, name = "login-limiting2")
    @PostMapping("/login")
    public ResponseResult login(@RequestBody User user, HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        return loginService.login(user, userAgent);
    }

    //退出登录
    @RequestTiming
    @Limiting(limitNum = 0.5, name = "login-limiting3")
    @GetMapping("/logout")
    public ResponseResult logout(){
        return loginService.logout();
    }



}
