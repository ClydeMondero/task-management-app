const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const { verifyUser } = require('../middlewares/auth');

router.post('/', verifyUser);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
