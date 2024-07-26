const express=require('express');
const weatherRouter=express.Router();
const weathercontroler=require('../controller/weather')

weatherRouter.post('/weather',weathercontroler.getCurrentCity)
.post('/forcast',weathercontroler.getForcast)











module.exports=weatherRouter;