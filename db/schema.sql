CREATE TABLE user (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    weight INT(3) NOT NULL,
    last_workout TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE exercises (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE stats (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(30) NOT NULL,
    cum INT(10),
    dis INT(10),
    pr INT(10),
    cal INT(10),
    reps INT(10),
    description VARCHAR(255),
    lastDone TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

INSERT INTO user (name, weight, last_workout)
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