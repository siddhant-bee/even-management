const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const PORT = 5001;
const { collection } = require("./mongodb");
const { eventCollection } = require("./mongodb");
const { booking } = require("./mongodb");
require("./mongodb.js");

app.use(cors());
app.use(express.json());

//signup
app.post("/signup", (req, res) => {
  console.log(req.body);
  const user = new collection(req.body);
  user.save();
  res.send(user);

  // console.log(email);
});

app.post("/bookticket", async (req, res) => {
  try {
    
    const { name, email, phone, noofticket, event,avaltick,eventID ,id} = req.body;
    const final = avaltick-noofticket 
    const bookingData = new booking({
      name,
      email,
      phone,
      noofticket,
      event,
      eventID
    });
    const ans =await bookingData.save();
    // res.status(200).send(bookingData);
    console.log(ans);
   
    if (ans && ans.eventID === eventID){ 
      const filter = { _id: id }; // Define your filter criteria
      const update = { noOfAvailableSlots:final}; // Define the update operation

      const result = await eventCollection.findOneAndUpdate(filter, update);
      res.status(200).send(result);
    }
    else{
      res.status(203).send("no tickets available");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/addEvent", async (req, res) => {
  const {
    title,
    description,
    date,
    time,
    location,
    image,
    price,
    totalNoOfSlots,
    noOfAvailableSlots,
  } = req.body;
  const eventData = new eventCollection({
    title,
    description,
    date,
    time,
    location,
    image,
    price,
    totalNoOfSlots,
    noOfAvailableSlots,
  });
  await eventData.save();
  res.send(eventData);
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
    const result = await collection.find();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/events", async (req, res) => {
  try {
    const result = await eventCollection.find();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.put("/editEvent", async (req, res) => {
  // console.log(req.body);
  try {
    const id = req.body._id;
    const filter = { _id: id }; // Define your filter criteria
    console.log("Id:", id);
    const update = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        image: req.body.image,
        price: req.body.price,
        totalNoOfSlots: req.body.totalNoOfSlots,
        noOfAvailableSlots: req.body.noOfAvailableSlots,
      },
    }; // Define the update operation
    console.log("update", update);

    const result = await eventCollection.findOneAndUpdate(filter, update, {
      new: true,
    });
    // const result = await eventCollection.find({_id:id});
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", result);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/event/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await eventCollection.findOne({ _id: req.params.id });
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.put("/updateadmin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: id }; // Define your filter criteria
    const update = { role: "Organiser" }; // Define the update operation

    const result = await collection.findOneAndUpdate(filter, update);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
  // console.log(id);
});

//edit task

app.get("/editevent/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await eventCollection.findOne({ _id: id });
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.put("/updateprinter/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: id }; // Define your filter criteria
    const update = { role: "Printer" }; // Define the update operation

    const result = await collection.findOneAndUpdate(filter, update);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
  // console.log(id);
});

app.put("/updateuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: id }; // Define your filter criteria
    const update = { role: "User" }; // Define the update operation

    const result = await collection.findOneAndUpdate(filter, update);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
  // console.log(id);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
