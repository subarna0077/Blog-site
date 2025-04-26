const jwt = require('jsonwebtoken');
require('dotenv').config();
const { UnauthenticatedError } = require('../errors');

const AuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Could not authenticate this account');
  }

  const token = authHeader.split(' ')[1];
  console.log(token)

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};

module.exports = AuthMiddleware;
