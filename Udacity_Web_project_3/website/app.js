/* Global Variables */
// Personal API Key for OpenWeatherMap API (n.b. using London as an example when passed as the Zip code, the full API when passed will look like):
// 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c0b248af356e17f10173013bdf8b7729';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const personalAPIkey = '&APPID=c0b248af356e17f10173013bdf8b7729';

//Global variables to store user entered values from the GUI front end:  
let zipcode = "";
let feelings = ""; 

// Create a new date instance dynamically with JS (note: web ref for getting correct month from JS: https://stackoverflow.com/questions/1643320/get-month-name-from-date)
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentDateTime = new Date(); 
let newDate = monthNames[currentDateTime.getMonth()]+'.'+ currentDateTime.getDate()+'.'+ currentDateTime.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
function performAction(e){
    zipcode = document.getElementById('zip').value;           //Note: On front end enter as a city (i.e. London) if outside USA
    feelings = document.getElementById('feelings').value;
    console.log("zipcode = " + zipcode);
    console.log("feelings = " + feelings);
    
    getWeatherAPI(baseURL, zipcode, personalAPIkey)           //getWeatherAPI('/fakeWeatherSite') //Use this dummy API for testing
    .then(function(data){
        console.log("Ths general weather is " + data.weather[0].description + " and the temperature is " + data.main.temp);
        postWeatherData('/addWeatherInfo', {weatherStatus: data.weather[0].description, temp: data.main.temp, userResponse: feelings, date: newDate, zipcity: zipcode})
    })
    .then (function(data) {
        updateWeatherUI('/allWeatherInfo')
    })
};

const getWeatherAPI = async (baseURL, zipcode, APIkey) =>{    //const getWeatherAPI = async (url) =>{  const res = await fetch(url) //Use this for testing only
    const res = await fetch(baseURL+zipcode+APIkey)
    try {
       const weatherData = await res.json();  
       console.log(weatherData)  
       return weatherData;
    } catch (error) {
        console.log("Error calling getWeatherAPI API, error message = ", error);
    }
}

const postWeatherData = async ( url = '', data = {})=>{
    console.log(data)
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
                'Content-Type': 'application/json',
        },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

    try {
        const newPostData = await response.json();  
        console.log(newPostData);  
        return newPostData;
     } catch (error) {
         console.log("Error calling postWeatherData API, error message = ", error);
     }
}

const updateWeatherUI = async (url = '') => {
    const request = await fetch(url);
    try{
      const allWeatherData = await request.json();
      console.log(allWeatherData);
      document.getElementById('date').innerHTML = 'The date is: ' + allWeatherData.date;
      document.getElementById('temp').innerHTML = 'The weather for zip code (or non US city) ' + allWeatherData.zipcity + ' is: ' + allWeatherData.weatherStatus + ' with temp = ' + allWeatherData.temp;
      document.getElementById('content').innerHTML = 'Your feeling(s) on this date, at this location, for this temperature, was/were as follows: ' + allWeatherData.userResponse;
    }catch(error){
      console.log("error inside updateWeatherUI API call, the error was = ", error);
    }
  }
