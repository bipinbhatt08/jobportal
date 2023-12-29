const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const { employers, jobs } = require('./model/index.js')

// database connection 
require("./model/index.js")


// telling the nodejs to set view-engine to ejs
app.set('view engine','ejs')

// FOR DONENV
require("dotenv").config()


// Serve static files from the 'public' folder
app.use(express.static('public'));
app.use('/static', express.static(__dirname + '/public'));

//cookie parse ko lagi
app.use(cookieParser())


// to parse data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/",async(req,res)=>{

    const allJobs = await jobs.findAll(
        {include: [
            {
              model: employers,
            //   attributes: { exclude: ['password','createdAt','updatedAt',''] }, // Exclude the 'password' column
            },
        ]}
    )

    if(allJobs.length===0){
        return res.send("No jobs")
    }

    res.render("home",{allJobs})

})



const authRoute = require("./routes/auth/authRoutes.js")
const employerRoute = require("./routes/employer/employerRoutes.js")
const candidateRoute = require("./routes/candidate/candidateRoutes.js")

app.use("",authRoute)
app.use("",employerRoute)
app.use("",candidateRoute)


app.listen(3101,() => {
    console.log("Started!")
})