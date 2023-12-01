const router = require("express").Router();
const { postJob, getMyjob } = require("../../controller/employer/employerController");
const { isAuthenticated } = require("../../middlewares/isAuthenticated");

// Use the isAuthenticated middleware before handling the postJob controller
router.route("/job").post(isAuthenticated, postJob).get(isAuthenticated,getMyjob)

module.exports = router;
