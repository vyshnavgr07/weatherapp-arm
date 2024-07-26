const express=require('express');
const cors=require('cors')
const app=express();
const weatherRouter=require('./routes/weatherRoutes')
app.use(express.json());
app.use(cors())



app.use("/api",weatherRouter)












module.exports=app;