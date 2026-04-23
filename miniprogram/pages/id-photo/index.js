const { request } = require('../../utils/request');

const SIZES = [
  { name: '一寸 25x35mm', widthMm: 25, heightMm: 35 },
  { name: '二寸 35x49mm', widthMm: 35, heightMm: 49 },
  { name: '护照 33x48mm', widthMm: 33, heightMm: 48 },
  { name: '签证 35x45mm', widthMm: 35, heightMm: 45 }
];

Page({
  data: {
    imageUrl: '',
    bgColors: ['blue', 'white', 'red'],
    bgColor: 'blue',
    sizeNames: SIZES.map((i) => i.name),
    sizeName: SIZES[0].name,
    selectedSize: SIZES[0],
    beautyLevel: 40,
    brightness: 10
  },
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: (res) => this.setData({ imageUrl: res.tempFiles[0].tempFilePath })
    });
  },
  onBgChange(e) { this.setData({ bgColor: this.data.bgColors[e.detail.value] }); },
  onSizeChange(e) {
    const selectedSize = SIZES[e.detail.value];
    this.setData({ sizeName: selectedSize.name, selectedSize });
  },
  onBeautyChange(e) { this.setData({ beautyLevel: e.detail.value }); },
  onBrightnessChange(e) { this.setData({ brightness: e.detail.value }); },
  async processIdPhoto() {
    const { imageUrl, bgColor, selectedSize, beautyLevel, brightness } = this.data;
    if (!imageUrl) return wx.showToast({ title: '请先选择照片', icon: 'none' });
    const res = await request({
      url: '/image/id-photo/process',
      method: 'POST',
      data: { imageUrl, bgColor, selectedSize, beautyLevel, brightness }
    });
    wx.navigateTo({ url: `/pages/result/index?url=${encodeURIComponent(res.resultUrl)}&type=idPhoto` });
  },
  async createLayout() {
    const { imageUrl, selectedSize } = this.data;
    if (!imageUrl) return wx.showToast({ title: '请先生成证件照', icon: 'none' });
    const res = await request({
      url: '/image/id-photo/layout',
      method: 'POST',
      data: {
        imageUrl,
        selectedSize,
        paper: '6inch',
        rows: 3,
        cols: 2,
        gapPx: 16,
        scale: 3
      }
    });
    wx.navigateTo({ url: `/pages/result/index?url=${encodeURIComponent(res.resultUrl)}&type=layout` });
  }
});
