package com.example.douyin.controller;

import com.example.douyin.common.Pages;
import com.example.douyin.common.ResponseResult;
import com.example.douyin.entity.Video;
import com.example.douyin.service.MainService;
import com.example.douyin.utils.Limiting;
import com.example.douyin.utils.RequestTiming;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class MainController {

    @Autowired
    private MainService mainService;

    // 点赞视频
    @RequestTiming
    @Limiting(limitNum = 0.5, name = "main-limiting1")
    @PreAuthorize("hasAnyAuthority('0','1')")
    @PostMapping("/like")
    public ResponseResult likeVideo(@RequestParam("userId") Long userId, @RequestParam("videoId") Long videoId) {
        return mainService.likeVideo(userId, videoId);
    }

    //推荐视频
    @RequestTiming
    @Limiting(limitNum = 0.5, name = "main-limiting2")
    @PreAuthorize("hasAnyAuthority('0','1')")
    @GetMapping("/recommended")
    public ResponseResult<Pages<Video>> getRecommendedVideos(
            @RequestParam(value = "pageNo", defaultValue = "1") int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
        return mainService.getRecommendedVideos(pageNo, pageSize);
    }
    //滑动获取
    @RequestTiming
    @Limiting(limitNum = 0.5, name = "main-limiting3")
    @PreAuthorize("hasAnyAuthority('0','1')")
    @GetMapping("/navigate")
    public ResponseResult<Video> navigateVideo(@RequestParam("currentId") Long currentVideoId, @RequestParam("direction") String direction) {
        return mainService.getAdjacentVideo(currentVideoId, direction);
    }
}
