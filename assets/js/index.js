"use strict";

var info = {
    name: "John",
    weight: 245,
    date: new Date(),
    last_workout: getLastWorkout(this.date),

}

$("#add-button").on("click", function(){
    event.preventDefault();
    alert(info.last_workout);
})

function getLastWorkout(date){
    return date;
}