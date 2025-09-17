/**
 * Variable movement
 * Willow Casinghino
 * 
 * Learnin' variables
 */

"use strict";

let bird = {
    x: 120,
    y: 480,
    size: 50,
    velocity: {
        x: 1,
        y: -2
    },
    minVelocity: {
        x: -3,
        y: -5
    },
    maxVelocity: {
        x: 3,
        y: 5
    },
    acceleration: {
        x: 0.025,
        y: -0.5
    },
};

/**
 * Create the good ol cranvas. cranvas? like cranberries. maybe a stil life?
*/
function setup() {
    createCanvas(640, 480);
}


/**
 * Draw circle in canvas
*/
function draw() {
    background(0);

    // Move the Bird
    bird.velocity.x = bird.velocity.x + bird.acceleration.x;
    bird.velocity.y = bird.velocity.y + bird.acceleration.y;

    bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
    bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);

    bird.x += bird.velocity.x;
    bird.y += bird.velocity.y;
    //Draw the Bird
    push();
    fill(255, 0, 0,);
    noStroke();
    ellipse(bird.x, bird.y, bird.size);
    pop();
   
}