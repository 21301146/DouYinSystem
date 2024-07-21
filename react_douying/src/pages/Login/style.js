import styled from "styled-components";

export const Wrapper = styled.div`
     height: 100%;
transform-origin: right bottom;
    /* position: relative; */
    &.fly-enter,&.fly-appear {
        opacity: 0;
        /* 启用GPU加速 */
        transform: translate3d(100%, 0, 0);
    }
    &.fly-enter-active, &.fly-apply-active {
        opacity: 1;
        transition: all .3s;
        transform: translate3d(0, 0, 0);
    }
    &.fly-exit {
        opacity: 1;
        transform: translate3d(0,0,0)
    }
    &.fly-exit-active {
        opacity: 0;
        transition: all .3s;
        transform: translate3d(100%, 0, 0);
    }
    .login-container {
        width: calc(100vw);
        height: calc(100vh);
        position: fixed;
        // background: linear-gradient(to bottom, rgb(249, 75, 101, .7), rgb(245, 106, 108, .2));
        background:url('https://b.zol-img.com.cn/sjbizhi/images/11/320x510/1592535968690.jpg');
        background-size: cover; 
    }

    i{
        margin-top: 1rem;
        margin-left: 1rem;
        color: black;
        font-size:18px;
    }

    h1 {
        position: relative;
        margin-top: 150px;
        margin-bottom: 100px;
        margin-left: 25px;
    }

    .card {
        width: 80%;
        box-shadow: 0 0 10px rgb(238, 222, 222);
        border: 1px solid #eee
    }

    .input-name,
    .input-pwd {
        margin-left: 20px;
        margin-bottom: 10px;
        display: flex;
    }

    .login-btn,
    .sign-btn {
        width: 85%;
        height: 50px;
        top: 30px;
        left: 5%;
        background-color: #ca1a49;
        color: #fff;
        cursor: pointer;
        margin: 15px;
    }

    .adm-form-item-child-inner {
        display: flex;
        flex-direction: row;
    }

    .eye {
        flex: none;
        position: relative;
        right:0 ;
        padding: 4px;
        cursor: pointer;
    }

`