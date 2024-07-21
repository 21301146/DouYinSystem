import React, { useState, useEffect, memo } from 'react'
import Bottom from '../../components/common/Bottom'
import { Wrapper } from './style'
import { Image, Tabs, Empty, Toast, Button, Modal } from 'antd-mobile'
import { CSSTransition } from 'react-transition-group'
import { useNavigate, Link } from 'react-router-dom';
import { ShowplayerWrapper } from '../../components/DetailvideoNav/style'
import { PictureOutline, CloseOutline } from 'antd-mobile-icons'
import { connect } from 'react-redux'
import axios from 'axios'

function Mine(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [more, setmore] = useState(false);
  const [zuopin, setZuopin] = useState([]);
  const { mylikeLists } = props
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  // 判断该用户是否已登录
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  console.log("点赞视频列表", mylikeLists);

  const handleLogin = () => {
    Toast.show('跳转到登录界面');
    navigate("/login");
  };

  const handleDelete = (videoId) => {
    // 发送 DELETE 请求到服务器
    axios.delete(`http://localhost:8080/video/delete/${videoId}`, {
      headers: {
        'token': localStorage.getItem('token')
      },
      params: {
        userId: JSON.parse(localStorage.getItem('user'))['userId'] // 将 userId 作为查询参数发送
      }
    })
      .then(response => {
        console.log(response);
        if (response.data.code === 404) {
          Toast.show('视频不存在，请刷新重试');
        }

      })
      .catch(error => {
        console.error('发生错误:', error);
      });
  };

  useEffect(() => {
    setShow(true)
    // 初始化加载数据
    if (isLoggedIn) fetchData();
    if (mylikeLists.length > 0) {
      setmore(true)
    }
  }, []);

  // 请求作品数据的函数
  const fetchData = () => {
    setLoading(true);
    axios.get("http://localhost:8080/video/list", {
      params: {
        userId: JSON.parse(localStorage.getItem('user')).userId,
        pageNo: pageNo,
        pageSize: 3
      },
      headers: {
        'token': localStorage.getItem('token'),
      }
    })
      .then((response) => {
        const newData = response.data.data.data;
        console.log(newData);
        console.log("发布作品");
        // setZuopin(prevData => [...prevData, ...newData]); // 将新数据合并到之前的数据中
        setZuopin(prevData => prevData.concat(newData));
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching videos:", error);
        setLoading(false);
      });
  };

  // 监听滚动事件，处理上拉加载更多
  const handleScroll = () => {
    if (loading) return; // 如果正在加载，则直接返回

    // 计算页面底部距离顶部的距离
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    // 在距离底部还有一定距离时开始加载
    if (scrollHeight - (scrollTop + clientHeight) > 200) {
      console.log(pageNo + 1);
      setPageNo(prevPageNo => prevPageNo + 1); // 增加页数
    }
  };


  // 添加滚动事件监听
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <CSSTransition
      in={show}
      timeout={300} q
      appear={true}
      classNames="fly"
      unmountOnExit
      onExit={() => {
        navigate(-1)
      }}
    >
      <Wrapper>
        {isLoggedIn ? (
          <div >
            <div className="back_picture">
              <i className='fa fa-angle-left fa-2x' onClick={() => navigate('/home')}> </i>
              <div className="right">
                <i className="fa fa-search fa-x" aria-hidden="true"></i>
                <i className="fa fa-ellipsis-h fa-x" aria-hidden="true" onClick={async () => {
                  const result = await Modal.confirm({
                    content: '退出登录',
                  })
                  if (result) {
                    Toast.show({ content: '确定', position: 'bottom' })
                    localStorage.clear();
                    // 刷新页面
                    location.reload();
                    axios.get('http://localhost:8080/index/logout')
                      .then((response) => { })
                      .catch((error) => console.error("Error fetching customers:", error));
                  } else {
                    Toast.show({ content: '取消', position: 'bottom' })
                  }
                }}></i>
              </div>
            </div>
            <div className='detail_header'>
              <div className="topbar">
                <div className="topbar_information">
                  <Image src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202105%2F29%2F20210529001057_aSeLB.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660034061&t=7ad0677f4e19db2c0128d3d940da92fc"
                    width={88}
                    height={88}
                    fill="cover"
                    className='picture'
                    style={{ borderRadius: 88 }}>

                  </Image>
                </div>
                <div className="topbar_information">
                  <p>获赞</p>
                  <p className='number'>66</p>
                </div>
                <div className="topbar_information">
                  <p>关注</p>
                  <p className='number'>66</p>
                </div>
                <div className="topbar_information">
                  <p>粉丝</p>
                  <p className='number'>66</p>
                </div>
              </div>
              <div className="username">
                <h2>{JSON.parse(localStorage.getItem('user'))['username']}</h2>
                <p><strong>抖音号: lt_9898898</strong></p>
              </div>
            </div>
            <div className="detail_container" >
              <p className='description'>记录生活！</p>
              <p>IP属地: 江西</p>
              <div className="guanzhu">
                <button className='edit_data' >编辑资料 </button>
                <button className='addfriend' >添加朋友</button>
              </div>
            </div>
            <ShowplayerWrapper>
              <Tabs activeLineMode="fixed"
                style={{
                  color: "#78777d",
                  "--active-title-color": "#171723",
                  "--fixed-active-line-width": "33.333%",
                  "--active-line-color": "#171723",
                  "--content-padding": "0"
                }} >
                <Tabs.Tab title="作品" key='photo'>
                  {zuopin.length > 0 ?
                    <div className='playshow'>
                      {
                        zuopin.map((item) => {
                          // {setCount(4)}
                          return (
                            <div className="play" key={item.videoId} style={{ position: 'relative' }}>
                              {/* 视频或图片内容 */}
                              {/* <img src={item.coverUrl} alt="" width={137} height={176} /> */}

                              {/* 关闭图标 */}
                              <CloseOutline style={{ position: 'absolute', top: 5, right: 5, zIndex: 1, fontSize: 20 }} onClick={() => handleDelete(item.videoId)} />

                              {/* 喜爱图标及数量 */}
                              <i className='iconfont icon-aixin'>{item.favouriteCount}</i>
                            </div>

                          )
                        })
                      }
                    </div>
                    :
                    <div className="photo">
                      <div className="circle">
                        <PictureOutline fontSize={36} />
                      </div>
                      <h3>发一下你最近的动态吧</h3>
                    </div>
                  }

                </Tabs.Tab>
                <Tabs.Tab title='收藏' key='collect'>
                  <div className="shoucangempty">
                    <Empty
                      imageStyle={{ width: 150 }}
                      description="还没有收藏视频" />
                  </div>
                </Tabs.Tab>
                <Tabs.Tab title='喜欢' key='like'>
                  <div className='playshow'>
                    {
                      mylikeLists.map((item) => {
                        // {setCount(4)}
                        return (
                          <div className="play" key={item.viedoId} >
                            {/* <Link to={`/player/${item.id}`}>
                              <video src={item.playUrl}></video>
                            </Link> */}
                            <img src={item.coverUrl} alt="" width={137} height={176} />
                            <i className='iconfont icon-aixin1'>{item.favouriteCount}</i>
                          </div>
                        )
                      })
                    }

                  </div>
                  {
                    more ? <p>暂时没有更多了</p>
                      : <div style={{ "marginTop": "10%" }}>
                        <Empty
                          imageStyle={{ width: 150 }}
                          description="还没有点赞视频" />
                        {/* <p>还没有点赞视频</p> */}
                      </div>
                  }

                </Tabs.Tab>
              </Tabs>
            </ShowplayerWrapper>


            <Bottom />
          </div>
        ) : (
          <div className='hhhhh'>
            <i className='fa fa-angle-left fa-2x' onClick={() => navigate(-1)}>返回</i>
            <p>您尚未登录</p>
            <Button shape="rounded" onClick={handleLogin} className="login-btn">
              去登录
            </Button>
          </div>
        )}
      </Wrapper>
    </CSSTransition >


  )
}

const mapStateToProps = (state) => {
  return {
    videosList: state.videos.videosList,
    mylikeLists: state.mylike.mylikeLists,
    like: state.mylike.like
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // getVideosListDispatch() {
//     //   dispatch(getMylikeList())
//     // }

//   }
// }

export default connect(mapStateToProps,
  //  mapDispatchToProps
)(memo(Mine))