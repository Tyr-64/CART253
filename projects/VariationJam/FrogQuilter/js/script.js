/**
 * FrogQuilter
 * Willow Casinghino
 * Based on frogfrogfrog by Pippin Barr
 * A game of quilting with your frog tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};
// tile values for image and scoring
let tile = {
    image: [],
    gVal: [.2, 0, .2, 0, 0, .3, .8, .9, 1, .6, 0, .2, .3, 0, .8],
    rVal: [0, .4, 0, 0, 0, .4, .1, 0, 0, .6, .5, .9, 1, 1, 0],
    bVal: [.9, .8, .9, .9, .9, .5, 0, .5, 0, 0, 0, 0, 0, 0, 0],
    flairVal: [.6, .4, .3, .5, .4, .6, .5, .6, .9, .3, .8, .4, .2, .5, .8],
    gScore: 0,
    rScore: 0,
    bScore: 0,
    cohesion: 0,
    flairScore: 0,
}
let tIndex = 0;
let started = false;

// Our fly
// Has a position, size, and speed of horizontal movement
let fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3,
    qTile: undefined,
};
// quilt object for building and display
let quilt = {
    image: undefined,
    lC: 0,
    hC: 0,
    width: 0,
    height: 0,
    x: 20,
    y: 0,
    finished: false,
}

/**
 * Creates the canvas and initializes the fly
 */
// preload tile images
function preload() {
    tile.image[0] = loadImage('./assets/images/b1.jpg');
    tile.image[1] = loadImage('./assets/images/b2.jpg');
    tile.image[2] = loadImage('./assets/images/b3.jpg');
    tile.image[3] = loadImage('./assets/images/b4.jpg');
    tile.image[4] = loadImage('./assets/images/b5.jpg');
    tile.image[5] = loadImage('./assets/images/br.jpg');
    tile.image[6] = loadImage('./assets/images/g1.jpg');
    tile.image[7] = loadImage('./assets/images/g2.jpg');
    tile.image[8] = loadImage('./assets/images/g3.jpg');
    tile.image[9] = loadImage('./assets/images/gr.jpg');
    tile.image[10] = loadImage('./assets/images/itsbrown.jpg');
    tile.image[11] = loadImage('./assets/images/r1.jpg');
    tile.image[12] = loadImage('./assets/images/r2.jpg');
    tile.image[13] = loadImage('./assets/images/r3.jpg');
    tile.image[14] = loadImage('./assets/images/g4.jpg');
}
// set up tile and quilt for construction
function setup() {
    createCanvas(640, 480);
    quilt.width = (fly.size * 40);
    quilt.height = (fly.size * 40);
    fly.qTile = createImage(fly.size * 8, fly.size * 8);
    quilt.image = createImage(quilt.width, quilt.height);



    // Give the fly its first random position
    resetFly();
}
// draw background and run fly and frog functions, if fly is caught build tile onto quilt. also displays start screen until mouse is pressed. when quilt is complete displays score and quilt
function draw() {
    background("#87ceeb");
    startScreen();
    if (quilt.finished == false && started == true) {
        moveFly();
        drawFly();
        moveFrog();
        moveTongue();
        drawFrog();
        checkTongueFlyOverlap();
        line(0, 10, 640, 10);
        image(quilt.image, quilt.x, quilt.y);
    }
    else if (started == true) {
        if (quilt.x <= 140) {
            quilt.x += 3;
            quilt.y += .5;
            quilt.width--;
            quilt.height--;
        }
        else {
            textFont('Impact', 40);
            text('Cohesion: ' + str(tile.cohesion), 100, 450);
            text('Flair: ' + str(tile.flairScore), 400, 450);
        }
        image(quilt.image, quilt.x, quilt.y, quilt.width, quilt.height);
    }
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    fly.y = random(fly.y - 10, fly.y + 10);
    fly.y = constrain(fly.y, 50, 440);
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
    image(fly.qTile, fly.x - 20, fly.y + 5, fly.size * 8, fly.size * 8);
}
// a start screen that goes away with mouse press
function startScreen() {
    if (started == false) {
        push();
        textFont('Courier New', 14.5);
        textStyle(BOLD);
        textAlign(CENTER);
        text('Frog wants to make a quilt, but all the flies are stealing the fabric! \n Catch the flies using your mouse to build the quilt. \n Color cohesion and flair are scored, but really just have fun! \n As the quilt grows it gets harder to catch the flies. \n \n Click the mouse to start.', 320, 200);
        pop();
    }
}


/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    tIndex = int(random(15));
    fly.x = 0;
    fly.y = random(0, 300);
    fly.qTile.copy(tile.image[tIndex], 0, 0, tile.image[tIndex].width, tile.image[tIndex].height, 0, 0, fly.size * 8, fly.size * 8);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}
// add the tile caught to the quilt for a 5x5 quilt
function buildQuilt() {
    if (quilt.lC < 5) {
        quilt.image.copy(tile.image[tIndex], 0, 0, tile.image[tIndex].width, tile.image[tIndex].height, quilt.lC * (fly.size * 8), quilt.hC * (fly.size * 8), fly.size * 8, fly.size * 8);
        tile.rScore += tile.rVal[tIndex];
        tile.gScore += tile.gVal[tIndex];
        tile.bScore += tile.bVal[tIndex];
        console.log(tile.rScore);
        tile.flairScore += tile.flairVal[tIndex];
        console.log('built');
        quilt.lC++;
    }
    if (quilt.lC == 5) {
        quilt.hC++;
        quilt.lC = 0;
    }
    if (quilt.hC == 5) {
        quiltFinished();
    }
}
// when the quilt is finished tabulate the scores and tell draw to show the end screen
function quiltFinished() {
    quilt.finished = true;
    tile.cohesion = (-100 / (((max(tile.rScore, tile.bScore, tile.gScore) - tile.rScore) - tile.bScore) - tile.gScore)) * 7;
    console.log(tile.cohesion);
    tile.cohesion = int(tile.cohesion);
    console.log(tile.cohesion);
    tile.flairScore = int(tile.flairScore) * 6;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        buildQuilt();
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }

}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
    started = true;
}