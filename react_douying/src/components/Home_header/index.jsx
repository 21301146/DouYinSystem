import React from 'react'
import { NavLink, useLocation } from "react-router-dom"
import classnames from "classnames"
import { Wrapper } from './style'
import { useEffect } from 'react';
import { Toast } from 'antd-mobile'

export default function Header() {
  const pathname = useLocation();

  return (
    <Wrapper>
      <div className='video_header'>
        <a><span onClick={() => Toast.show("正在开发中，敬请期待")}><i className='iconfont icon-addto ' ></i></span></a>

        <a><span onClick={() => Toast.show("正在开发中，敬请期待")}>同城</span></a>

        <a><span onClick={() => Toast.show("正在开发中，敬请期待")}>关注</span></a>

        <a><span onClick={() => Toast.show("正在开发中，敬请期待")}>商城</span></a>

        <NavLink to="/" className={classnames({ active: pathname == "/home" || pathname == "/" })}>
          <span>推荐</span>
        </NavLink>

        <a><span onClick={() => Toast.show("正在开发中，敬请期待")}><i className='iconfont icon-31sousuo'></i></span></a>
      </div>
    </Wrapper>
  )
}
