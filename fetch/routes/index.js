var express = require('express');
const axios = require('axios');
var router = express.Router();
var io = require('socket.io')();

router.io = io;

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://l9ve31psbl.execute-api.ap-southeast-1.amazonaws.com/apidev/restfunction?date=',
  headers: { 
    'x-api-key': 'v8QwL4wpSS1m5QfdRqjwZW3y32sXS24RsBWx0Ya0'
  }
};

// Define a function to fetch the data
function fetchData() {
  axios.request(config)
    .then((response) => {
      const data = response.data;
      // Emit an event to update the client with the new data
      router.io.emit('dataUpdated', data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Set up the auto-refresh feature
setInterval(fetchData, 10000); // Refresh every 60 seconds

// Define the routes
router.get('/', (req, res) => {
  res.render('index'); // Render the 'index' EJS view
});

router.get('/data', (req, res) => {
  axios.request(config)
    .then((response) => {
      const data = response.data;
      res.json(data); // Send the response data as JSON to the client
    })
    .catch((error) => {
      console.log(error);
      res.send('Error fetching data');
    });
});

module.exports = router;
