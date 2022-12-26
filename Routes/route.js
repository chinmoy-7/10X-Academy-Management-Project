const router = require("express").Router();
const e = require("express");
const newClass = require("../Models/newClass");
// const student = require("../Models/student");
const student = require("../Models/student")
//new Class
router.post("/v1/myClass",async (req,res)=>{
    try{
    let newclass = await newClass.create({
        class:req.body.class,
        studentsCount:req.body.studentsCount
    })
    res.status(201).json({
        id:newclass._id
    })
    }catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})

//Register a student
router.post("/v1/myClass/:myClassId/students",async(req,res)=>{
    try{
        const {myClassId}=req.params;
        const newStudent = await student.create({
            name:req.body.name,
            classId:myClassId
        })
        res.status(201).json({
            studentId:newStudent._id
        })
    }catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})

//List All the classes
router.get("/v1/myClass",async (req,res)=>{
    try{
        const allClass = await newClass.find();
        res.status(200).json({
            classes:allClass
        })
    }catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})

//Specific class
router.get("/v1/myClass/:myClassId",async (req,res)=>{
    try{
        const {myClassId}=req.params;
        console.log(myClassId)
        const speceficStudent = await student.find({classId:myClassId})
        console.log(speceficStudent)
        if(speceficStudent.length!=0){
            res.status(200).json(speceficStudent)
        }else{
            res.status(404).json({
                message:"There is no class at that id"
            })
        }
    }catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})

//All Students of Speceific class
router.get("/v1/myClass/:myClassId/students",async(req,res)=>{
    try{
        const {myClassId}=req.params
        const allStudent=await student.find({classId:myClassId})
        if(allStudent.length==0){
            res.status(404).json({
                error:"There are no students at this class"
            })
        }else{
            res.status(200).json(allStudent)
        }
    }catch(e){
        res.status(400).json({
            error:e.message
        })
    }
})

//Get One Student
router.get("/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    try{
        const {studentId}=req.params
        const oneStudent=await student.find({_id:studentId})
        if(oneStudent.length!=0){
            res.status(200).json(oneStudent)
        }else{
            res.status(404).json({
                message:"There is no student of that id"
            })
        }

    }catch(e){
        res.status(400).json({
            message:"There is no student of that id"
        })
    }
})

//Update
router.put("/v1/myClass/:myClassId/students/:studentId",async (req,res)=>{
    try{
        const {studentId}=req.params;
        // console.log(studentId)
        const prevData=await student.find({_id:studentId})
        // console.log(prevData[0].classId)
        await student.findOneAndReplace({_id:studentId},{name:req.body.name,classId:prevData[0].classId});
        res.status(200)
    }catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})

//Delete a Specefic Class
router.delete("/v1/myClass/:myClassId",async(req,res)=>{
    try{
    const {myClassId}=req.params;
    const deleted=await newClass.deleteOne({_id:myClassId});
    if(deleted.deletedCount==0){
        res.status(404).json({
            error:"There is no task at that id"
        })
    }
    res.status(404).json({});
    }catch(e){
        res.status(404).json({
            error:"There is no task at that id"
        })
    }
})

//Delete a specefic student
router.delete("/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    try{
        const {studentId}=req.params;
        const test= await student.find({_id:studentId})
        console.log(test)
        console.log(studentId)
        const deleteStudent=await student.deleteOne({_id:studentId})
        if(deleteStudent.deleteCount==0){
            res.status(404).json({
                error:"There is no task at that id"
            })
        }
        res.status(204).json({
            result:"204"
        })
    }catch(e){
        res.status(404).json({
            error:"There is no task at that id"
        })
    }
})

module.exports = router