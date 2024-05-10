const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Students = require('./models/student_model.js');

app.use(express.static('static'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set('view-engine','ejs')

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/files/home.html")
})
app.get('/students',async (req,res)=>{
    try{
        let students = await Students.find()
        if(!students.length){
            res.send('No students to show at the moment! Add some students to view.')
        }
        else{
            res.render('students.ejs',{students:[...students]})
        }
    }
    catch(err){
        res.send("Server is busy/not responding at the moment. Please try after some time")
    }
})
app.get('/addstudent',(req,res)=>{
    res.sendFile(__dirname+"/files/addstudent.html")
})
app.post('/addstudent',(req,res)=>{
    let newStudent = new Students(req.body)
    newStudent.save().then((res,err)=>{
        console.log("res::",res)
        console.log("err::",err)
    })
    res.redirect('/students')
})
app.delete('/deletestudent/:id',async (req,res)=>{
    let resp = await Students.deleteOne({_id:req.params.id})
    if(resp.deletedCount){
        res.json({deleted:true})
    }
    else{
        res.json({deleted:false})
    }
})
app.get('/editstudent/:id',async (req,res)=>{
    let student = await Students.find({_id:req.params.id})
    res.render('editstudent.ejs',{data:student[0]})
})
app.put('/editstudent',async (req,res)=>{
    let resp = await Students.updateOne(
        {_id:req.body.id},
        {
            $set : {
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                age:req.body.age
            }
        }
    )
    if(resp.modifiedCount===1){
        res.json({updated:true})
    }
    else{
        res.json({updated:false})
    }
})
app.listen(3000,()=>{console.log('server running on 3000')})