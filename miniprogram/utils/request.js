const { BASE_URL } = require('./config');

function request({ url, method = 'GET', data = {} }) {
  const app = getApp();
  const token = app.globalData.token || '';
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        Authorization: token ? `Bearer ${token}` : ''
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
          return;
        }
        reject(res.data || { message: '请求失败' });
      },
      fail: reject
    });
  });
}

module.exports = { request };
