const express = require("express");
const https = require("https");

const app = express();


app.get("/",function(req,res){
    // to get the weather using api, we will use 'https' module
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=c25c3c679531fa97197272ee1a64c308&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode);

        // jo response aaya uske data ko access karne k liye
        response.on("data",function(data){
            // console.log(data); this will print the data in hexadecimal format 
            // console.log(JSON.parse(data)); ye poora print kar dega JSON format me
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            console.log(weatherData.weather[0].description); // ye sirf weather description print karega
            // res.send(
            //     "<p>"+
            //     "<h1>The temperature is "+ weatherData.main.temp + " desgree celcius</h1>" +
            //    "<h1>The weather descripton is " + weatherData.weather[0].description + " </h1></p>")
            res.write("<h1>The temperature is "+ weatherData.main.temp + " degree celcius</h1>")
            res.write("<h1>The weather descripton is " + weatherData.weather[0].description + " </h1>")
            const imgURL = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"// icon display karane ke liye
            res.write("<img src="+imgURL+">");
            res.send(); // we can use 'res.write()' instead of writing in <p></p> tag.
        });
    }) 
})
app.listen(3000, function(){
    console.log("Server is running on port 3000");
})