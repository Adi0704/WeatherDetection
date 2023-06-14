const express = require('express')
const app = express()
const https=require("https");
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    
})
app.post("/",function(req,res){
const city=req.body.city
const id="API KEY"//Replace API key with the unique key generated through open weather 
const units="metric"
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+id+"&units="+units+""
    https.get(url,function(response){
        response.on("data",function(data){
            var properdata=JSON.parse(data)
           res.write("<h1> The tempreature is "+ properdata.main.temp+"</h1>");
            res.write("<h1> The weather Description in "+ city+" is "+properdata.weather[0].description+"</h1>");
            var icon=properdata.weather[0].icon
            var iconURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<img src="+ iconURL +">") 
            res.send()
        })
    })
})





app.listen(3000,function(){
    console.log("Server is running on 3000")
})
/* 
 */
