package com.example.douyin.entity;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;


@TableName("video")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Video {
    @TableId(value = "video_id")
    private Long videoId;

    @TableField(value = "user_id")
    private Long userId;

    @TableField(value = "title")
    private String title;

    @TableField(value = "play_url")
    private String playUrl;

    @TableField(value = "cover_url")
    private String coverUrl;

    @TableField(value = "favourite_count")
    private Integer favouriteCount;

    @TableField(value = "comment_count")
    private Integer commentCount;

    @TableField(value = "collect_count")
    private Integer collectCount;

    @TableField(value = "share_count")
    private Integer shareCount;
}

