const { users } = require("../../model")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

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

