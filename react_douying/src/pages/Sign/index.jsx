import React, { useState, useEffect } from "react";
import { Form, Input, Button, Toast, Card } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AutoCenter } from "antd-mobile";
import { Wrapper } from './style'
import { CSSTransition } from 'react-transition-group'

const Sign = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_copy, setPasswordCopy] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setShow(true)
    }, [])

    const handleLogin = () => {
        if (!username || !password || !password_copy) {
            Toast.show("用户名或密码为空");
            return;
        }

        if (password !== password_copy) {
            Toast.show("前后输入密码不一致");
            return;
        }

        const user = {
            username: username,
            password: password,
            role: '1'
        };

        axios({
            method: 'POST',
            url: 'http://localhost:8080/index/register',
            data: user
        })
            .then(response => {
                console.log(response);
                if (response.data.code === 200) {
                    Toast.show('注册成功');
                    // 跳转到登陆页面
                    navigate("/login");
                } else {
                    Toast.show('该用户已被注册');
                }
            })
            .catch(error => {
                Toast.show('注册失败，请稍后重试');
            });


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
                    <i className='fa fa-angle-left fa-2x' onClick={() => navigate(-1)}>返回</i>
                    <AutoCenter style={{ marginTop: "150px", fontSize: "60px", fontFamily: "隶书" }}>
                        欢迎使用
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
                            <div className="input-pwd">
                                <Form.Item name="password" label="确认密码">
                                    {/* <Input type='password' placeholder='8-18位不含特殊字符的数字、字母组合' value={password} onChange={(value) => setPassword(value)} /> */}
                                    <Input
                                        placeholder="再次输入密码"
                                        type={visible ? "text" : "password"}
                                        value={password_copy}
                                        onChange={(value) => setPasswordCopy(value)}
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
                        注册
                    </Button>
                </div>
            </Wrapper>
        </CSSTransition>
    );
};

export default Sign;
