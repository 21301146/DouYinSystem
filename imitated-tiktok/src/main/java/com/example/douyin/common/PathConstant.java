package com.example.douyin.common;

public interface PathConstant {

    // 视频保存至本地的路径C:\Users\ghy\Desktop\douyin
    String videoSavePath = "D:\\downloads\\Desktop\\imitated-tiktok\\src\\main\\resources\\static\\video";
    // 视频封面保存至本地的路径
    String coverSavePath = "D:\\downloads\\Desktop\\imitated-tiktok\\src\\main\\resources\\static\\cover";

    // String videoBathPath = "http://192.168.0.103:8080/douyin/video/";
    //
    // String coverBathPath = "http://192.168.0.103:8080/douyin/cover/";

    // 视频保存至OSS的路径
    String videoOSSPath = "https://doushengnanjing.oss-cn-beijing.aliyuncs.com/video/";
    // 视频封面保存至OSS的路径
    String coverOSSPath = "https://doushengnanjing.oss-cn-beijing.aliyuncs.com/cover/";
}
