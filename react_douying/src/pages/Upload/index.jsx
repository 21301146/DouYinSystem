import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from 'antd-mobile'
import axios from 'axios';
import { Wrapper } from './style'
import { CSSTransition } from 'react-transition-group'
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Bottom from '../../components/common/Bottom';

const VideoUpload = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    // 处理文件选择
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // 处理文件上传
    const handleUpload = () => {
        if (!file) {
            alert('请选择文件');
            return;
        }

        if (file.type !== 'video/mp4') {
            alert('请选择mp4视频');
            return;
        }

        const formData = new FormData();
        formData.append('video', file);
        formData.append('userId', JSON.parse(localStorage.getItem('user')).userId);
        formData.append('title', Date.parse(new Date()));

        axios({
            method: 'POST',
            url: 'http://localhost:8080/video/publish',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': localStorage.getItem('token'),
            }
        })
            .then(response => {
                if (response.data.code === 500) {
                    Toast.show('发布失败，请稍后重试');
                    return;
                }
                console.log('Upload successful:', response.data);
                Toast.show('发布成功');
                setFile(null);
                navigate("/mine");
            })
            .catch(error => {
                console.error('Upload failed:', error);
                // 处理上传失败的逻辑，例如显示错误消息
                Toast.show('发布失败，请稍后重试');
                return;
            });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="file" onChange={handleFileChange} style={{ margin: '20px', marginBottom: '2rem' }} />
            <button onClick={handleUpload} style={{ position: 'relative', padding: '10px', width: '90%', left: '5%', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>发布</button>
        </div>
    );
};


const UploadComponent = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true)
    }, [])

    return (
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
                <div>
                    <div className="back_picture">
                        <i className='fa fa-angle-left fa-2x' onClick={() => navigate('/home')}> </i>
                        <div className="right">
                            <i className="fa fa-search fa-x" aria-hidden="true"></i>
                            <i className="fa fa-ellipsis-h fa-x" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div>
                        <VideoUpload />
                    </div>
                    <Bottom />
                </div>
            </Wrapper>
        </CSSTransition >
    );
};

export default UploadComponent;
