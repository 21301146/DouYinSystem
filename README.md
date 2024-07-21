# DouYinSystem仿抖音简易系统

## 1. 项目介绍
### 1.1 项目背景
简易版抖音是一个短视频分享和浏览平台，面向广大移动互联网用户。作为一个短视频平台，旨在为用户提供一个简单、直观的短视频分享和浏览体验。

### 1.2 项目目标
1. 实现用户的基本互动功能：注册、登录、浏览、点赞、发布视频。

2. 保证系统的可用性和安全性。

3. 提供良好的用户体验。

### 1.3 产品主要功能
1. 注册与登录

2. 视频浏览与推荐
   
3. 视频点赞与取消点赞
   
4. 视频上传与发布
   
5. 用户个人页面管理
   
#### 1.3.1 注册与登录
功能描述：允许新用户创建账户以及现有用户通过用户名和密码登录系统。

用户操作：用户输入必要信息（如用户名、密码等）进行注册；登录时输入用户名和密码。

系统响应：注册后，系统验证信息并创建用户档案；登录成功后，用户被授权进入应用。

#### 1.3.2 视频浏览与推荐
功能描述：展示视频列表，包括根据点赞数目由高到低推荐，并且推荐过的视频不再推荐。

用户操作：用户可以滚动浏览视频列表，点击感兴趣的视频进行观看。

系统响应：根据用户的行为，系统根据点赞数推荐视频，同时保证推荐过的视频内容不再次被推荐。

#### 1.3.3 视频点赞与取消点赞
功能描述：用户可以对喜欢的视频点赞，表达对内容的认可。

用户操作：用户观看视频时，可以点击点赞按钮进行点赞。

系统响应：点赞后，视频的点赞数增加；用户可以再次点击以取消点赞，点赞数相应减少。

#### 1.3.4 视频上传与发布
功能描述：用户可以上传自己的视频内容，并发布到平台上。

用户操作：用户选择视频文件，填写相关描述信息（如标题、标签等），提交发布。

系统响应：视频经过处理（如转码、生成缩略图等）后，存储于服务器，并发布到用户的视频流中。

#### 1.3.5 用户个人页面管理
功能描述：用户可以查看和管理自己的个人资料、视频作品和互动历史。

用户操作：用户进入个人页面，可以查看个人资料、上传的视频、收到的点赞和评论等。

系统响应：提供编辑个人资料、删除视频、查看互动统计等功能。

## 2. 功能需求
### 2.1 用户账户管理
需求ID	需求描述	优先级	验收标准

UR001	用户可以注册新账户	高	账户创建之后，用户可以登录并且使用

UR002	用户可以登录账户	高	提供用户名和密码输入，正确输入后可登录

UR003	用户可以安全退出登录	中	退出后，用户信息不再存储在本地

### 2.2 视频浏览功能
需求ID	需求描述	优先级	验收标准

VF001	用户可以浏览推荐视频列表	高	根据算法推荐视频，用户看过的视频不再推荐，用户可以上下滑动浏览

VF002	用户可以查看视频详情	高	点击视频后，可以查看视频的完整内容

VF003	用户可以对视频进行点赞	高	点赞后，视频的点赞数增加

VF004	用户可以取消对视频的点赞	中	取消点赞后，视频的点赞数减少

### 2.3 视频发布与管理
需求ID	需求描述	优先级	验收标准

VF001	用户可以上传视频 	高	视频上传后，可以在用户页面看到

VF002	用户可以编辑视频信息 	中	可以修改视频的标题、描述等信息

VF003	用户可以删除自己上传的视频	高	删除后，视频不再在用户页面和视频列表中显示

### 2.4 用户界面需求
界面应简洁、直观，易于新用户学习和使用。

应支持响应式设计，兼容不同尺寸的屏幕。

### 2.5 安全性需求
用户密码必须通过加密算法存储。

应用必须实现基本的CSRF防护。

应用必须实现基于角色的访问控制。

## 3. 非功能性需求
### 3.1 性能需求
应用应能在1秒内响应用户的操作请求。

视频加载时间不超过5秒。

### 3.2 可用性需求
应用的系统稳定性需达到99.9%。
### 3.3 兼容性需求
应用需兼容主流的浏览器和操作系统。
