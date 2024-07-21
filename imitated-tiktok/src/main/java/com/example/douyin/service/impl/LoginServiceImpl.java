package com.example.douyin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.douyin.dao.UserMapper;
import com.example.douyin.entity.LoginUser;
import com.example.douyin.common.ResponseResult;
import com.example.douyin.entity.User;
import com.example.douyin.service.LoginService;
import com.example.douyin.utils.JwtUtil;
import com.example.douyin.utils.RedisCache;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class LoginServiceImpl implements LoginService {
    //private static final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RedisCache redisCache;
    @Autowired
    private UserMapper userMapper;
    @Override
    public ResponseResult login(User user, String userAgent) {
        log.info("Login request received for user: {}", user.getUsername());

        // AuthenticationManager 进行用户认证
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
        Authentication authenticate = authenticationManager.authenticate(authenticationToken);

        // 如果认证没通过，给出对应的提示
        if (!authenticate.isAuthenticated()) {
            throw new RuntimeException("用户名或密码错误");
        }

        // 认证通过后获取登录用户信息
        LoginUser loginUser = (LoginUser) authenticate.getPrincipal();
        String userId = loginUser.getUser().getUserId().toString();
        String username = loginUser.getUser().getUsername();
        String jwt = JwtUtil.createJWT(userId);

        // 将登录用户信息存入 Redis
        redisCache.setCacheObject("login:" + userId, loginUser);

        // 构建要返回给前端的用户信息
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("userId", userId);
        userInfo.put("username", username);
        // 这里可以根据需要添加更多的用户信息

        // 构建响应数据
        Map<String, Object> response = new HashMap<>();
        response.put("token", jwt);
        response.put("user", userInfo);

        // 记录日志
        log.info("User {} logged in with browser: {}", user.getUsername(), userAgent);

        return new ResponseResult(200, "登录成功", response);
    }


    @Override
    public ResponseResult logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        Long userid = loginUser.getUser().getUserId();
        redisCache.deleteObject("login:"+userid);
        log.info("User {} logged out", loginUser.getUser().getUsername());
        return new ResponseResult(200,"退出成功",null);
    }

    public ResponseResult register(User user){
        // 检查用户是否已经存在
        User existingUser = userMapper.selectOne(new QueryWrapper<User>().eq("username", user.getUsername()));
        if (existingUser != null) {
            // 用户已存在，返回错误信息
            log.info("Registration had done for user: {}", user.getUsername());
            return new ResponseResult(400, "用户已被注册", null);
        }

        log.info("Registration request received for user: {}", user.getUsername());
        // 用户不存在，执行注册逻辑
        String password = user.getPassword();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encode = bCryptPasswordEncoder.encode(password);
        user.setPassword(encode);
        // 默认为用户
        userMapper.insert(user);
        log.info("User {} registered successfully", user.getUsername());
        return new ResponseResult<>(200, "注册成功", null);
    }

}
