package com.example.douyin.service;

import com.example.douyin.common.Pages;
import com.example.douyin.common.ResponseResult;
import com.example.douyin.entity.Video;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface VideoService {

    ResponseResult publish (MultipartFile video, Long userId, String title) throws IOException;

    ResponseResult<Pages<Video>> listMyVideos(Long userId, int pageNo, int pageSize);

    ResponseResult deleteVideo(Long videoId, Long userId);
}
