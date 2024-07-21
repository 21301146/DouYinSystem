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
    .back_picture{
        position: relative;
        background-color: black;
        height: 3rem;
        i{
            margin-top: 1rem;
            margin-left: 1rem;
            color: #dfdfdf;
        }
        .right{
            position: absolute;
            top:0.4rem ;
            right: 0.5rem;
            i{
                margin-right: 0.5rem;
            }
        }
       
    }
    .playshow{
        display:flex;
        flex-wrap:wrap;
        // margin-top:0.5rem;
        .play{
            width:33.3%;
            height:10rem;
            border:1px solid black;
            // align-items:right;
            .upload-icon{
                position:absolute;
                margin:0.5rem;
                z-index:999;
                // right:0;
            }
        }
    }

    .hhhhh{
        i{
            margin-top: 1rem;
            margin-left: 1rem;
            color: #dfdfdf;
            font-size:18px;
        }
        p{
            font-size:24px;
            margin-top:12rem;
            margin-left:36%;
        }
        .login-btn {
            width: 85%;
            height: 50px;
            top: 30px;
            left: 5%;
            background-color: #ca1a49;
            color: #fff;
            cursor: pointer;
            margin: 15px;
        }
    }

`