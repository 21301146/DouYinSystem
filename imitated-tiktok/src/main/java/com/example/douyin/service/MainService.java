package com.example.douyin.service;

import com.example.douyin.common.Pages;
import com.example.douyin.common.ResponseResult;
import com.example.douyin.entity.Video;

public interface MainService {

    ResponseResult likeVideo(Long userId, Long videoId);

    ResponseResult<Pages<Video>> getRecommendedVideos(int pageNo, int pageSize);

    ResponseResult<Video> getAdjacentVideo(Long currentVideoId, String direction);
}
