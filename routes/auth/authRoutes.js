const { renderRegisterForm, register, renderLoginForm, login, renderForgotpassword } = require("../../controller/auth/authController")

const router = require("express").Router()
router.route("/register").get(renderRegisterForm).post(register)
router.route("/login").get(renderLoginForm).post(login)
router.route("/forgotPassword").get(renderForgotpassword)
module.exports = router
