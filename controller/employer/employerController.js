const { users, jobs } = require("../../model")
exports.renderJobPostForm = (req,res)=>{
    res.render("jobPostForm")
}
// exports.postJob = async(req,res)=>{
//     const employerId = req.user.id
//     const {jobTitle,jobDescription, salary, jobLevel,gender,requiredExperienceYr,requiredQualification,requiredSkills,deadLine,workLocation,jobTime}=req.body
//     const userExist = await users.findAll({
//         where:{
//             id:employerId,
//             role:"candidate"
//         }
//     })
//     if(userExist.length===0){
//         return res.send("No user exist or you don't have authority to post job")
//     }
    
//     await jobs.create({
//         jobTitle,
//         jobDescription,
//         salary,
//         jobLevel,
//         gender,
//         requiredExperienceYr,
//         requiredQualification,
//         deadLine,
//         workLocation,
//         requiredSkills,
//         jobTime
//     })
//     return res.send("Job posted succesfully!")

// }