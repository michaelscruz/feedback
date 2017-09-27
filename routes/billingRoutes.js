// This is essentially a controller that happens to handle billing-related requests

const keys = require("../config/keys")
const stripe = require("stripe")(keys.stripeSecretKey)
const requireLogin = require("../middlewares/requireLogin")

module.exports = app => {
  // Think of this like a :create action on a rails controller

  // requireLogin, a middleware function, is passed into the route handler as its second argument.
  // It is not invoked, by passed as a function to be invoked but the post() function.
  // We can pass in any number of arguments to app.post() (or get(), etc.), so we can pass in any
  // number of middlewares. But eventually, some function needs to handle the actual request and
  // send back a response.
  app.post("/api/stripe", requireLogin, async (req, res) => {

    // First we communicate with the strip api and get the charge object back
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    })

    // I would think we really need to ensure the charge was successful before proceeding,
    // but in this example, we're assuming it was successful and we're adding 5 credits
    // to the user object, then saving the user.
    req.user.credits += 5
    const user = await req.user.save()

    // res.send sends a json object representing the user
    res.send(user)

  })
}
