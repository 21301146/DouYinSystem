package com.example.douyin.entity;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;

@TableName("favourite")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Favourite {
    @TableId(value = "favourite_id")
    private Long favouriteId;

    @TableField(value = "user_id")
    private Long userId;

    @TableField(value = "video_id")
    private Long videoId;
}
