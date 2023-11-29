const { renderRegisterForm, register, renderLoginForm, login } = require("../../controller/auth/authController")

const router = require("express").Router()
router.route("/register").get(renderRegisterForm).post(register)
router.route("/login").get(renderLoginForm).post(login)
module.exports = router
