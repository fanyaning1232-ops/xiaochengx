const jwt = require('jsonwebtoken');
const config = require('../../config/default');

function auth(req, res, next) {
  const raw = req.headers.authorization || '';
  const token = raw.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: '未登录' });
  try {
    req.user = jwt.verify(token, config.jwtSecret);
    next();
  } catch (e) {
    res.status(401).json({ message: 'Token 无效' });
  }
}

module.exports = auth;
