import dotenv from 'dotenv'
dotenv.config()

import mongoose from "mongoose"
import express from "express"
import bodyParser from 'body-parser'

// models/Student.js
const StudentSchema = new mongoose.Schema({
    name: String,
    first_name: String,
    email: String
})
const Student = mongoose.model("Student", StudentSchema)

const app = express()
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json()); 

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})

// routes/students.js
app.post("/students", async (req, res) => {
    console.log("POST recieved", req.body)
    const student = await Student.create(req.body)
    res.status("200")
    res.end()
})
app.get("/students", async (req, res) => {    
    const students = await Student.find()
    res.send(students)
})
app.get("/students/:id", async (req, res) => {   
    const student = await Student.findById(req.params.id)
    res.send(student)
})
app.put("/students/:id", async (req, res) => {   
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.send(updatedStudent)
})
app.delete("/students/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id)
    res.send("Student deleted")
})

mongoose.connect(process.env.CONNECTION_URI, ()=>{
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port 3000")
    })
})
