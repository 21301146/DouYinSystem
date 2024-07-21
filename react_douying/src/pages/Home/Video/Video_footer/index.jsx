import React, { memo } from 'react'
import './style.css'
import { Image, NoticeBar } from 'antd-mobile'



// function VideoFooter({user,description,song,cd}) {
function VideoFooter({ title }) {
  return (

    <div className='videofooter'>
      <p>{title}</p>
    </div>
  )
}

export default memo(VideoFooter)
