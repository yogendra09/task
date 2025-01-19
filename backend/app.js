require("dotenv").config({ path: ".env" });
const express = require("express");
const mongoStore = require("connect-mongo")
const path = require("path");
const app = express();
const passport = require("passport");


const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-99wlx995d-yogendra09s-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    allowedHeaders: [
      "X-Requested-With",
      "Content-Type",
      "Authorization",
      "Cookie",
    ],
    credentials: true, // Allows cookies and other credentials
  })
);

// db connection
require("./config/database.js").connectDatabase();

// logger
const logger = require('morgan');
// app.use(logger("tiny"));

// body parser
require("./config/passport.config.js");
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use(express.static(path.join(__dirname, "../frontend/dist")));


const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
  resave:false,
  saveUninitialized:true,
  secret:process.env.EXPRESS_SESSION_SECRET || 'its_a_secret',
  cookie:{maxAge:1000*60*60*2},
  store:mongoStore.create({
    mongoUrl:process.env.MONGODB_URL,
    autoRemove:'disabled'
  })
})) 
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieparser());

const { generatedErrors } =require('./middlewares/error.js');
const ErrorHandler = require("./utils/ErrorHandler.js");


app.use("/api/user",require("./routes/userRoutes.js"));
app.use("/api/product",require("./routes/productRoutes.js"));
app.use("/api/order",require("./routes/orderRoutes.js"));
app.use("/auth/google",require("./routes/googleAuth.routes.js"));

// if (process.env.NODE_ENV == "production") {
  
  app.get("/", (req, res, next) =>{
    res.send("server is ready");
  });

  app.all("*", function(req, res, next){
    next(new ErrorHandler(`Requested URL not found ${req.url}`, 404));
  })
// }

app.use(generatedErrors);






module.exports = app;

  