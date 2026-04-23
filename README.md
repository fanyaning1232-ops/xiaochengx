# 微信小程序 AI 图片处理工具

基于微信小程序 + Node.js API 服务的 AI 图片处理应用脚手架，包含四大核心模块：

- AI证件照（抠图、换底色、尺寸裁剪、美颜优化、证件照排版）
- 老照片修复（人脸增强、黑白上色）
- 图片去水印（框选区域智能擦除）
- 表情包制作（人脸+模板合成）

并支持：微信一键登录、个人中心、历史记录、高清导出与保存。

## 目录结构

```text
.
├── miniprogram/                # 微信小程序前端
│   ├── app.js
│   ├── app.json
│   ├── app.wxss
│   ├── pages/
│   ├── components/
│   └── utils/
└── server/                     # API 服务（对接阿里云视觉智能开放平台）
    ├── package.json
    ├── config/default.js
    └── src/
```

## 小程序端能力

1. **AI证件照**
   - 拍摄/相册选择
   - 背景替换（蓝/白/红）
   - 一寸、二寸、护照/签证、自定义尺寸
   - 美颜 + 亮度优化
   - 证件照打印排版（5寸/6寸、行列与间距）

2. **老照片修复**
   - 人脸修复增强
   - 黑白照片智能上色

3. **图片去水印**
   - 手动框选区域
   - 智能擦除修补

4. **表情包制作**
   - 上传人脸
   - 选择模板生成趣味图

5. **用户与历史系统**
   - 微信 code 登录
   - 用户资料管理
   - 历史记录查看与重新下载

## 服务端 API

- `POST /api/auth/wechat-login`
- `GET /api/user/profile`
- `PUT /api/user/profile`
- `POST /api/image/id-photo/process`
- `POST /api/image/id-photo/layout`
- `POST /api/image/old-photo/restore`
- `POST /api/image/watermark/remove`
- `POST /api/image/emoji/generate`
- `GET /api/history`
- `GET /api/history/:id`

## 运行方式

### 1) 启动服务端

```bash
cd server
npm install
npm run dev
```

### 2) 启动小程序

1. 使用微信开发者工具导入 `miniprogram` 目录
2. 在 `miniprogram/utils/config.js` 配置后端地址
3. 编译运行

## 阿里云对接说明

示例中通过 `AliyunVisionService` 封装调用入口，真实部署时请替换：

- 认证方式（AccessKey / STS）
- 具体 API 名称与参数
- OSS 文件上传/下载与签名 URL

