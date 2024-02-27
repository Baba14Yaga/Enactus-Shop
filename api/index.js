const express = require("express");
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()// for creating new file
const app=express();
const dotenv = require("dotenv");
const userRoute= require("./routes/user")
const authRoute= require("./routes/auth")
const productRoute= require("./routes/product")
const teamRoute= require("./routes/team")
const cartRoute= require("./routes/cart")
const orderRoute= require("./routes/order")

const cors = require('cors')
dotenv.config();
app.use(jsonParser)
app.use(cors({
    origin:"*",
    credentials:true
}))
const mongoose=require("mongoose")
88

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DBConnection Successful!"))
    .catch((err)=>{console.log(err)
});  

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)
app.use("/api/teams",teamRoute)
app.use("/api/carts",cartRoute)
app.use("/api/orders",orderRoute)

app.listen(process.env.PORT||5000,()=>{
    console.log("Backend server is running!")
})