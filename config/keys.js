// keys.js -
// Figure out what set of credentials to return

if (process.env.NODE_ENV === "production") {
  // We are in production - use environment vars
  module.exports = require("./prod")
} else {
  // We are in development - return keys in dev.js
  module.exports = require("./dev")
}
