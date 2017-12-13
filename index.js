//
// pin, 4 digit
//
var gpc = require('generate-pincode')
var pin = gpc(4)

// 
// Google Datastore
//
const Datastore = require('@google-cloud/datastore');
const projectId = 'endlesspancake4u-184808';
// // Instantiates a client
const datastore = Datastore({
  projectId: projectId
});


// // parameters
// const timeInMs = Date.now();
const timeInMs = Date();
const kind = 'Task';
const name = 'pin_4_digit';
const taskKey = datastore.key([kind, name]);
//
// Sending and receiving data in JSON format using POST method
//
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var eventname = "GoogleHomePincode"
var apikey = "hlyGnhwalTMHt5K7LWSNmCnB4lgpKDGke5p3TAO_OtB"
var url = 'https://maker.ifttt.com/trigger/'+ eventname +'/with/key/'+ apikey
// var url = 'http://localhost:8000/'

// POST
// 
xhr.open("POST", url, false);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // var json = JSON.parse(xhr.responseText);
        console.log(xhr.responseText);
    // } else if (xhr.readyState === 4 && xhr.status === '') {
    //    console.log( 'Response Null but, '+xhr.status + xhr.responseText);
    } else {
        console.log( 'Someting Wrong. HttpStatus: '+xhr.statusText );
    }
};
var data = JSON.stringify({ value1: + pin });
xhr.send(data);
// console.log(data);

// and Saves the entity
const task = {
  key: taskKey,
  data: {
    local_time: timeInMs.toString(),
    your_number: pin
  }
};

datastore.save(task)
  .then(() => {
    console.log(`Saved ${task.key.name}: ${task.data.your_number}`);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

// get pin
datastore.get(taskKey)
  .then((results) => {
    // Task found.
    const entity = results[0];
    console.log('Result:', entity);
  });

