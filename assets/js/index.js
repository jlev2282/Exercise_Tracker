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

]

$("#add-button").on("click", function(){
    event.preventDefault();
    alert(info.last_workout);
})

function getLastWorkout(date){
    return date;
}

//loops over exercises array and populates both the cardio and muscular tables
function populateStats() {
    //empty both tables so you don't get duplicates
    $("#cardio").empty;
    $("#muscular").empty;
    for ( var i=0; i < exercises.length; i++) {
        switch (exercises[i].type) {
            case "cardio":

        }
    }
}

populateStats();