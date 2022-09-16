const { verifyToken } = require('../helper/jwt');
const { User } = require('../models');

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      return res.status(403).json({ msg: 'login needed' });
    } else {
      let decode;
      decode = verifyToken(access_token);
      console.log(decode, 'decode');
      const findEmail = await User.findOne({
        where: {
          email: decode.email,
        },
      });
      if (!findEmail) {
        res.status(404).json({ msg: 'User not found' });
      } else {
        req.userData = decode;
        next();
      }
    }
  } catch (error) {
    return res.status(403).json({ msg: 'Invalid token' });
  }
};

module.exports = authentication;
