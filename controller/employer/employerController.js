const { users, jobs, employers } = require("../../model")
exports.renderJobPostForm = (req,res)=>{
    res.render("jobPostForm")
}



exports.renderCreateEmployerProfile = async (req,res)=>{
    res.render("createEmployerProfileForm" )
}
exports.createEmployerProfile = async(req,res)=>{
    const {id} = req.user
    console.log(id)
    const {name,location,employerCategory,contactNo,website,about} = req.body
    const userExists = employers.findAll({
        where:{
            userId:id
        }
    })
    if(userExists.length===0){
        return res.send("User Does not exists or you are not employer")
    }

    const profileImage = req.file.filename
    
    await employers.create({
        name,location,employerCategory,contactNo,website,about,userId:id,profileImage
    })

    return res.send("Profile created succesfully")

}

exports.employerProfile = async(req,res)=>{
    const {employerId} = req.params
    const employerFound = await  employers.findByPk(employerId,

        {include: [
            {
              model: users,
              attributes: { exclude: ['password','createdAt','updatedAt',''] }, // Exclude the 'password' column
            },
        ]})
        console.log(employerFound,"HELLo")
    if(!employerFound){
        return res.send("No user employer found of this id")
    }
    res.render('employerProfile', { employerFound });
    
}

exports.postJob = async(req,res)=>{
    const userId = req.user.id
    const {jobTitle,jobDescription, salary, jobLevel,gender,requiredExperienceYr,requiredQualification,requiredSkills,deadLine,workLocation,jobTime}=req.body
    
    // console.log(userExist)
    const employer = await employers.findAll({
        where:{
            userId : userId
        }
    })
    if(employer[0].length===0){
        return res.send("No user exist or you don't have authority to post job")
    }
    
    await jobs.create({
        jobTitle,
        jobDescription,
        salary,
        jobLevel,
        gender,
        requiredExperienceYr,
        requiredQualification,
        deadLine,
        workLocation,
        requiredSkills,
        jobTime,
        employerId: employer[0].id
    })
    return res.send("Job posted succesfully!")

}