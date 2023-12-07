const { renderCandidateProfile } = require("../../controller/candidate/candidateController")

const router = require("express").Router()

router.route("/candidateProfile").get(renderCandidateProfile)
module.exports = router
