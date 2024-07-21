package com.example.douyin.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    //http://localhost:8080/video/20231217_234533%20-%20Trim.mp4
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 映射视频文件夹
        registry.addResourceHandler("/video/**")
                .addResourceLocations("file:/D:/downloads/Desktop/imitated-tiktok/src/main/resources/static/video/");

        // 映射封面图片文件夹（假设存放在 static/images 目录下）
        registry.addResourceHandler("/cover/**")
                .addResourceLocations("file:/D:/downloads/Desktop/imitated-tiktok/src/main/resources/static/cover/");
    }

}
