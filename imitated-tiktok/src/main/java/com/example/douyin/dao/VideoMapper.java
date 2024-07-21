package com.example.douyin.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.douyin.entity.Video;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;


@Mapper
public interface VideoMapper extends BaseMapper<Video> {
    // 查询指定用户的视频列表，并支持分页
    @Select("SELECT * FROM video WHERE user_id = #{userId} LIMIT #{offset}, #{pageSize}")
    List<Video> selectVideosByUserId(Long userId, int offset, int pageSize);

    // 统计指定用户的视频总数
    @Select("SELECT COUNT(*) FROM video WHERE user_id = #{userId}")
    int countVideosByUserId(Long userId);

    @Select("SELECT * FROM video ORDER BY favourite_count DESC LIMIT #{offset}, #{pageSize}")
    List<Video> selectVideosOrderByFavouritesDesc(int offset, int pageSize);

    // 统计视频总数
    @Select("SELECT COUNT(*) FROM video")
    int countTotalVideos();

    // Fetch the next video or the first video if current is the last
    @Select({
            "<script>",
            "SELECT * FROM video",
            "WHERE video_id > #{currentVideoId}",
            "ORDER BY video_id ASC",
            "LIMIT 1",
            "UNION",
            "SELECT * FROM video",
            "ORDER BY video_id ASC",
            "LIMIT 1",
            "</script>"
    })
    Video findNextVideo(Long currentVideoId);

    // Fetch the previous video or the last video if current is the first
    @Select({
            "<script>",
            "SELECT * FROM video",
            "WHERE video_id &lt; #{currentVideoId}",//小于号转义符&lt;
            "ORDER BY video_id DESC",
            "LIMIT 1",
            "UNION",
            "SELECT * FROM video",
            "ORDER BY video_id DESC",
            "LIMIT 1",
            "</script>"
    })
    Video findPreviousVideo(Long currentVideoId);
}
