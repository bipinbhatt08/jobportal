const { users } = require("../../model")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const sendEmail = require("../../services/sendEmail");

exports.renderRegisterForm = (req,res)=>{
    res.render("register")
}

exports.register = async(req,res)=>{
    const {email,username,password,confirmPassword,role} = req.body
    console.log(req.body)
    if(!email || !username || !password || !confirmPassword || !role){
        return res.send("Please provide email,username,password and confirmPassword")
    }
    if(password!==confirmPassword){
        return res.send("Password and confirmPassword doesnot match")
    }

    const userExist = await users.findAll({
        where:{
            email,
            role
        }
    })
    if(!userExist.length==0){
        return res.send("Email already exists")
    }
    await users.create({
        email,
        username,
        role : role,
        password : bcrypt.hashSync(password,8)
    })
    res.send("Registerd succesfully")
}

exports.renderLoginForm = (req,res)=>{
    res.render("login")
}

exports.login = async(req,res) =>{
    const {email,password} = req.body
    if(!email || !password){
        req.send("Please,provide email and password.")
    }
    // check if that email exist or not
    const associatedDataWithEmail = await users.findAll({
        where : {
            email : email
        }
    })
    if(associatedDataWithEmail.length == 0){
        res.send("Bad credentials!!")
    }
    else{
        const associatedPassword = associatedDataWithEmail[0].password
        const isMatch = bcrypt.compareSync(password,associatedPassword)//suruma plain passowrd ani hashed line
        if(isMatch){
            //process.env tyo variable access garnako lagi ho
           const token = jwt.sign({
            id : associatedDataWithEmail[0].id //id lai pathai deko 
           },process.env.SECRETKEY,{
                expiresIn : "30d"//second ma ni halna milxa
            })
            console.log("this is token " + token)

            res.cookie('token',token, { // yesma ni 3 ota parameter , third wala nadida ni hunxa
                secure: true,
                // expires : "120" expireko lagi pani
            })
            res.send("logged in succesfully")

        }
        else{
            res.send("Bad credentials!!")
           
        }
    }
}

exports.renderForgotpassword = (req,res)=>{
    res.render("forgotPassword")
}

exports.checkForgotPassword = async (req,res)=>{
    const email = req.body.email
    if(!email){
        return res.send("Please provide email")
    }

    // if email -> users Table check with that email 
   const emailExists =  await  users.findAll({
        where : {
            email : email
        }
    })
    if(emailExists.length == 0){
        res.send("User with that email doesn't exist")
    }else{
        const  generatedOtp = Math.floor(100000 + Math.random() * 900000);
        await sendEmail({
            email : email ,
            subject : "",
            otp : generatedOtp
        })

        emailExists[0].otp = generatedOtp
        emailExists[0].otpGeneratedTime = Date.now() 
        await emailExists[0].save()
        // res.send("Email send successfully")
        res.redirect("/otp/?email=" + email)
    }

}

exports.renderOtpForm = async(req,res)=>{
    const email = req.query.email
    res.render("otpForm",{email : email})
}
exports.handleOtp = async(req,res)=>{
    const otp = req.body.otp
    const email = req.query.email
    if(!email||!otp){
        return res.send("Send email,otp")
    }
    const userData = await  users.findAll({
        where: {
            email,
            otp
        }
    })
    if(userData.length==0){
        res.send("Invalid OTP")
    }else{
        const currentTime = Date.now()
        const otpGeneratedTime = userData[0].otpGeneratedTime
        if(currentTime-otpGeneratedTime<=120000){
            // userData[0].otpGeneratedTime = null
            // userData[0].otp = null
            // userData[0].save()
            res.redirect(`/changePassword/?email=${email}&otp=${userData[0].otp}`)
        }else{
            // userData[0].otpGeneratedTime = null
            // userData[0].otp = null
            // userData[0].save()
            res.send("OTP is expired")//
        }
        
    }

}

exports.changePassword = (req,res)=>{
    const email = req.query.email
    const otp = req.query.otp
    res.render("changePasswordForm",{email,otp})

}

exports.handleChangePassword =async (req,res)=>{
    const {newPassword,confirmPassword }= req.body
    if(!newPassword||!confirmPassword){
        return res.send("Provide new passowrd and confirm it")
    }
    if(newPassword!==confirmPassword){
        return res.send("Does not match")  
    }

    const email = req.query.email
    const otp = req.query.otp
    console.log(email)
    const user =  await users.findAll({
        where:{
            email, 
            otp
        }
    })
    if(!user||user.length===0){
        return res.send("User not found or invalid OTP.");
    }
    const hashedPassword =  bcrypt.hashSync(newPassword,8)
    user[0].password = hashedPassword
    user[0].otp=null
    user[0].otpGeneratedTime = null
    user[0].save()
    
    res.send("password is changed")
}

