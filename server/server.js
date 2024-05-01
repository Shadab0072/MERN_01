require('dotenv').config();
const express = require('express');
const app = express();
const contactRoute= require("./router/contact-router.js")
const authRoute = require("./router/auth-router.js");
const connectDb = require("./utils/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");
const cors = require("cors");
const serviceRoute = require("./router/service-router.js")
const adminRoute = require("./router/admin-router.js")


let corsOptions = { 
    origin : ['http://localhost:5173'], 
 }

app.use(cors(corsOptions))



app.use(express.json())     //middleware to work on json files


app.use("/api/auth", authRoute)

app.use("/api/form",contactRoute)

app.use("/api/data",serviceRoute)

app.use("/api/admin",adminRoute)


app.use(errorMiddleware);

connectDb().then(()=>{
app.listen(5000, ()=>{console.log("server is running")})
})



