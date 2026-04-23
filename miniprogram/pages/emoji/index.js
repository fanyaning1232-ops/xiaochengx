const { request } = require('../../utils/request');
Page({
  data: {
    imageUrl: '',
    templates: ['开心鼓掌', '震惊猫猫', '无语凝视', '点赞打工人'],
    selectedTemplate: '开心鼓掌'
  },
  chooseImage() {
    wx.chooseMedia({ count: 1, mediaType: ['image'], success: (res) => this.setData({ imageUrl: res.tempFiles[0].tempFilePath }) });
  },
  onTemplateChange(e) { this.setData({ selectedTemplate: this.data.templates[e.detail.value] }); },
  async generateEmoji() {
    const res = await request({
      url: '/image/emoji/generate',
      method: 'POST',
      data: { imageUrl: this.data.imageUrl, template: this.data.selectedTemplate }
    });
    wx.navigateTo({ url: `/pages/result/index?url=${encodeURIComponent(res.resultUrl)}&type=emoji` });
  }
});
