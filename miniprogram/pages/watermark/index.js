const { request } = require('../../utils/request');
Page({
  data: { imageUrl: '', regionText: '100,120,220,80' },
  chooseImage() {
    wx.chooseMedia({ count: 1, mediaType: ['image'], success: (res) => this.setData({ imageUrl: res.tempFiles[0].tempFilePath }) });
  },
  onRegionInput(e) { this.setData({ regionText: e.detail.value }); },
  async removeWatermark() {
    const region = this.data.regionText.split(',').map((i) => Number(i.trim()));
    const res = await request({ url: '/image/watermark/remove', method: 'POST', data: { imageUrl: this.data.imageUrl, region } });
    wx.navigateTo({ url: `/pages/result/index?url=${encodeURIComponent(res.resultUrl)}&type=watermark` });
  }
});
