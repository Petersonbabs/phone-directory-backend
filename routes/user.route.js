const router = require("express").Router();
const { signUp } = require("../controllers/user.controller");

router.route('/signup').post(signUp)


module.exports = router
