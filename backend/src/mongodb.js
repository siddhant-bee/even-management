const mongoose = require("mongoose");
// const validator = require("validator")
mongoose
  .connect(
    "mongodb+srv://sjha:1234@cluster0.leonfuv.mongodb.net/taskmanager?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const User_data = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "User",
  },
});
const event_data = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fromDate:{
    type: String,
    required: true,
  },
  starttime:{
    type: String,
    required: true,
  },
  toDate:{
    type: String,
    required: true,
  },
  endtime:{
    type: String,
    required: true,
  },
  tillDate:{
    type: String,
    required: true,
  },
  availablefromDate:{
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalNoOfSlots: {
    type: Number,
    required: true,
  },
  noOfAvailableSlots: {
    type: Number,
    required: true,
  },
});



const booking_data = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    noofticket:{
        type:Number,
        required:true
    },
    eventID:{
        type:String,
        required:true
    },
   
    // userId:{    
    //     type:String,
    //     required:true
    // },
})

const booking = new mongoose.model("booking_data", booking_data);

const eventCollection = new mongoose.model("event_data", event_data);

const collection = new mongoose.model("User_data", User_data);
module.exports = {
  collection,
  eventCollection,
  booking,
};
