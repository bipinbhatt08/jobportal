const { candidates, users } = require("../../model")

exports.renderCandidateProfile =async (req,res)=>{

    const userId = req.params.id
    const userExists = await users.findByPk(userId)
    if(!userExists){
        return res.send("No user found of this id")
    }
    const candidate = await candidates.findOne({
        where:{
            userId
        }
    })
    if(!candidate){
        return res.send("No candidate found")
    }
    res.render("candidateProfile",{candidate})
}
exports.renderCreateProfile = (req,res)=>{
    res.render("userProfileForm")
}
exports.createCandidateProfile = async(req,res)=>{
    const userId = req.user.id
    const {name,address,profession,contactNo,email,about,skills,experience,qualification,offeredSalary,age,gender,level,organization,experiencePosition,experienceDescription,college,educationDescription,facebook,instagram,twitter,linkedin,github} = req.body

    const resume = req.files['resume'][0].filename; 
    const profile = req.files['profile'][0].filename; 
    await candidates.create({name,address,profession,contactNo,email,about,skills,experience,qualification,offeredSalary,age,resume,profile,gender,level,organization,experiencePosition,experienceDescription,college,educationDescription,facebook,instagram,twitter,linkedin,github,userId})
    res.send("Profile created succesfully")
}

