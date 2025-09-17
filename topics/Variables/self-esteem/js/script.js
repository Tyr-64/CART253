/**
 * Self-Esteem
 * Pippin Barr
 * 
 * A portrait of Pippin's self-esteem on a sunny day.
 */

"use strict";

// Colour of the sky
let skyRed = 150;
let skyGreen = 180;
let skyBlue = 250;

// The sun

let sun = {
    fill: {
        red: 255,
        green: 255,
        blue: 0
    },
    x: 500,
    y: 70,
    size: 100
};

// My self-esteem

// Greyscale shade
let selfEsteemShade = 0;
// Position and size
let selfEsteemX = 320;
let selfEsteemY = 320;
let selfEsteemSize = 20;

/**
 * Create the canvas
 */
function setup() {
    // Create the canvas
    createCanvas(640, 320);
}

/**
 * Displays the sky, sun, and self-esteem
 */
function draw() {
    // A nice blue sky
    background(skyRed, skyGreen, skyBlue);

    // The sun
    push();
    fill(sun.fill.red, sun.fill.green, sun.fill.blue);
    noStroke();
    ellipse(sun.x, sun.y, sun.size);
    pop();

    // My self esteem
    push();
    fill(selfEsteemShade);
    noStroke();
    ellipse(selfEsteemX, selfEsteemY, selfEsteemSize);
    pop();
}