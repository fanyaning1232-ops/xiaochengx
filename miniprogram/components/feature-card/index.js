Component({
  properties: {
    icon: String,
    name: String,
    desc: String,
    path: String
  },
  methods: {
    onTap() {
      wx.navigateTo({ url: this.data.path });
    }
  }
});
