const { renderRegisterForm, register, renderLoginForm, login, renderForgotpassword, checkForgotPassword, renderOtp, handleOtp, renderOtpForm, changePassword, handleChangePassword } = require("../../controller/auth/authController")

const router = require("express").Router()
router.route("/register").get(renderRegisterForm).post(register)
router.route("/login").get(renderLoginForm).post(login)
router.route("/forgotPassword").get(renderForgotpassword).post(checkForgotPassword)
router.route("/otp").get(renderOtpForm).post(handleOtp)
router.route("/changePassword").get(changePassword).post(handleChangePassword)
module.exports = router
