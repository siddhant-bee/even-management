const express = require("express");
const app = express();
const request = require("request");
const cors = require("cors");
const path = require("path");
const PORT = 5001;
const passport = require("passport");
const authenticate = require("../auth/adminauth");
require("../auth.js");
const { collection } = require("../mongodb.js");
const { eventCollection } = require("../mongodb");

require("../mongodb.js");
const router = express.Router()
require("dotenv").config();
router.use(express.json());




//add event 
router.post("/addEvent", async (req, res) => {
    console.log(req.body);
    const {
      title,
      description,
      fromDate,
      starttime,
      toDate,
      endtime,
      tillDate,
      availablefromDate,
      location,
      locationlink,
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
  
      availablefromDate,
      location,
      locationlink,
      image,
      backgroundImage,
      price,
      totalNoOfSlots,
      noOfAvailableSlots,
    });
    await eventData.save();
    res.send(eventData);
  });


  //get all users
  router.get("/users", async (req, res) => {
    try {
      const result = await collection.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });



//get all event
router.get("/events", async (req, res) => {
    try {
      const result = await eventCollection.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });






//edit event
router.put("/editEvent", async (req, res) => {
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
          locationlink: req.body.locationLink,
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
  

  //make user

  router.put("/updateuser/:id", async (req, res) => {
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

  // make printer
  router.put("/updateprinter/:id", async (req, res) => {
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
  

  //make organiser
  router.put("/updateadmin/:id", async (req, res) => {
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

  router.get("/editevent/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await eventCollection.findOne({ _id: id });
      console.log(result);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });

  module.exports = router;