/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next)
  }
}

/*
  MongoDB Validation Error Handler

  Detect if there are mongodb validation errors
*/

exports.mongoDBValidationErrors = (err, req, res, next) => {
  if (!err.errors) return next(err)
  // validation errors look like
  const errorMessages = []
  const errorKeys = Object.keys(err.errors)
  errorKeys.forEach(key => errorMessages.push(err.errors[key].message))
  res.send(errorMessages)
}
