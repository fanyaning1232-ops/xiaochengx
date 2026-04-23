const { request } = require('./request');

async function wechatLogin() {
  const loginRes = await new Promise((resolve, reject) => {
    wx.login({ success: resolve, fail: reject });
  });
  const data = await request({
    url: '/auth/wechat-login',
    method: 'POST',
    data: { code: loginRes.code }
  });
  const app = getApp();
  app.globalData.token = data.token;
  app.globalData.userInfo = data.user;
  wx.setStorageSync('token', data.token);
  wx.setStorageSync('userInfo', data.user);
  return data;
}

module.exports = { wechatLogin };
