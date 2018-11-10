"use strict";

var cardio_exercises = ["Treadmill", "Stairmaster", "Bike", "Row Machine"];
var muscular_exercises = ["Benchpress", "Latpull", "Incline Bench", "Curls", "Row"];


var cardio_results = ["Mi/Floors", "Calories"];
var muscular_results = ["Weight", "Reps"];

//submits workout results
$("#add-button").on("click", function(){
    event.preventDefault();
    let results = {
        type: $("#type").val(),
        exercise: $("#exercise").val(),
        result1: $("#results1").val().trim(),
        result2: $("#results2").val().trim()
    }
    // for (let i = 0; i < stats.length; i++) {
    //     if (stats[i].name == results.exercise) {
    //         if (results.type == "Cardio") {
    //             stats[i].dis = parseFloat(results.result1);
    //             stats[i].cal = parseInt(results.result2);
    //             stats[i].cum = stats[i].cum + parseFloat(results.result1);
    //         } else {
    //             stats[i].weight = parseInt(results.result1);
    //             stats[i].reps = parseInt(results.result2);
    //         }

    //         if (stats[i].pr < results.result1) {
    //             stats[i].pr = results.result1
    //         }
    //     }
        
    // }

    //send results to api route
    $.ajax({
        method: "POST",
        url: "./api/submit_stats",
        data: results
      }).then(function(stats) {
        console.log(stats);
        populateStats();
      });

})

function getLastWorkout(date){
    return date;
}

//loops over exercises array and populates both the cardio and muscular tables
function populateStats() {
    //empty both tables so you don't get duplicates
    let cardioBody = $("#cardio");
    let muscularBody = $("#muscular");

    cardioBody.empty();
    muscularBody.empty();
    $("#results1").val("");
    $("#results2").val("");

    $.ajax({
        method: "GET",
        url: "./api/get_stats",
      }).then(function(data) {

        for ( var i=0; i < data.length; i++) {
            //create a row to hold current exercise data
            let tRow = $("<tr>");
    
            let name = $("<td>").text(data[i].name);
            //grab data and put into appropriate category
            switch (data[i].type) {
                case "Cardio":
                    var pr = $("<td>").text(data[i].pr);
                    var did = $("<td>").text(data[i].dis);
                    var cum = $("<td>").text(data[i].cum);
                    var cal = $("<td>").text(data[i].cal);
                    tRow.append(name, pr, did, cal, cum);
                    console.log(tRow);
                    cardioBody.append(tRow);
                break;
                case "Muscular":
                    var pr = $("<td>").text(data[i].pr);
                    var weight = $("<td>").text(data[i].weight);
                    var reps = $("<td>").text(data[i].reps);
                    tRow.append(name, pr, weight, reps);
                    muscularBody.append(tRow);
                break;
                default:
                break;
    
            }
    
           
        }
      });


}

$("#type").change(function() {
    const exerciseOptions = $("#exercise");

    exerciseOptions.empty();

    if ($("#type").val() == "Cardio") {
       for (let i =0; i < cardio_exercises.length; i++) {
           exerciseOptions.append($("<option>").text(cardio_exercises[i]));
       }
       $("#result1label").text(cardio_results[0]);
       $("#result2label").text(cardio_results[1])

    } else {
        for (let i =0; i < muscular_exercises.length; i++) {
            exerciseOptions.append($("<option>").text(muscular_exercises[i]));
        }
        $("#result1label").text(muscular_results[0])
        $("#result2label").text(muscular_results[1])
    };
});

populateStats();
