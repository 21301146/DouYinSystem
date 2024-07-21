package com.example.douyin.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import com.alibaba.fastjson.JSON;
@AllArgsConstructor
@Data
public class ResponseResult<T> {
    private Integer code;
    private String message;
    private T data;
}
