const { wechatLogin } = require('../../utils/login');
const { request } = require('../../utils/request');

Page({
  data: { userInfo: null },
  onShow() {
    this.setData({ userInfo: getApp().globalData.userInfo });
  },
  async login() {
    const data = await wechatLogin();
    this.setData({ userInfo: data.user });
    wx.showToast({ title: '登录成功' });
  },
  async editProfile() {
    const profile = this.data.userInfo || {};
    const updated = { ...profile, nickname: `${profile.nickname || '用户'}_新` };
    await request({ url: '/user/profile', method: 'PUT', data: updated });
    getApp().globalData.userInfo = updated;
    wx.setStorageSync('userInfo', updated);
    this.setData({ userInfo: updated });
  }
});
