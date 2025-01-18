
const errorHandler = (err, req, res, next) => {
  
  const statusCode = err.status || 500 // Default to 500 if no status is provided
  const message = err.message || "Internal Server Error"

  // Log the error for debugging purposes
  console.error(JSON.stringify({
    "Message": message, 
    "Status": statusCode,
    "Time": new Date().toISOString()
    }, null, 2))

  res.status(statusCode).json({
    success: false,
    message,
  })
}

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)


export {
    errorHandler,
    asyncHandler
}
