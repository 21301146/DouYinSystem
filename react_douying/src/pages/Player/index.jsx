import React, { useState, useEffect, memo } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Wrapper } from '../UserDetail/style'
import './style.css'
import { connect } from 'react-redux'
import {
  changeMyLikeList,
  addLikeing,
  delsteLikeing
} from '../Mine/store/actionCreators'
import { getVideosList } from '@/pages/Home/store/actionCreators'
import Video from '../Home/Video'

function Player(props) {

  const [show, setShow] = useState(false);
  const { videosList, like } = props
  const { getVideosListDispatch,
    changeMyLikeListDispatch,
    addLikeStateDispatch,
    deleteLikeStateDispatch
  } = props
  const [query, setQuery] = useState('')
  const handleQuery = (q) => {
    // console.log(q)
    setQuery(q)
  }

  useEffect(() => {
    setShow(true)


  }, [])
  useEffect(() => {
    getVideosListDispatch()

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
    <div>
      <CSSTransition
        in={show}
        timeout={300}
        appear={true}
        classNames="fly"
        unmountOnExit
        onExit={() => {
          navigate(-1)
        }}
      >
        <Wrapper>
          {/* <SearchBox
            newQuery={query}
            handleQuery={handleQuery}>
          </SearchBox> */}
          <div className="app_videos" >
            {
              videosList.map((item, index) => {
                return (

                  <Video
                    key={item.id}
                    path={item.path}
                    // user={item.user}
                    title={item.title}
                    // song={item.song}
                    hearts={item.like}
                    comments={item.comments}
                    collects={item.collects}
                    share={item.share}
                    // users={item.headpho}
                    // cd={item.headpho}
                    id={item.id}
                    item={item}
                    addLike={addLike}
                    deleteLike={deleteLike}
                    like={like}
                  />
                )
              })

            }
          </div>
        </Wrapper>
      </CSSTransition>

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


export default connect(mapStateToProps, mapDispatchToProps)(memo(Player))