### 1 命令

```sh
# 安装所有依赖包，必须先执行的步骤
npm install

# 启动本地开发服务器，默认在 localhost:6060
npm run dev

# 项目打包
npm run build


### 2 路由配置
在对应路径src/pages 下添加相关页面，添加完成后需要在 routes/index.jsx 下添加对应路由和页面的配置项
```js
const RoutesConfig = () => (
    <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/mine' element={<Mine />}></Route>
        <Route path='/userdetail/:id' element={<UserDetail />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign' element={<Sign />}></Route>
        <Route path='/upload' element={<UploadComponent />}></Route>
    </Routes>
)
```


### 3 文档结构
生成项目目录结构，展开3层结构，并忽略node_modules文件夹
```sh
tree -L 3 -I "node_modules" > tree.md
```

```plaintext
react_douying
├── README.md // 项目文档和说明
├── package.json  // 项目依赖和脚本配置
├── public // 公共文件
    |——index.js //响应式字体大小
├── src  // 源代码
│   ├── App.css  // 根组件样式
│   ├── App.jsx   // 根组件
│   ├──logo.svg // 应用程序logo图像
|   |—— api // 接口相关配置，但没用上
|   |—— assets // 资源
|   |   |—— font // 图标
|   |   |—— image // 图片
|   |   |—— styles // 全局样式
|   |   |—— video // 视频资源
│   ├── components   // 组件目录
│   │   ├── common // 全局组件
|   |   |   |—— Bottom // 底部导航栏
|   |   |   |—— loading // 等待加载样式
│   │   ├── Home_header // 首页的顶部栏
│   ├── index.css  // 全局样式
│   ├── index.js   // 入口文件
|   |—— pages
│   │   ├── Home // 首页
|   │   │  ├─Video // 视频页面
|   |   │  |   ├─Video_footer // 视频页面底部栏
|   |   │  |   ├─Video——sidebar  //视频页面侧边栏
|   │   │  ├─index.jsx // 首页主页面
|   │   │  ├─style.css // 首页样式 
|   │   ├─Login // 登录页面
|   │      ├─index.jsx
|   │      ├─style.js   
|   │   ├─Mine // 个人资料页面
|   │      ├─index.jsx
|   │      ├─style.js
|   │   ├─Sign // 注册页面
|   │      ├─index.jsx
|   │      ├─style.js  
|   │   ├─Upload // 上传视频页面
|   │      ├─index.jsx
|   │      ├─style.js  
│   ├── store // 全局存储
│   └── routes // 路由配置
│       └── routes.js // 路由配置
└── tree.md
```

### 4 功能实现情况

#### 4.1 登录注册登出
（1）用户已有用户名密码，可以登录
（2）用户未有用户名密码，可以注册
（3）用户退出登录

#### 4.2 视频推荐主页
（1）推荐视频：按照点赞数最高推荐
（2）视频上下滑动（查看上一个视频、查看下一个视频）
（3）视频点赞功能

#### 4.3 我的视频管理
（1）发布视频
（2）查看我的视频

### 项目运行启动方式
（1）在项目根目录下打开命令行工具执行以下命令
（2）安装项目所需的依赖:npm install
（3）启动项目：npm run dev
（4）默认打开"http://1ocalhost:6060"加载应用