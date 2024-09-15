const express = require('express');

const UserControllers = require('../controllers/userController');

const router = express.Router()

router.route('/')
    .get(UserControllers.login)
    .post(UserControllers.signUp)

router.route('/logout')
    .get(UserControllers.logout)

module.exports = router