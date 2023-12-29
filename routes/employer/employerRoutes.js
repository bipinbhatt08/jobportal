const router = require("express").Router();
const { renderJobPostForm, postJob, createEmployerProfile, employerProfile, renderCreateEmployerProfile } = require("../../controller/employer/employerController");
const { isAuthenticated } = require("../../middlewares/isAuthenticated");

const { multer, storage } = require("../../middlewares/multer");
const upload = multer({ storage: storage });

router.route("/employerProfile/:employerId").get(employerProfile)
// Use the isAuthenticated middleware before handling the postJob controller
router.route("/createProfile").post(isAuthenticated,upload.single('profileImage'),createEmployerProfile).get(renderCreateEmployerProfile)
router.route("/jobs").get(isAuthenticated,renderJobPostForm).post(isAuthenticated,postJob)
module.exports = router;
