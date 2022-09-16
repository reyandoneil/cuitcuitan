const router = require('express').Router();
const UserRouter = require('./userRouter');

router.use('/user', UserRouter);

module.exports = router;
