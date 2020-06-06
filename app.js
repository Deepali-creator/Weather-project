const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req , res){
  res.sendFile(__dirname + "/index.html" )

})
app.post("/" , function(req , res){
const query = req.body.cityName;
const apikey = "a3259ef52880700bbe02be18acc2b051"
const unit = "metric"
const url = "https://api.openweathermap.org/data/2.5/find?q=" +query+ "&appid=" +apikey+ "&units=" +unit;

https.get(url ,function(response){
  console.log(response.statusCode);

  response.on("data" , function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.list[2].main.temp
    const weatherDescription = weatherData.list[2].weather[0].description
    const icon = weatherConditionIcon = weatherData.list[2].weather[0].icon
    const imgURL = " http://openweathermap.org/img/wn/"+ icon + "@2x.png"
    res.write("<h1>The temperature in "+ query +  " is " +  temp  +  " degree celcius</h1>" )
    res.write("<p>The weather is currently "+ weatherDescription + "</p>");
    res.write("<img src=" +imgURL+">");
    res.send()
      })
    })

})






app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
