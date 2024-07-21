package com.example.douyin.service;

import com.example.douyin.common.ResponseResult;
import com.example.douyin.entity.User;

public interface LoginService {
    ResponseResult login(User user, String userAgent);

    ResponseResult logout();

    ResponseResult register(User user);
}
