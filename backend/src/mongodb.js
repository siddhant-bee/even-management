const mongoose = require('mongoose');
// const validator = require("validator")
mongoose.connect('mongodb+srv://sjha:1234@cluster0.leonfuv.mongodb.net/taskmanager?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

const User_data = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
       
    }
})

const collection = new mongoose.model('User_data',User_data)
module.exports = collection