const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config();


passport.use(new GoogleStrategy({
    clientID:     "678290669156-r770nh6voabn6kd3qfkrpcau4d7ptq04.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5001/auth/google/callback",
    passReqToCallback   : true,
    session: false
  },
  function(request, accessToken, refreshToken, profile, done) {
    // console.log(profile)
    return done(null, profile)
  }
)); 