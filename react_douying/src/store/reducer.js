// 模块化 路由模块基本就是数据模块
import { combineReducers } from "redux";
// store 中央 
// 地方
import { reducer as videosReducer } from '../pages/Home/store/index'
import { reducer as mylikelistsReducer } from '../pages/Mine/store/index'

export default combineReducers({
    videos: videosReducer,
    mylike: mylikelistsReducer
})

