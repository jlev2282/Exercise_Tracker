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
        did: "100",
        pr: 210,
        cal: 350
    },
    {
        name: "Treadmill",
        type: "cardio",
        did: 4.5,
        pr: 5.8,
        cal: 700
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
    }

];

var cardio_exercises = ["Treadmill", "Stairmaster", "Bike", "Row Machine"];
var muscular_exercises = ["Benchpress", "Latpull", "Incline Bench", "Curls", "Row"];


var cardio_results = ["Mi/Floors", "Calories"];
var muscular_results = ["Weight", "Reps"];
$("#add-button").on("click", function(){
    event.preventDefault();
    alert(info.last_workout);
    populateStats();
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

    for ( var i=0; i < stats.length; i++) {
        //create a row to hold current exercise stats
        let tRow = $("<tr>");

        let name = $("<td>").text(stats[i].name);
        //grab data and put into appropriate category
        switch (stats[i].type) {
            case "cardio":
                var pr = $("<td>").text(stats[i].pr);
                var did = $("<td>").text(stats[i].did);
                var cal = $("<td>").text(stats[i].cal);
                tRow.append(name, pr, did, cal);
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
