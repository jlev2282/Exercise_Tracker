"use strict";

var info = {
    name: "John",
    weight: 245,
    date: new Date(),
    last_workout: getLastWorkout(this.date),

}

var exercises = [
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

    cardioBody.empty;
    muscularBody.empty;

    for ( var i=0; i < exercises.length; i++) {
        //create a row to hold current exercise stats
        let tRow = $("<tr>");

        let name = $("<td>").text(exercises[i].name);
        //grab data and put into appropriate category
        switch (exercises[i].type) {
            case "cardio":
                var pr = $("<td>").text(exercises[i].pr);
                var did = $("<td>").text(exercises[i].did);
                var cal = $("<td>").text(exercises[i].cal);
                tRow.append(name, pr, did, cal);
                cardioBody.append(tRow);
            break;
            case "muscular":
                var pr = $("<td>").text(exercises[i].pr);
                var weight = $("<td>").text(exercises[i].weight);
                var reps = $("<td>").text(exercises[i].reps);
                tRow.append(name, pr, weight, reps);
                muscularBody.append(tRow);
            break;
            default:
            break;

        }
    }
}

populateStats();
