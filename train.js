
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAh3Fypp2woJdQL63dNyERbneUFitYv1ZU",
    authDomain: "train-time-1c971.firebaseapp.com",
    databaseURL: "https://train-time-1c971.firebaseio.com",
    projectId: "train-time-1c971",
    storageBucket: "train-time-1c971.appspot.com",
    messagingSenderId: "808360333321"
  };
  firebase.initializeApp(config);


  var database = firebase.database();



//  button to add trains

  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();


// user input

      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#train-destination-input").val().trim();
      var trainTime = $("#train-time-input").val().trim();
      var trainFrequency = $("#train-frequency-input").val().trim();


//temp hold for train data
var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
};

// upload train data to database
database.ref().push(newTrain);

// log to console

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency);


// clears from

$("#train-name-input").val("");
$("#train-destination-input").val("");
$("#train-time-input").val("");
$("#train-frequency-input").val("");


  });

  // add train to firebas and row to html

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // store into variables

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    //train info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);


     // prettify train time
    var trainTimePretty = moment.unix(trainTime).format("h:mm:ss A");

    //calculate minutes until next train arrival
    var minutesUntilNext = trainTime % trainFrequency;
    console.log("MINUTES TILL TRAIN: " + minutesUntilNext);

    var nextTrain = moment().add(minutesUntilNext, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh.mm"));

    // add data into table

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainTimePretty + "</td><td>" + minutesUntilNext + "</td></tr>");




});