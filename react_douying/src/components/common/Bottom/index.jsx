import React from 'react'
import { NavLink, useLocation } from "react-router-dom"
import { Wrapper } from "./style.js"
import classnames from "classnames"
import { Toast } from 'antd-mobile'

export default function Bottom() {
  const pathname = useLocation();
  return (
    <Wrapper>
      <div className='video_bottom'>

        {/* <NavLink to="/" className={classnames({ active: pathname == "/home" || pathname == "/" })}>
          <span>首页</span>
        </NavLink> */}
        <NavLink to="/home" className={classnames({ active: pathname == "/home" })}>
          <span>首页</span>
        </NavLink>

        <a><span onClick={() => Toast.show("正在开发中，敬请期待")}>朋友</span></a>

        {/* <a><span onClick={() => Toast.show("跳转到上传视频界面")}><i className='fa fa-plus'></i></span></a> */}
        <NavLink to="/upload" className={classnames({ active: pathname == "/upload" })}>
          <i className='fa fa-plus'></i>
        </NavLink>

        <a><span onClick={() => Toast.show("正在开发中，敬请期待")}>消息</span></a>

        <NavLink to="/mine" className={classnames({ active: pathname == "/mine" })}>
          <span>我</span>
        </NavLink>

      </div>
    </Wrapper>
  )
}
