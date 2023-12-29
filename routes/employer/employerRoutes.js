const router = require("express").Router();
const { renderJobPostForm, postJob } = require("../../controller/employer/employerController");
const { isAuthenticated } = require("../../middlewares/isAuthenticated");

// Use the isAuthenticated middleware before handling the postJob controller
// router.route("/jobs").get(isAuthenticated,renderJobPostForm).post(isAuthenticated,postJob)
// module.exports = router;
