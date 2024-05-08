const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Students = require('./models/student_model.js');

app.use(express.static('static'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

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
        res.send(JSON.stringify(err))
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
app.delete('/deletestudent/:id',(req,res)=>{
    Students.deleteOne({_id:req.params.id}).then((resp)=>{
        if(resp.deletedCount){
            res.json({deleted:true})
        }
        else{
            res.json({deleted:false})
        }
    })
})

app.listen(3000,()=>{console.log('server running on 3000')})