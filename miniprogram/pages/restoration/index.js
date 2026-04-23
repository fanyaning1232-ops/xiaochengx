const { request } = require('../../utils/request');
Page({
  data: { imageUrl: '', options: ['faceEnhance', 'colorize'] },
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => this.setData({ imageUrl: res.tempFiles[0].tempFilePath })
    });
  },
  onOptionChange(e) { this.setData({ options: e.detail.value }); },
  async process() {
    const { imageUrl, options } = this.data;
    const res = await request({ url: '/image/old-photo/restore', method: 'POST', data: { imageUrl, options } });
    wx.navigateTo({ url: `/pages/result/index?url=${encodeURIComponent(res.resultUrl)}&type=restore` });
  }
});
