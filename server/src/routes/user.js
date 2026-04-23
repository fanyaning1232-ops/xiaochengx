const express = require('express');
const store = require('../models/store');

const router = express.Router();

router.get('/profile', (req, res) => {
  const user = store.users.get(req.user.uid);
  res.json(user || null);
});

router.put('/profile', (req, res) => {
  const user = store.users.get(req.user.uid);
  if (!user) return res.status(404).json({ message: '用户不存在' });
  const next = { ...user, ...req.body };
  store.users.set(req.user.uid, next);
  res.json(next);
});

module.exports = router;
