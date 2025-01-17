import styled from 'styled-components'

export const Wrapper = styled.div`
.video_header{
    /* position: absolute; */
    width: 100%;
    height:2.6rem;
    /* position: fixed;
    top: 0;
    left: 0; */
    display: flex;
    background-color: black;
     a {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        color:#989898;
        &.active{
            color: white;
        } 
        &.active::after
        {
            content: "";
            /* background-color: rgb(35, 149, 255); */
            background-color: white;
            width:2rem;
            height: 0.03rem;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            color: white;
        } 
        span {
            font-size: 0.9rem;
            font-weight: 600;
        }
        i{
            font-size: 1rem;
            color: white;
            
        }
        .icon-addto{
            font-size: 1.5rem;
            color: white;
        }
}
   
   
}

`