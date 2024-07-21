import React, { useEffect, useState, memo } from 'react'
import './style.css'
import Video from '../Home/Video'
import Header from '../../components/Home_header';
import Bottom from '../../components/common/Bottom';
import { getVideosList } from './store/actionCreators'
import { connect } from 'react-redux'
import {
  changeMyLikeList,
  addLikeing,
  delsteLikeing
} from '../Mine/store/actionCreators'
import axios from 'axios'


function Home(props) {

  const { like } = props
  const { getVideosListDispatch,
    changeMyLikeListDispatch,
    addLikeStateDispatch,
    deleteLikeStateDispatch
  } = props

  // 获取推荐视频
  const [videosList, setVideosList] = useState([]);

  useEffect(() => {
    // getVideosListDispatch();
    axios.get("http://localhost:8080/api/recommended", {
      params: {
        pageNo: 1, // 设置默认参数或根据需求修改
        pageSize: 10
      },
      headers: {
        'token': localStorage.getItem('token'),
      }
    })
      .then((response) => {
        console.log(response.data);
        setVideosList(response.data.data.data);
      })
      .catch((error) => console.error("Error fetching videos:", error));

  }, [])

  const addLike = (item) => {
    // console.log("addlike123");
    console.log(item);
    changeMyLikeListDispatch(item)
    addLikeStateDispatch(item)
    // setLiked(false)
  }
  const deleteLike = (item) => {
    console.log(item);
    deleteLikeStateDispatch(item)
  }

  return (

    <div >
      <Header />
      <div className="app_videos" >
        {
          videosList.map((item, index) => {
            return (

              <Video
                key={item.videoId}
                path={item.playUrl}
                title={item.title}
                hearts={item.favouriteCount}
                comments={item.commentCount}
                collects={item.collectCount}
                share={item.shareCount}
                id={item.videoId}
                item={item}
                addLike={addLike}
                deleteLike={deleteLike}
                like={like}
              />
            )
          })

        }
      </div>



      <Bottom />

    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    videosList: state.videos.videosList,
    like: state.mylike.like
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getVideosListDispatch() {
      dispatch(getVideosList())
    },
    changeMyLikeListDispatch(data) {
      dispatch(changeMyLikeList(data))
    },
    addLikeStateDispatch(data) {
      dispatch(addLikeing(data))
    },
    deleteLikeStateDispatch(data) {
      dispatch(delsteLikeing(data))
    }


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(Home))
