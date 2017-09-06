const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const keys = require("./config/keys")
require("./models/users")
require("./services/passport")

mongoose.connect(keys.mongoURI)
const app = express()

// Set up a cookie session that expires in 30 days
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey] // A key used to encode the cookie
  })
)
app.use(passport.initialize())
app.use(passport.session())

require("./routes/authRoutes")(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)