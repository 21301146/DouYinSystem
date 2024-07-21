import { axiosInstance } from "./config";
import axios from 'axios'

// 获取推荐视频列表
export const getVideosRequest = () =>
    axios.get('http://localhost:3001/videos')


