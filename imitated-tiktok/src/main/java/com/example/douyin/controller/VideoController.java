package com.example.douyin.controller;

import com.example.douyin.common.Pages;
import com.example.douyin.common.ResponseResult;
import com.example.douyin.entity.Video;
import com.example.douyin.service.VideoService;
import com.example.douyin.utils.Limiting;
import com.example.douyin.utils.RequestTiming;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/video")
public class VideoController {
    @Autowired
    private VideoService videoService;

    @RequestTiming
    @Limiting(limitNum = 0.5, name = "video-limiting1")
    @PreAuthorize("hasAnyAuthority('0','1')")
    @PostMapping("/publish")
    public ResponseResult publishVideo(
            @RequestParam("video") MultipartFile video,
            @RequestParam("userId") Long userId,
            @RequestParam("title") String title) {

        try {
            ResponseResult result = videoService.publish(video, userId, title);
            return result;
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseResult(500, "Failed to publish video", null);
        }
    }

    @RequestTiming
    @Limiting(limitNum = 0.5, name = "video-limiting2")
    @PreAuthorize("hasAnyAuthority('0','1')")
    @GetMapping("/list")
    public ResponseResult<Pages<Video>> listMyVideos(
            @RequestParam("userId") Long userId,
            @RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
        System.out.println(pageNo + ',' + pageSize);
        return videoService.listMyVideos(userId, pageNo, pageSize);
    }

    //验证视频是否属于用户
    @RequestTiming
    @Limiting(limitNum = 0.5, name = "video-limiting3")
    @PreAuthorize("hasAnyAuthority('0','1')")
    @DeleteMapping("/delete/{videoId}")
    public ResponseResult deleteVideo(@PathVariable Long videoId, @RequestParam("userId") Long userId) {
        return videoService.deleteVideo(videoId, userId);
    }

}
