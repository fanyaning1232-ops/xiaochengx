Page({
  data: {
    url: '',
    type: '',
    resolutions: ['标清', '高清', '超清'],
    resolution: '高清'
  },
  onLoad(query) {
    this.setData({ url: decodeURIComponent(query.url || ''), type: query.type || '' });
  },
  onResChange(e) { this.setData({ resolution: this.data.resolutions[e.detail.value] }); },
  saveToAlbum() {
    wx.showToast({ title: `已按${this.data.resolution}保存(示例)`, icon: 'none' });
  }
});
