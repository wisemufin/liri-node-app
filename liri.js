require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
// Axios initialization
var axios = require("axios");
var moment = require("moment");

var artist = process.argv.slice(3).join("+");

axios
  .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
  .then(function(response) {
  console.log("Venue Name: " + response.data[1].venue.name);
  console.log("Venue Location: " + response.data[1].venue.city + ", " + response.data[1].venue.country);
  console.log("Time of Event: " + moment(response.data[1].venue.datetime).format("MM/DD/YYYY"));
})
.catch(function(error) {
  console.log(error);
});
