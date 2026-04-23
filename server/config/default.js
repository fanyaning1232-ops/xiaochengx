module.exports = {
  port: 3000,
  jwtSecret: 'replace-with-strong-secret',
  aliyun: {
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID || '',
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET || '',
    endpoint: process.env.ALIYUN_VISION_ENDPOINT || 'imagerecog.cn-shanghai.aliyuncs.com'
  }
};
