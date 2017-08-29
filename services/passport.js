const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const keys = require("../config/keys")

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
    // After request to google with code from auth/google/callback...
    console.log("Access token", accessToken)
    console.log("refresh token", refreshToken)
    console.log("profile", profile)
  })
)
