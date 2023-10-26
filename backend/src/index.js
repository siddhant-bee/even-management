const express = require("express");
const app = express();

const cors = require("cors");

const PORT = 5001;
const sendmail = require("./route/sendmail");
require("./auth.js");


const adminroute = require("./route/adminroute");
const userroute = require("./route/userroute");
const printerroute = require("./route/printerrouter.js");
const login = require("./route/loginroute.js");
// const { default: Stripe } = require("stripe");
require("./mongodb.js");

require("dotenv").config();
app.use(express.json());


app.use(cors());
app.use(express.json());

app.use( adminroute);
app.use(userroute);
app.use(printerroute);
app.use(login);
app.use(sendmail);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
