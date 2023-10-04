const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const PORT = 5001
const Task = require('./mongodb')
require('./mongodb.js')

app.use(cors())
app.use(express.json())

app.post('/login',(req,res)=>{
    console.log(req.body)
    const user = new Task(req.body);
    user.save();
    res.send(user);

    // console.log(email);
 
})





app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
});
