// next: a function to call after the middleware function is complete
//  it passes the request on to the next middleware in the chain
module.exports = (req, res, next) => {
  if(!req.user) {
    // we are not calling next() because we have an error
    // So basically, we can go ahead and send a response before ever even hitting a route handler if we encounter a condition
    // in our middleware that is not right.
    return res.status(401).send({ error: "You must log in before you can do that shiz, son! I don't know you! Get out of here." })
  }
  next()
}
