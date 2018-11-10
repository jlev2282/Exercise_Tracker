DROP DATABASE IF EXISTS exercise_tracker;
CREATE DATABASE exercise_tracker;

USE exercise_tracker;

CREATE TABLE stats (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(30) NOT NULL,
    cum INT(10),
    dis INT(10),
    weight INT(3),
    pr INT(10),
    cal INT(10),
    reps INT(10),
    description VARCHAR(255),
    lastDone TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE exercises (
	id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(15) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE user (
	id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL,
    weight INT(3) NOT NULL,
    last_workout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

INSERT INTO user (username, weight, last_workout)
VALUES("John", 245, now());

INSERT INTO exercises (name, type)
VALUES("Stairmaster", "cardio"),
    ("Treadmill", "cardio"),
    ("Bike", "cardio"),
    ("Row Machine", "cardio"),
    ("Benchpress", "muscular"),
    ("Latpull", "muscular"),
    ("Incline Press", "muscular"),
    ("Curl", "muscular"),
    ("Row", "muscular");