//jshint esversion:6
const express = require("express");
const https = require("https");

const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html")

   
//   res.send("Hello world");
});

app.post("/", function(req, res){

    // console.log(req.body.cityName);
    // res.send("Request recieved! ");

    const query = req.body.cityName;
    const appId =  "e7ac06f680c7fa7a49f94a0657353ca0";  
    const units = "metric"; 
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appId +"&units="+ units +"";

    

    https.get(url, function(response){
        // console.log(response);




        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            // console.log(weatherData);



            const temp = weatherData.main.temp;

            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " +  description + "</p>" );

            res.write("<h1>The temperature in "+ query +" is " + temp + " degree celcius. </h1>");
            res.write("<img src=" +  imageUrl + ">");
            res.send();
        });
    });
});




app.listen(3000, function () {
  console.log("Server started on port at 3000");
});
