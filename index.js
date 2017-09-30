const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const bodyParser = require("body-parser")
const keys = require("./config/keys")
require("./models/users")
require("./services/passport")

mongoose.connect(keys.mongoURI)
const app = express()

app.use(bodyParser.json())

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
require("./routes/billingRoutes")(app)

if (process.env.NODE_ENV === "production") {
  // Make sure express will serve production assets, like main.js
  // In the code below, express will look in client/build for the exact
  // file requested. If not found, it will fall through and execute the
  // get route below to serve index.html
  app.use(express.static("client/build"))

  // Express will serve index.html if it doesn't recognize the route
  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)
