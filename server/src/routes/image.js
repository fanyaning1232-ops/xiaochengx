const express = require('express');
const { v4: uuidv4 } = require('uuid');
const aliyunVision = require('../services/aliyunVisionService');
const store = require('../models/store');

const router = express.Router();

function saveHistory(uid, type, typeName, resultUrl, input = {}) {
  store.history.unshift({
    id: uuidv4(),
    uid,
    type,
    typeName,
    input,
    resultUrl,
    createdAt: new Date().toISOString()
  });
}

router.post('/id-photo/process', async (req, res) => {
  const result = await aliyunVision.processIdPhoto(req.body);
  saveHistory(req.user.uid, 'idPhoto', 'AI证件照', result.resultUrl, req.body);
  res.json(result);
});

router.post('/id-photo/layout', async (req, res) => {
  const result = await aliyunVision.layoutIdPhoto(req.body);
  saveHistory(req.user.uid, 'layout', '证件照排版', result.resultUrl, req.body);
  res.json(result);
});

router.post('/old-photo/restore', async (req, res) => {
  const result = await aliyunVision.restoreOldPhoto(req.body);
  saveHistory(req.user.uid, 'restore', '老照片修复', result.resultUrl, req.body);
  res.json(result);
});

router.post('/watermark/remove', async (req, res) => {
  const result = await aliyunVision.removeWatermark(req.body);
  saveHistory(req.user.uid, 'watermark', '图片去水印', result.resultUrl, req.body);
  res.json(result);
});

router.post('/emoji/generate', async (req, res) => {
  const result = await aliyunVision.generateEmoji(req.body);
  saveHistory(req.user.uid, 'emoji', '表情包制作', result.resultUrl, req.body);
  res.json(result);
});

module.exports = router;
