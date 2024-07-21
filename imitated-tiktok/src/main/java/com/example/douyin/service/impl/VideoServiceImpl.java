package com.example.douyin.service.impl;

import com.example.douyin.common.Pages;
import com.example.douyin.common.PathConstant;
import com.example.douyin.common.ResponseResult;
import com.example.douyin.dao.VideoMapper;
import com.example.douyin.entity.Video;
import com.example.douyin.service.UserService;
import com.example.douyin.service.VideoService;
import com.example.douyin.utils.VideoUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Slf4j
@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoMapper videoMapper;


    @Autowired
    private UserService userService;
    @Override
    public ResponseResult publish(MultipartFile video, Long userId, String title) throws IOException {
        // Save video to local storage
        File dir = new File(PathConstant.videoSavePath);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        File videoFile = new File(dir, video.getOriginalFilename());

        log.info("Start uploading video, filename: {}", video.getOriginalFilename());

        try {
            video.transferTo(videoFile);
        } catch (IOException e) {
            log.error("Failed to upload video: {}", e.getMessage());
            e.printStackTrace();
            return new ResponseResult<>(500, "Failed to publish video", null);
        }

        // Save video cover to local storage
        File dir1 = new File(PathConstant.coverSavePath);
        if (!dir1.exists()) {
            dir1.mkdirs();
        }
        String coverName = video.getOriginalFilename().substring(0, video.getOriginalFilename().lastIndexOf("."))
                + "Cover.jpg";
        String coverPath = PathConstant.coverSavePath + File.separator + coverName;
        log.info("Start uploading video cover, filename: {}", coverName);
        try {
            VideoUtils.fetchPic(videoFile, coverPath);
        } catch (Exception e) {
            log.error("Failed to upload video cover: {}", e.getMessage());
            e.printStackTrace();
            return new ResponseResult<>(500, "Failed to publish video", null);
        }

        // Save video entity to database
        Video newVideo = new Video();
        newVideo.setUserId(userId);
        newVideo.setTitle(title);
        newVideo.setPlayUrl(PathConstant.videoSavePath + File.separator + video.getOriginalFilename());
        newVideo.setCoverUrl(coverPath);
        newVideo.setFavouriteCount(0);
        newVideo.setCommentCount(0);
        newVideo.setCollectCount(0);
        newVideo.setShareCount(0);

        videoMapper.insert(newVideo);
        log.info("Saved video entity to database, filename: {}", title);

        return new ResponseResult<>(200, "Success", null);
    }
    /*
        // 保存视频到OSS
        log.info("视频上传到OSS，文件名:{}", video.getOriginalFilename());

        String videoOSSPath = "video/" + video.getOriginalFilename();// 保存在OSS中的路径
        String videoOSSUrl = PathConstant.videoOSSPath + video.getOriginalFilename();// 视频访问路径
        try {
            AliOSSUtils.uploadFile(videoFile.getAbsolutePath(), videoOSSPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 保存视频封面到OSS
        log.info("视频封面上传到OSS，文件名:{}", video.getOriginalFilename());

        String coverOSSPath = "cover/" + coverName;// 保存在OSS中的路径
        String coverOSSUrl = PathConstant.coverOSSPath + coverName;// 视频封面访问路径
        try {
            AliOSSUtils.uploadFile(coverPath, coverOSSPath);
        } catch (IOException e) {
            e.printStackTrace();
        }*/

    @Override
    public ResponseResult<Pages<Video>> listMyVideos(Long userId, int pageNo, int pageSize) {
        log.info("Fetching videos for user ID: {}, page: {}, pageSize: {}", userId, pageNo, pageSize);
        System.out.println(pageNo + ',' + pageSize);
        // 计算偏移量
        int offset = (pageNo - 1) * pageSize;

        // 查询视频数据
        List<Video> videos = videoMapper.selectVideosByUserId(userId, offset, pageSize);

        // 查询视频总数
        int total = videoMapper.countVideosByUserId(userId);

        // 构建分页对象
        Pages<Video> pages = new Pages<>();
        pages.setCurrent(pageNo);
        pages.setPageSize(pageSize);
        pages.setTotal((long) total);
        pages.setData(videos);

        log.info("Fetched {} videos for user ID: {}", videos.size(), userId);

        // 更新用户作品数
        ResponseResult updateResult = userService.updateVideoCount(userId);
        if (updateResult.getCode() != 200) {
            return new ResponseResult<>(500, "Failed to update video count", null);
        }
        // 封装成ResponseResult返回
        ResponseResult<Pages<Video>> result =  new ResponseResult<>(200, "Success", pages);
        return result;
    }


    @Override
    public ResponseResult deleteVideo(Long videoId, Long userId) {
        log.info("Deleting video with ID: {} for user ID: {}", videoId, userId);

        // 查询视频信息，确认是否属于当前用户
        Video video = videoMapper.selectById(videoId);
        if (video == null) {
            log.info("Video with ID {} not found", videoId);
            return new ResponseResult(404, "Video not found", null);
        }

        // 检查视频是否属于当前用户
        if (!video.getUserId().equals(userId)) {
            log.info("Video with ID {} does not belong to user with ID {}", videoId, userId);
            return new ResponseResult(403, "You are not authorized to delete this video", null);
        }

        // 删除视频
        int deleted = videoMapper.deleteById(videoId);
        if (deleted > 0) {
            log.info("Deleted video with ID: {}", videoId);

            // 更新用户作品数
            ResponseResult updateResult = userService.updateVideoCount(userId);
            if (updateResult.getCode() != 200) {
                return new ResponseResult<>(500, "Failed to update video count", null);
            }

            return new ResponseResult(200, "Video deleted successfully", null);
        } else {
            log.info("Failed to delete video with ID: {}", videoId);
            return new ResponseResult(500, "Failed to delete video", null);
        }
    }


}
