class AliyunVisionService {
  async processIdPhoto(payload) {
    return this.mockResult('id-photo', payload);
  }

  async layoutIdPhoto(payload) {
    return this.mockResult('id-photo-layout', payload);
  }

  async restoreOldPhoto(payload) {
    return this.mockResult('old-photo-restore', payload);
  }

  async removeWatermark(payload) {
    return this.mockResult('watermark-remove', payload);
  }

  async generateEmoji(payload) {
    return this.mockResult('emoji-generate', payload);
  }

  async mockResult(type) {
    const timestamp = Date.now();
    return {
      resultUrl: `https://dummyimage.com/1080x1080/edf2ff/1e3a8a&text=${type}+${timestamp}`
    };
  }
}

module.exports = new AliyunVisionService();
