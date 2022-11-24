const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

router.get('/users', userController.users)

router.post('/singup', userController.singup)

router.post('/singin', userController.singin)
router.post('/otpverify', userController.otpverify)
router.post('/logout', userController.logout)




// router.post('/email-send', userController.emailSend)
// router.post('/change-password', userController.changePassword)


module.exports = router;