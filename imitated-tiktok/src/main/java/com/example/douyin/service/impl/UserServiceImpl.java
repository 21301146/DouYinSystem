package com.example.douyin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.douyin.dao.UserMapper;
import com.example.douyin.common.ResponseResult;
import com.example.douyin.dao.VideoMapper;
import com.example.douyin.entity.User;
import com.example.douyin.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private VideoMapper videoMapper;
    @Override
    public ResponseResult<User> getUserById(Long userId) {
        log.info("Fetching user with ID: {}", userId);
        User user = userMapper.selectById(userId);
        if (user == null) {
            log.info("User with ID {} not found", userId);
            return new ResponseResult<>(404, "User not found", null);
        }
        log.info("User with ID {} retrieved successfully", userId);
        return new ResponseResult<>(200, "Success", user);
    }


    @Override
    public ResponseResult<User> getByUsername(String username){
        log.info("Fetching user with username: {}", username);
        User user = userMapper.selectOne(new QueryWrapper<User>().eq("username", username));
        if (user == null) {
            log.info("User with username {} not found", username);
            return new ResponseResult<>(404, "User not found", null);
        }
        log.info("User with username {} retrieved successfully", username);
        return new ResponseResult<>(200, "Success", user);
    }

    @Override
    public ResponseResult createUser(User user) {
        log.info("Creating user: {}", user.getUsername());

        // Check if username already exists
        User existingUser = userMapper.findByUsername(user.getUsername());
        if (existingUser != null) {
            log.error("Username {} already exists", user.getUsername());
            return new ResponseResult<>(400, "Username already exists", existingUser);
        }

        String password = user.getPassword();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encode = bCryptPasswordEncoder.encode(password);
        user.setPassword(encode);
        user.setRole("1");
        // Proceed to insert user if username is unique
        int rows = userMapper.insert(user);
        if (rows > 0) {
            log.info("User {} created successfully", user.getUsername());
            return new ResponseResult<>(200, "User created successfully", user);
        }

        log.error("Failed to create user: {}", user.getUsername());
        return new ResponseResult<>(500, "Failed to create user", null);
    }


    @Override
    public ResponseResult updateUser(User user) {
        log.info("Updating user with ID: {}", user.getUserId());
        String password = user.getPassword();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encode = bCryptPasswordEncoder.encode(password);
        user.setPassword(encode);
        int rows = userMapper.updateById(user);
        if (rows > 0) {
            log.info("User with ID {} updated successfully", user.getUserId());
            return new ResponseResult<>(200, "User updated successfully", user);
        }
        log.error("Failed to update user with ID: {}", user.getUserId());
        return new ResponseResult<>(500, "Failed to update user", null);
    }

    @Override
    public ResponseResult deleteUser(Long userId) {
        log.info("Deleting user with ID: {}", userId);
        int rows = userMapper.deleteById(userId);
        if (rows > 0) {
            log.info("User with ID {} deleted successfully", userId);
            return new ResponseResult<>(200, "User deleted successfully", null);
        }
        log.error("Failed to delete user with ID: {}", userId);
        return new ResponseResult<>(500, "Failed to delete user", null);
    }

    /*
    @Override
    public ResponseResult updateVideoCount(Long userId, Integer newCount) {
        log.info("Updating video count for user with ID: {}", userId);
        User user = userMapper.selectById(userId);
        if (user == null) {
            log.info("User with ID {} not found", userId);
            return new ResponseResult<>(404, "User not found", null);
        }
        user.setVideoCount(newCount);
        int rows = userMapper.updateById(user);
        if (rows > 0) {
            log.info("Video count updated successfully for user with ID {}", userId);
            return new ResponseResult<>(200, "Video count updated successfully", user);
        }
        log.error("Failed to update video count for user with ID: {}", userId);
        return new ResponseResult<>(500, "Failed to update video count", null);
    }*/
    @Override
    public ResponseResult updateVideoCount(Long userId) {
        log.info("Updating video count for user with ID: {}", userId);

        // 查询用户发布的视频数量
        int videoCount = videoMapper.countVideosByUserId(userId);

        // 更新用户作品数
        User user = userMapper.selectById(userId);
        if (user == null) {
            log.info("User with ID {} not found", userId);
            return new ResponseResult<>(404, "User not found", null);
        }

        user.setVideoCount(videoCount);
        int rows = userMapper.updateById(user);
        if (rows > 0) {
            log.info("Video count updated successfully for user with ID {}", userId);
            return new ResponseResult<>(200, "Video count updated successfully",null);
        }

        log.error("Failed to update video count for user with ID: {}", userId);
        return new ResponseResult<>(500, "Failed to update video count", null);
    }

    @Override
    public ResponseResult updateFavouriteCount(Long userId, Integer newCount) {
        log.info("Updating favourite count for user with ID: {}", userId);
        User user = userMapper.selectById(userId);
        if (user == null) {
            log.info("User with ID {} not found", userId);
            return new ResponseResult<>(404, "User not found", null);
        }
        user.setFavouriteCount(newCount);
        int rows = userMapper.updateById(user);
        if (rows > 0) {
            log.info("Favourite count updated successfully for user with ID {}", userId);
            return new ResponseResult<>(200, "Favourite count updated successfully", user);
        }
        log.error("Failed to update favourite count for user with ID: {}", userId);
        return new ResponseResult<>(500, "Failed to update favourite count", null);
    }
}

