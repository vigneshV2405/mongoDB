const mongoose = require('mongoose')
const {Schema} = mongoose

mongoose.connect('mongodb://localhost:27017/students').then((resp)=>{
    console.log("resp::",resp)
})
.catch((err)=>{
    console.log("err::",err)
})

const studentSchema = new Schema({
    firstname : String,
    lastname : String,
    age : Number
})

module.exports = mongoose.model("students",studentSchema)