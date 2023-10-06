const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = 5001;
const {collection} = require("./mongodb");
const {eventCollection} = require("./mongodb")
require("./mongodb.js");

app.use(cors());
app.use(express.json());


//signup
app.post("/signup", (req, res) => {
  console.log(req.body);
  const user = new Task(req.body);
  user.save();
  res.send(user);

  // console.log(email);
});
//login
app.post("/login", async (req, res) => {
  try {
    const result = await collection.findOne({ email: `${req.body.email}` });

    if (result) {
      if (result.password === req.body.password) {
        res.send(result);
      } else res.status(203).send("wrong password");
    }
  } catch (error) {
    console.log(error);
  }
});
//get all users
app.get("/users", async (req, res) => {
  try {
    const result = await Task.find();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
})



app.post('/addEvent', async (req, res) => {
  const { title , description, date, time, location, image, price, totalNoOfSlots, noOfAvailableSlots } = req.body
  const eventData = new eventCollection({ title, description, date, time, location, image, price,totalNoOfSlots, noOfAvailableSlots })
   await eventData.save()
   res.send(eventData)
  
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
