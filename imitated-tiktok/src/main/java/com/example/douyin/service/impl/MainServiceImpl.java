package com.example.douyin.service.impl;

import com.example.douyin.common.Pages;
import com.example.douyin.common.ResponseResult;
import com.example.douyin.dao.FavouriteMapper;
import com.example.douyin.dao.VideoMapper;
import com.example.douyin.entity.Favourite;
import com.example.douyin.entity.Video;
import com.example.douyin.service.MainService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class MainServiceImpl implements MainService {

    @Autowired
    private FavouriteMapper favouriteMapper;

    @Autowired
    private VideoMapper videoMapper;
    // 点赞视频

    @Override
    public ResponseResult likeVideo(Long userId, Long videoId)  {
        // Insert into favourite table
        log.info("Liking video with ID: {} for user ID: {}", videoId, userId);
        Favourite favourite = new Favourite();
        favourite.setUserId(userId);
        favourite.setVideoId(videoId);
        //favouriteMapper.insert(favourite);
        int result = favouriteMapper.insert(favourite);
        if (result > 0) {
            log.info("Video liked successfully");
        } else {
            log.error("Failed to like video");
            return new ResponseResult<>(500, "Failed to like video", null);
        }
        // Update video table to increment favourite_count
        Video video = videoMapper.selectById(videoId);
        if (video != null) {
            video.setFavouriteCount(video.getFavouriteCount() + 1);
            videoMapper.updateById(video);
            return new ResponseResult<>(200, "Video liked successfully", null);
        } else {
            return new ResponseResult<>(404, "User not found", null);
        }
    }

    @Override
    public ResponseResult<Pages<Video>> getRecommendedVideos(int pageNo, int pageSize) {
        int offset = (pageNo - 1) * pageSize;
        List<Video> videos = videoMapper.selectVideosOrderByFavouritesDesc(offset, pageSize);
        int total = videoMapper.countTotalVideos();

        Pages<Video> pages = new Pages<>();
        pages.setCurrent(pageNo);
        pages.setPageSize(pageSize);
        pages.setTotal((long) total);
        pages.setData(videos);
        ResponseResult<Pages<Video>> responseResult = new ResponseResult<>(200, "Success", pages);

        log.info("Fetched {} recommended videos for page: {}, size: {}", videos.size(), pageNo, pageSize);
        return responseResult;
    }

    @Override
    public ResponseResult<Video> getAdjacentVideo(Long currentVideoId, String direction) {
        log.info("Attempting to fetch {} video for video ID: {}", direction, currentVideoId);
        Video video = null;

        if ("next".equals(direction)) {
            video = videoMapper.findNextVideo(currentVideoId);
        } else if ("prev".equals(direction)) {
            video = videoMapper.findPreviousVideo(currentVideoId);
        }

        if (video != null) {
            log.info("Fetched video ID: {}", video.getVideoId());
            return new ResponseResult<>(200, "Success", video);
        } else {
            log.warn("No video found for direction: {} and video ID: {}", direction, currentVideoId);
            return new ResponseResult<>(404, "Video not found", null);
        }
    }
}
