const express = require("express");
const app = express();
const request = require("request");
const cors = require("cors");
const path = require("path");
const PORT = 5001;
const passport = require("passport");
const jwt = require("jsonwebtoken");


require("../auth.js");
const { collection } = require("../mongodb.js");
const { eventCollection } = require("../mongodb");
const { booking } = require("../mongodb");
const { checktimestamp } = require("../mongodb");
const { Console } = require("console");
// const { default: Stripe } = require("stripe");
require("../mongodb.js");
const router = express.Router();
require("dotenv").config();
router.use(express.json());


//changepassword


router.post("/changepassword", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    console.log(password);
    const filter = { email: email }; // Define your filter criteria
    const update = { password: `${password}`  }; // Define the update operation
console.log("update",update);
console.log("filter",filter);
    const result = await collection.findOneAndUpdate(filter, update );
    if(result){
      res.status(200).send(result);
    }else{
      res.status(404).send(result);
    }
 
  } catch (error) { 
    console.log(error);    
  }
})


//login
router.post("/login", async (req, res) => {
  try {
    const result = await collection.findOne({ email: `${req.body.email}` });
    console.log(result);
    if (result) {
      if (result.password === req.body.password) {
        const token = jwt.sign(
          {
            email: req.body.email,
            role: result.role,
            _id: result._id,
            name: result.name,
          },
          process.env.SECRET_KEY
        );
        console.log(token);
        res.send(token);
      } 
      else res.status(203).send("wrong password");
    } 
    else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    console.log(error);
  }
});

//signup
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const user = new collection(req.body);
  await user.save();
  res.send(user);

  // console.log(email);
});

//google signin
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/fail",
  }),
  async (req, res) => {
    // console.log(req.user);
    const email = req.user.email;
    try {
      const user = await collection.findOne({ email });
      // IF USER SIGNED IN USING GOOGLE ALREADY EXISTS
      if (user) {
        console.log("Found user: ",user);
        const token = jwt.sign(
          {
            email,
            role: user.role,
            _id: user._id,
            name: user.name,
          },
          process.env.SECRET_KEY
        );
        res.redirect(`http://localhost:8080/mymiddler/${token}`);
      } 
      // SIGN UP NEW USER USING GOOGLE SIGN IN
      else {

        function generateRandomString(length) {
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let result = '';
        
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
          }
        
          return result;
        }





        // name role password email
        const user = new collection({
          name: req.user.displayName,
          role: "User",
          password: generateRandomString(10),
          email: email,
        });
        const result = await user.save();
        const token = jwt.sign(
          {
            email,
            role: result.role,
            _id: result._id,
            name: result.name,
          },
          process.env.SECRET_KEY
        );
        console.log(result)
        res.redirect(`http://localhost:8080/mymiddler/${token}`);
      }
    } catch (e) {
      console.log(e)
      res.status(400).send(e)
    }
    // console.log(email);
    // res.redirect("http://localhost:8080/uhome");
  }
);

router.get("/fail", async (req, res) => {
  res.redirect({ message: "Oh no!! FAILURE" });
});

module.exports = router;
