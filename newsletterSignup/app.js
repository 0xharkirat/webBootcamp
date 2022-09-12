//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require('body-parser');
const request = require("request");




const app = express();

app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){

    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/4e55244614";
    const options ={
        method: "POST",
        auth: "0xharkirat:501238b31ead65449b271402c53c0da7-us10"
    }

    const request = https.request(url, options, function(response){


        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port at 3000");
});





