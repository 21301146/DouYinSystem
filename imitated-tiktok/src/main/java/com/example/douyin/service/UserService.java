package com.example.douyin.service;

import com.example.douyin.common.ResponseResult;
import com.example.douyin.entity.User;

public interface UserService {
    ResponseResult<User> getUserById(Long userId);

    ResponseResult<User> getByUsername(String username);
    ResponseResult<Void> createUser(User user);

    ResponseResult<Void> updateUser(User user);

    ResponseResult<Void> deleteUser(Long userId);

    ResponseResult<Void> updateVideoCount(Long userId);

    ResponseResult<Void> updateFavouriteCount(Long userId, Integer newCount);
}
