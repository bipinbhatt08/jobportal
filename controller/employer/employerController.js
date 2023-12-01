const { users, jobs } = require("../../model")

exports.postJob =  async(req,res)=>{
    const userId = req.user.id
    // console.log(userId)
    const {jobTitle,jobDescription,salary,gender,requiredExperienceYr,requiredQualification,deadLine,category,jobLevel} = req.body
    console.log(deadLine)
    const userExist = await users.findAll({where:{id:userId}})
    // console.log("ID:", userId);
    if(userExist.length==0){
        res.send("No user exist")
    }
    await jobs.create({
        jobTitle,jobDescription,salary,gender,requiredExperienceYr,requiredQualification,deadLine,category,jobLevel,
        postedBy: userId
    })
    res.send("Created Succesfullly..")
}

exports.getMyjob = async(req,res)=>{
    const userId = req.user.id
    const myJobs = await jobs.findAll({
        where:{
            postedBy:userId
        }
    })
    if(myJobs.length==0){
       return res.send("No jobs")
    }
    res.send(myJobs)

}