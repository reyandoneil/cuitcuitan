const { User } = require('../models');
const { hasPassword, comparePassword } = require('../helper/bcrypt');
const {
  signToken,
  refreshToken,
  verifyToken,
} = require('../helper/jwt');

class UserController {
  static async registerUser(req, res) {
    try {
      const { user_name, role, email, password } = req.body;
      const findEmail = await User.findOne({
        where: {
          email: email,
        },
      });
      if (findEmail === null) {
        const userData = {
          userName: user_name,
          role: role,
          email: email,
          password: hasPassword(password),
          isEmailVerify: false,
        };
        const createUser = await User.create(userData);
        return res.status(201).json(createUser);
      } else {
        return res.status(400).json({ msg: 'User already exist' });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const findEmail = await User.findOne({
        where: {
          email: email,
        },
      });
      if (findEmail !== null) {
        const comparePass = comparePassword(
          password,
          findEmail.password
        );
        if (comparePass) {
          const dataToken = {
            id: findEmail.id,
            userName: findEmail.userName,
            email: findEmail.email,
          };
          const access_token = signToken(dataToken);
          const refresh_token = refreshToken(dataToken);
          await User.update(
            { refreshToken: refresh_token },
            {
              where: {
                email: findEmail.email,
              },
            }
          );
          res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });

          res.status(201).json({ access_token });
        } else {
          res.status(400).json({ msg: 'Wrong user or password' });
        }
      } else {
        res.status(400).json({ msg: 'Wrong user or password' });
      }
    } catch (error) {}
  }
  static async getAllUser(req, res) {
    try {
      const findAllUser = await User.findAll({
        attributes: {
          exclude: ['password', 'refreshToken'],
        },
      });
      return res.status(200).json(findAllUser);
    } catch (error) {
      console.log(error);
    }
  }
  static async saveProfilePicture(req, res) {
    if (req.file === null)
      return res.status(400).json({ msg: 'No file uploaded' });
  }
  static async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(401);
      const user = await User.findOne({
        where: {
          refreshToken: refreshToken,
        },
      });
      if (!user) return res.status(403);

      const dataToken = {
        id: user.id,
        userName: user.userName,
        email: user.email,
      };
      const accessToken = signToken(dataToken);
      res.json({ accessToken });
    } catch (error) {
      console.log(error);
    }
  }
  static async logoutUser(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(401);
      const user = await User.findOne({
        where: {
          refreshToken: refreshToken,
        },
      });
      if (!user) return res.status(403);
      console.log(user);
      const idUser = user.id;
      const clearToken = User.update(
        { refreshToken: null },
        {
          where: {
            id: idUser,
          },
        }
      );
      return res.status(200).json({ clearToken });
    } catch (error) {
      console.log(error);
    }
  }
  static async getUserById(req, res) {}
  static async updateUser(req, res) {
    try {
      const email = req.userData.email;
      console.log(email, 'update user');
      const findUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!findUser) return res.status(403);
      console.log(findUser);
    } catch (error) {
      console.log(error);
    }
  }
  static async delateUser(req, res) {}
}

module.exports = UserController;
