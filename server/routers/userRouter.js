const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  delateUser,
  refreshToken,
  logoutUser,
} = require('../controllers/userController');
const authentication = require('../middleware/authentication');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refreshToken', refreshToken);

router.delete('/logout', authentication, logoutUser);
router.get('/', authentication, getAllUser);
router.get('/:userId', getUserById);
router.put('/:userId', authentication, updateUser);
router.delete('/:userId', delateUser);

module.exports = router;
