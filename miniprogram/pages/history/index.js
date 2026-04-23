const { request } = require('../../utils/request');
Page({
  data: { list: [] },
  async onShow() {
    const data = await request({ url: '/history' });
    this.setData({ list: data.list || [] });
  },
  toDetail(e) {
    const { url, type } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/result/index?url=${encodeURIComponent(url)}&type=${type}` });
  }
});
