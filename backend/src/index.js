const express = require("express");
const app = express();
const request = require("request");
const cors = require("cors");
const path = require("path");
const PORT = 5001;
const { collection } = require("./mongodb");
const { eventCollection } = require("./mongodb");
const { booking } = require("./mongodb");
// const { default: Stripe } = require("stripe");
require("./mongodb.js");

require("dotenv").config();
app.use(express.json());
// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// const storeItem = new Map([
//   [1, { priceInCents: 10000, name: "Premium" }][
//     (2, { priceInCents: 20000, name: "Gold" })
//   ],
// ]);

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
    const aval = await eventCollection.findOne({ _id: req.body.eventID });
    console.log(aval.noOfAvailableSlots);

    const { name, email, phone, noofticket, event, avaltick, eventID, id } =
      req.body;
    const final = aval.noOfAvailableSlots - noofticket;
    console.log("renaiing", final);
    const bookingData = new booking({
      name,
      email,
      phone,
      noofticket,
      event,
      eventID,
    });
    const ans = await bookingData.save();
    // res.status(200).send(bookingData);
    console.log(ans);

    if (ans && ans.eventID === eventID) {
      const filter = { _id: id }; // Define your filter criteria
      const update = { noOfAvailableSlots: final }; // Define the update operation
      console.log("hiii");
      const result = await eventCollection.findOneAndUpdate(filter, update);
      res.status(200).send(result);
    } else {
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
    fromDate,
    starttime,
    toDate,
    endtime,
    tillDate,
    startfromticket,
    location,
    locationLink,
    image,
    backgroundImage,
    price,
    totalNoOfSlots,
    noOfAvailableSlots,
  } = req.body;
  const eventData = new eventCollection({
    title,
    description,
    fromDate,
    starttime,
    toDate,
    endtime,

    tillDate,

    startfromticket,
    location,
    locationLink,
    image,
    backgroundImage,
    price,
    totalNoOfSlots,
    noOfAvailableSlots,
  });
  await eventData.save();
  res.send(eventData);
});

app.get("/compare", async (req, res) => {
  const currentDate = new Date();

  const result = await eventCollection.find();
  for (let i = 0; i < result.length; i++) {
    if (currentDate < new Date(result[i].startfromticket)) {
      const filter = { _id: result[i]._id };
      const update = { remark: "upcoming" };
      let doc = await eventCollection.findOneAndUpdate(filter, update);
    } else {
      const filter = { _id: result[i]._id };
      const update = { remark: "live" };
      let doc = await eventCollection.findOneAndUpdate(filter, update);
    }

    console.log(result);
  }
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
        fromDate: req.body.fromDate,
        starttime: req.body.starttime,
        toDate: req.body.toDate,
        endtime: req.body.endtime,
        tillDate: req.body.tillDate,
        startfromticket: req.body.startfromticket,
        location: req.body.location,
        locationLink: req.body.locationLink,
        image: req.body.image,
        backgroundImage: req.body.backgroundImage,
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

app.get("/cod/:id", async (req, res) => {
  try {
    
    const result = await eventCollection.findOne({ _id: req.params.id });
    // console.log(result);
    console.log(result.location);
    let cordinates ;
    let url = "";
    url =
      "http://api.mapbox.com/geocoding/v5/mapbox.places/" +
      result.location +
      ".json?access_token=pk.eyJ1Ijoic2lkZGhhbnRqaGEiLCJhIjoiY2xsb3R6MXAxMDEyczNmcWtxc213aDl1OCJ9.BvWsXmNOeaT_nC4Qzi3Mvg";

    request(
      {
        url: url,
        JSON: true,
      },
      (error, response) => {
         cordinates = JSON.parse(response.body);
         console.log("imlocation");
        console.log(cordinates.features[0].center);
        res.send(cordinates.features[0].center);
      }
    );

  } catch (error) {
    console.log(error);
  }
});





app.get("/event/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const result = await eventCollection.findOne({ _id: req.params.id });
    console.log(result);
    console.log(result.location);

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
