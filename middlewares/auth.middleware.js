
const jwt = require('jsonwebtoken');
const { jwtCredentials } = require('../config/env');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' ,success: false});
  }
  
  try {
    const decoded = jwt.verify(token, jwtCredentials.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Invalid token.',success: false});
  }
};

module.exports = verifyToken;

