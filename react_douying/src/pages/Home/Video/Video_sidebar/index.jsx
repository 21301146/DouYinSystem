import React, { useEffect, useState, memo } from 'react'
import './style.css'
import { Popup, Space, Image } from 'antd-mobile'
import { MessageOutline } from 'antd-mobile-icons'
import { Link, useParams } from "react-router-dom"


function Video_sidebar(props) {
  //  const {hearts,comments,collects,share,users,id,item,like,liked}=props
  const { hearts, comments, collects, share, id, item, like } = props
  const { addLike = () => { },
    deleteLike = () => { }
  } = props
  const [liked, setLiked] = useState(false)
  const [shoucang, setShoucang] = useState(false)
  const [visible1, setVisible1] = useState(false)

  // 如果该视频在用户的点赞列表里，那么将liked设为true
  // 判断该用户是否已登录
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  useEffect(() => {
    if (isLoggedIn && like.find(ll => ll.id === item.id)) {
      setLiked(true);
    }
  }, [])

  const handleAddLike = (item) => {
    addLike(item);  // 调用传入的 addLike 函数
    setLiked(true); // 设置 liked 状态为 true
  };

  const handleDeleteLike = (item) => {
    deleteLike(item);  // 调用传入的 deleteLike 函数
    setLiked(false);   // 设置 liked 状态为 false
  };

  return (

    <div className='video_sidebar' key={id}>
      <div className="video_sidebar_button" >
        {/* {like.filter(item => item.id == id).map((item) => { return item.id }) == id ? (
          <div className="heart" >
            <i className='iconfont icon-aixin1' onClick={deleteLike.bind(null, item)}></i>
          </div>) : (
          <i className='iconfont icon-aixin1' onClick={addLike.bind(null, item)}

          //  setLiked(true)}
          ></i>
        )} */}
        {liked ? (
          <div className="heart" >
            <i className='iconfont icon-aixin1' onClick={() => handleDeleteLike(item)}></i>
          </div>) : (
          <i className='iconfont icon-aixin1' onClick={() => handleAddLike(item)}></i>
        )}
        <p>{hearts}</p>
      </div>
      <div className="video_sidebar_button">
        <i><MessageOutline /></i>
        <p>{comments}</p>
      </div>
      <div className="video_sidebar_button">
        {shoucang ? (<div className="shoucang">
          <i className='iconfont icon-shoucang' onClick={(e => setShoucang(false))}></i>
        </div>) : (
          <i className='iconfont icon-shoucang ' onClick={(e => setShoucang(true))}></i>

        )}
        <p>{shoucang ? collects + 1 : collects}</p>
      </div>
      <div className="video_sidebar_button">
        <Space direction='vertical'>
          <i
            onClick={() => {
              setVisible1(true)
            }}
            className='iconfont icon-zhuanfa00'
          >
          </i>
          <Popup
            visible={visible1}
            onMaskClick={() => {
              setVisible1(false)
            }}
            bodyStyle={{ minHeight: '50vh' }}
          >
            分享给朋友
          </Popup>
        </Space>
        <p>{share}</p>
      </div>

    </div>
  )
}

export default memo(Video_sidebar)
