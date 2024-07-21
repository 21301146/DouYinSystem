import React, { useState, useEffect } from "react";
import { Form, Input, Button, Toast, Card } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AutoCenter } from "antd-mobile";
import { Wrapper } from './style'
import { CSSTransition } from 'react-transition-group'

const Login = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setShow(true)
    }, [])

    const handleLogin = () => {
        if (!username || !password) {
            Toast.show("用户名或密码为空");
            return;
        }

        const user = {
            username: username,
            password: password,
            role: '1'
        };

        axios({
            method: 'POST',
            url: 'http://localhost:8080/index/login',
            data: user,
            headers: {
                'Content-Type': 'application/json', // 声明请求体是 JSON 格式
            }
        })
            .then(response => {
                console.log(response);
                if (response.data.code === 200) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('user', JSON.stringify(response.data.data.user));
                    localStorage.setItem('token', response.data.data.token);
                    Toast.show("登录成功");
                    navigate("/home");
                }

            })
            .catch(error => {
                Toast.show('登录失败，请稍后重试');
            });
    };

    const handleSign = () => {
        Toast.show('跳转到注册界面');
        navigate("/sign");
    };

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
                <div className="login-container">
                    <i className='fa fa-angle-left fa-2x' onClick={() => navigate(-1)}>返回 </i>
                    <AutoCenter style={{ marginTop: "150px", fontSize: "60px", fontFamily: "隶书" }}>
                        欢迎回来
                    </AutoCenter>

                    <Card className="card" style={{ margin: "45px" }}>
                        <Form requiredMarkStyle="asterisk">
                            <div className="input-name">
                                <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                                    <Input
                                        type="text"
                                        placeholder="请输入姓名"
                                        value={username}
                                        onChange={(value) => setUsername(value)}
                                    />
                                </Form.Item>
                            </div>
                            <div className="input-pwd">
                                <Form.Item name="password" label="密码">
                                    {/* <Input type='password' placeholder='8-18位不含特殊字符的数字、字母组合' value={password} onChange={(value) => setPassword(value)} /> */}
                                    <Input
                                        placeholder="8-18位不含特殊字符的数字、字母组合"
                                        type={visible ? "text" : "password"}
                                        value={password}
                                        onChange={(value) => setPassword(value)}
                                    />
                                    <div className="eye">
                                        {!visible ? (
                                            <EyeInvisibleOutline onClick={() => setVisible(true)} />
                                        ) : (
                                            <EyeOutline onClick={() => setVisible(false)} />
                                        )}
                                    </div>
                                </Form.Item>
                            </div>
                        </Form>
                    </Card>
                    <Button shape="rounded" onClick={handleLogin} className="login-btn">
                        登录
                    </Button>
                    <Button shape="rounded" onClick={handleSign} className="sign-btn">
                        暂无账号？去注册
                    </Button>
                </div>
            </Wrapper>
        </CSSTransition>
    );
};

export default Login;
