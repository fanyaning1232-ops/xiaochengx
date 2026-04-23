const express = require('express');
const store = require('../models/store');

const router = express.Router();

router.get('/', (req, res) => {
  const list = store.history.filter((item) => item.uid === req.user.uid);
  res.json({ list });
});

router.get('/:id', (req, res) => {
  const item = store.history.find((i) => i.id === req.params.id && i.uid === req.user.uid);
  if (!item) return res.status(404).json({ message: '记录不存在' });
  res.json(item);
});

module.exports = router;
