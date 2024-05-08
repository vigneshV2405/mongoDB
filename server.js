const express = require('express');
const app = express();
const Students = require('./models/student_model.js');

app.use(express.static('static'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/files/home.html")
})
app.get('/students',(req,res)=>{
    Students.find().then((data,err)=>{
        if(data.length){
            res.render('students.ejs',{students:[...data]})
        }
        else{
            res.send('No students to show at the moment!! Please add some students')
        }
    })
})
app.get('/addstudent',(req,res)=>{
    
})

app.listen(3000,()=>{console.log('server running on 3000')})