/**
 * Learning Variables
 * Willow Casinghino
 * 
 * Learnin' variables
 */

"use strict";

/**
 * Create the good ol cranvas. cranvas? like cranberries. maybe a stil life?
*/
function setup() {
    createCanvas(480, 480)
}


/**
 * Draw circle in canvas
*/
function draw() {
    background(0);

    //draw circle
    push();
    fill(255, 255, 0);
    noStroke();
    ellipse(mouseX, mouseY, 100, 100);
    pop();
}