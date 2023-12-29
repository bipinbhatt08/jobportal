
        const  jwt = require("jsonwebtoken")
        const {promisify} = require("util")
        const {users} = require("../model")
        exports.isAuthenticated = async (req,res,next)=>{
            const token = req.cookies.token
            if(!token){
                return res.redirect("/login")
            }
            const decodedResult = await promisify(jwt.verify)(token, process.env.SECRETKEY);
            const userExist = await users.findAll({
                where: {
                    id : decodedResult.id
                }
            })
            
          if(userExist.length == 0){
            res.send("User with that token does not exist")
          }else{
            // console.log(userExist)
            req.user = userExist[0] // Set req.user with the actual user instance data
            next()//uta route ma creatblog ma jadai na data until we do nexto
        }  
        }
        