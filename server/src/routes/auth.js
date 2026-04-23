const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const config = require('../../config/default');
const store = require('../models/store');

const router = express.Router();

router.post('/wechat-login', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ message: '缺少微信登录 code' });

  const openid = `wx_${code.slice(0, 8)}_${Date.now()}`;
  const user = {
    id: uuidv4(),
    openid,
    nickname: `微信用户${Math.floor(Math.random() * 9000 + 1000)}`,
    avatar: '',
    mobile: ''
  };

  store.users.set(user.id, user);
  const token = jwt.sign({ uid: user.id, openid }, config.jwtSecret, { expiresIn: '30d' });
  res.json({ token, user });
});

module.exports = router;
