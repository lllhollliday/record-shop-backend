import express from "express"
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import multer from 'multer'


import shopRoute from "./routes/shoproute.js"
import recordsRoute from "./routes/recordsroute.js"
import usersRoute from "./routes/usersroute.js"
// import ordersRoute from "./routes/ordersroute.js"


// creating express server
const app = express()
const PORT = process.env.PORT || 4000

// config multer package // setting storage destination for our file
// const upload = multer({dest: "upload/"})

// setup multer diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let fullPath = "./upload"
    cb(null, fullPath)
  },
  filename: function (req, file, cb) {
    let fileName = Date.now() + file.originalname
    cb(null, fileName)
  },
})

const upload = multer({ storage: storage }) // ask multer to use disk storage

console.log(process.env.MONGO_URI)
// create mongoose connection
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("DB connection established")
})

//app.use all methods : get, post, patch .... (any URL)
/* app.use("/", (req, res) => {
  console.log(req.url);
  next();
}); */

app.use(cors({ origin: "http://localhost:3001", allowedHeaders:"*" }))

app.use(morgan("dev")) // morgan is a middleware : finds endpoint and then forwards the code on

// express json middleware to parse any incoming json data
app.use(express.json())

// cookie parser
app.use(cookieParser())

// serve static files/pages
app.use(express.static("upload"))

// serve state files in views/ build folder
app.use(express.state("views/build"))

app.use("/", (req, res) => {
  res.sendFile("./views/build/index.html", {root:"."})
})

/* 
// custom middlerware
function log(req, res, next){
  console.log("i am middleware")
  next()
}

function checkMethod(req,res,next){
  console.log("i am the second middleware")
}

function thirdMiddleware(req,res,next) {
  console.log("i am the third middleware")
}
 */
//app.use(log, checkMethod)

// MVC
// Models (database storage)
// VIEWS (UI, frontend, presentational data)
// CONTROLLERS (request handlers, logic)

// Routes
// import from the route:

// "/users" GET POST PATCH DELETE
app.use("/shop", shopRoute)

// "/records" GET POST PATCH DELETE
app.use("/records", recordsRoute)

// "/users" GET POST PATCH DELETE
app.use("/users", upload.single("image"), usersRoute)

// handling 404 page not found error (error handling middleware)
app.use((req, res, next) => {
  res.sendFile("./views/pageNotFound.html", { root: "." })
})

// universal error handler middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ success: false, message: err.message })
})

/* app.get(
  "/",
  (req, res, next) => {
    console.log("i am in the middle");
    next();
  },
  (req, res, next) => {
    console.log("i am in second row");
    next();
  }, 
  (req, res) => {
    res.send("I am done");
    // Controller // request handler
    // res.send("Hi from server")
  }
); */

// next is a middleware

// listening request on port 4000
app.listen(PORT, () => console.log("server is running on port:", PORT))
