"use strict";

var info = {
    name: "John",
    weight: 245,
    date: new Date(),
    last_workout: getLastWorkout(this.date),

}

var stats = [
    {
        name: "Stairmaster",
        type: "cardio",
        cum: 0,
        dis: 100,
        pr: 210,
        cal: 350
    },
    {
        name: "Treadmill",
        type: "cardio",
        cum: 0,
        dis: 4.5,
        pr: 5.8,
        cal: 700
    },
    {
        name: "Bike",
        type: "cardio",
        cum: 0,
        dis: 20,
        pr: 20,
        cal: 350
    },
    {
        name: "Row Machine",
        type: "cardio",
        cum: 0,
        dis: 30,
        pr: 35,
        cal: 600
    },
    {
        name: "Benchpress",
        type: "muscular",
        weight: 175, 
        pr: 225,
        reps: 5
    },
    {
        name: "Latpull",
        type: "muscular",
        weight: 100,
        pr: 115,
        reps: 10
    },
    {
        name: "Incline Press",
        type: "muscular",
        weight: 140,
        pr: 165,
        reps: 7
    },
    {
        name: "Curl",
        type: "muscular",
        weight: 35,
        pr: 45,
        reps: 7
    },
    {
        name: "Row",
        type: "muscular",
        weight: 55,
        pr: 55,
        reps: 7
    }

];

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

    for ( var i=0; i < stats.length; i++) {
        //create a row to hold current exercise stats
        let tRow = $("<tr>");

        let name = $("<td>").text(stats[i].name);
        //grab data and put into appropriate category
        switch (stats[i].type) {
            case "cardio":
                var pr = $("<td>").text(stats[i].pr);
                var did = $("<td>").text(stats[i].dis);
                var cum = $("<td>").text(stats[i].cum);
                var cal = $("<td>").text(stats[i].cal);
                tRow.append(name, pr, did, cal, cum);
                cardioBody.append(tRow);
            break;
            case "muscular":
                var pr = $("<td>").text(stats[i].pr);
                var weight = $("<td>").text(stats[i].weight);
                var reps = $("<td>").text(stats[i].reps);
                tRow.append(name, pr, weight, reps);
                muscularBody.append(tRow);
            break;
            default:
            break;

        }

       
    }
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
