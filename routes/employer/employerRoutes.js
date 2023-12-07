const router = require("express").Router();
const { isAuthenticated } = require("../../middlewares/isAuthenticated");

// Use the isAuthenticated middleware before handling the postJob controller
router.route("/job").get(isAuthenticated)

module.exports = router;
