const { renderCandidateProfile, renderCreateProfile, createCandidateProfile, applyJob } = require("../../controller/candidate/candidateController")
const { isAuthenticated } = require("../../middlewares/isAuthenticated");

const router = require("express").Router()
const { multer, storage } = require("../../middlewares/multer");
const upload = multer({ storage: storage });
router.route("/candidateProfile/:id").get(renderCandidateProfile)
router.route("/createCandidateProfile").get(renderCreateProfile).post(
    isAuthenticated,
    upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'profile', maxCount: 1 }
]),
createCandidateProfile)


router.route("/apply/:jobId").get(isAuthenticated,applyJob)
module.exports = router
