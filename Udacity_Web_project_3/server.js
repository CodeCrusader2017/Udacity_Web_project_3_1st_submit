// Setup empty JavaScript array object to act as API application endpoint for all routes
projectData = {}; 

// Setup Node.js Server Middleware environment to run Express for routes processing   
const express = require('express');                      
const weatherApp = express();    

// Configure Express to set up the bodyParser middle-ware to allow the application to use JSON parsing 
const bodyParser = require('body-parser');                
weatherApp.use(bodyParser.urlencoded({ extended: false }));     
weatherApp.use(bodyParser.json());

// Use Cors for cross origin allowance
const cors = require('cors');                            
weatherApp.use(cors());

//point to the project folder with .html, .css, and .js files.    
weatherApp.use(express.static('website'));     

//spin up the node.js server with a callback to listen on port 4000 to confirm on the command line that the server is running at this port
const port = 4000;
const server = weatherApp.listen(port, listening);              
function listening(){
    console.log(`running on localhost: ${port}`);
};

weatherApp.post('/addWeatherInfo', addWeatherInfo);
function addWeatherInfo (req, res){
    projectData = {
        weatherStatus: req.body.weatherStatus,
        temp: req.body.temp,
        userResponse: req.body.userResponse,
        date: req.body.date,
        zipcity: req.body.zipcity
    }
    res.send(projectData);
    console.log("In post = " + projectData.weatherStatus + " " + projectData.temp + " " + projectData.userResponse + " " + projectData.date + " " + projectData.zipcity);
};
  
weatherApp.get('/allWeatherInfo', getAllWeatherData);
function getAllWeatherData(req, res){
    res.send(projectData);
    console.log("In get = " + projectData.weatherStatus + " " + projectData.temp + " " + projectData.userResponse + " " + projectData.date + " " + projectData.zipcity);
}



//Code below - TESTING USE ONLY via DUMMY API
//Dummy fake weather end point data - testing only
//const fakeWeather = {
//    weather: 'terrible weather',
//    city: 'London'
//};

//Dummy API fake weather end point - testing only
//weatherApp.get('/fakeWeatherSite', getFakeWeatherData);
//function getFakeWeatherData(req, res) {
//    //console.log("In get fakeWeatherSite " + projectData.weatherStatus + " " + projectData.city);
//    //res.send(fakeWeather)
//}