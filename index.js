const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const studentRoute = require('./routes/studentRoute')
const mentorRoute = require('./routes/mentorRoute')
const mentorModel = require("./model/mentorModule")
const studentModel = require("./model/studentModel")
// const billsRoute = require('./routes/billsRoute')
const app = express()

const port = 8000
const MONGO_URL = process.env.MONGO_URL
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to Zepto application")
})

app.use("/students", studentRoute)
app.use("/mentors", mentorRoute)
// app.use("/assign-mentor", billsRoute)


mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("mongo DB connected");
        app.listen(port, () => console.log(`Server started on the PORT, ${port}`))
    }).catch((error) => {
        console.log("Error", error);
    })



