package com.example.douyin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.douyin.entity.LoginUser;
import com.example.douyin.entity.User;
import com.example.douyin.dao.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;


@Slf4j
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserMapper userMapper;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		//根据用户名查询用户信息
		LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
		wrapper.eq(User::getUsername,username);
		User user = userMapper.selectOne(wrapper);

		//查询不到数据就抛出异常给出提示
		if(Objects.isNull(user)){
			throw new RuntimeException("用户名或密码错误");
		}

		//TODO 根据用户查询权限纤细 添加到LoginUser中
		List<String> list = new ArrayList<>(Arrays.asList(user.getRole()));

		//封装程UserDetails对象返回
		return new LoginUser(user,list);
	}
}
