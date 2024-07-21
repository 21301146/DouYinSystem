import React, { useState, useRef, memo } from 'react'
import ReactPlayer from 'react-player/lazy'
import { Wrapper } from './style.js'
import VideoFooter from './Video_footer'
import Video_sidebar from './Video_sidebar'


function Video(props) {
    // const { liked,like,videos, user, description, song, hearts, comments, collects, share, users, cd ,id,item} =props
    const { path, title, hearts, comments, collects, share, id, item, like } = props;
    const { addLike = () => { },
        deleteLike = () => { } } = props
    // console.log(addLike);
    const videoRef = useRef(null)
    const [play, setPlay] = useState(false)
    const onVideo = () => {
        if (play) {
            videoRef.current.pause();

            setPlay(false);
            console.log("暂停播放", play);
        }
        else {
            videoRef.current.play();

            setPlay(true);
            console.log(videoRef, play);
        }
    }

    return (
        <Wrapper>

            <div className='video'>
                {/* <Header/> */}

                <video
                    className='video_player'
                    loop
                    onClick={onVideo}
                    ref={videoRef}
                    src={path}
                >
                </video>

                {/* <ReactPlayer url={path} /> */}

                <VideoFooter       //底部介绍组件
                    // user={user}
                    title={title}
                />

                <Video_sidebar     //右侧点赞组件
                    hearts={hearts}
                    comments={comments}
                    collects={collects}
                    share={share}
                    // users={users}
                    id={id}
                    item={item}
                    addLike={addLike}
                    deleteLike={deleteLike}
                    like={like}
                // liked={liked} 
                />

            </div>

        </Wrapper>
    )
}

export default memo(Video)