const router = require("express").Router();
const { signUp, login, logout } = require("../controllers/user.controller");

router.route('/signup').post(signUp)
router.route('/login').post(login)
router.route('/logout').post(logout)


module.exports = router
