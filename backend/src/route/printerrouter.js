  
  const express = require("express");
  const app = express();
  const request = require("request");
  const cors = require("cors");
  const path = require("path");
  const PORT = 5001;
  const passport = require("passport");
  require("../auth.js");
  const { collection } = require("../mongodb");
  const { eventCollection } = require("../mongodb");
  const { booking } = require("../mongodb");
  const { checktimestamp } = require("../mongodb");
  // const { default: Stripe } = require("stripe");
  require("../mongodb.js");
  const router = express.Router()
  require("dotenv").config();
  router.use(express.json());
  
  


//get single event
router.get("/event/:id", async (req, res) => {
    try {
      console.log(req.params.id);
      const result = await eventCollection.findOne({ _id: req.params.id });
      // console.log(result);
      // console.log(result.location);
  
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });



//book ticket
router.post("/bookticket", async (req, res) => {
    try {
      const aval = await eventCollection.findOne({ _id: req.body.eventID });
      console.log("helllooooo");
  
      const {
        name,
        email,
        phone,
        noofticket,
        event,
        eventID,
        userId,
        printerId,
        title,
      } = req.body;
      const final = aval.noOfAvailableSlots - noofticket;
      console.log("renaiing", final);
      const bookingData = new booking({
        name,
        email,
        phone,
        noofticket,
        event,
        eventID,
        printerId,
        title,
        userId,
      });
      const ans = await bookingData.save();
      // res.status(200).send(bookingData);
      console.log(ans);
  
      if (ans && ans.eventID === eventID) {
        const filter = { _id: eventID }; // Define your filter criteria
        const update = { noOfAvailableSlots: final }; // Define the update operation
        console.log("iffffffff");
        console.log(update);
        console.log(filter);
        const result = await eventCollection.findOneAndUpdate(filter, update);
        res.status(200).send(result);
      } else {
        res.status(203).send("no tickets available");
      }
    } catch (error) {
      console.log(error);
    }
  });

  //get all event
  router.get("/eventsprinter", async (req, res) => {
    try {
      const result = await eventCollection.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });


  //printer info

  router.get("/printer/:id", async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const result = await booking.find({ printerId: id });
      console.log(result);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });

  module.exports = router;