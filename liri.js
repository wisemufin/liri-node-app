require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// Axios initialization
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var action = process.argv[2];
var value = process.argv.slice(3).join(" ");
// Takes the artist name
switch(action) {
  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "concert-this":
    concertThis();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
};

// Takes the artist name and finds concerts nearby
function concertThis() {
  axios
    .get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {
      console.log("Venue Name: " + response.data[0].venue.name);
      console.log("Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country);
      console.log("Time of Event: " + moment(response.data[0].venue.datetime).format("MM/DD/YYYY"));
  })
  .catch(function(error) {
    console.log(error);
  });
}

// Takes the song name and puts it into the spotify API
function spotifyThisSong() {

  spotify.search({
    type: 'track',
    query: value
  }, function(err, data) {
    if(err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("\n");
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song Title: " + data.tracks.items[0].name);
    console.log("Song URL: " + data.tracks.items[0].external_urls.spotify);
    console.log("Album Name: " + data.tracks.items[0].album.name);
  });
};

function movieThis() {
  if(value === "") {
    value = "Mr. Nobody"
  };

  axios
    .get("http://www.omdbapi.com/?t=" + value + "&apikey=trilogy").then(function(response) {
        console.log(
`
Movie Title: ${response.data.Title}
Release Date: ${response.data.Year}
IMDB Rating: ${response.data.imdbRating}
Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}
Country of Production: ${response.data.Country}
Language of Movie: ${response.data.Language}
Movie Plot: ${response.data.Plot}
Actors in Movie: ${response.data.Actors}
`
        );
      }).catch(function(error) {
        console.log(error);
      });

}

function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    data = data.split(",");
    value = data[1];
    spotifyThisSong();
  });
}
