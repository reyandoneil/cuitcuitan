const { sign, verify } = require('jsonwebtoken');
const SECRET = process.env.SECRET_TOKEN;
const REFRESH_SECRET = process.env.SECRET_REFRESH_TOKEN;

const signToken = (payload) => {
  const access_token = sign(payload, SECRET, {
    expiresIn: '30s',
  });
  return access_token;
};

const refreshToken = (payload) => {
  const access_token = sign(payload, REFRESH_SECRET, {
    expiresIn: '1d',
  });
  return access_token;
};

const verifyToken = (access_token) => {
  const verifyToken = verify(access_token, SECRET);
  console.log(verifyToken);
  return verifyToken;
};

module.exports = {
  signToken,
  verifyToken,
  refreshToken,
};
