const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sjha:1234@cluster0.leonfuv.mongodb.net/taskmanager?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log(err));

const taskSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true   
    }
})

const collection = new mongoose.model('task',taskSchema)
module.exports = collection