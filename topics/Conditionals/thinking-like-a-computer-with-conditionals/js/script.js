/**
 * Thinking like a computer with conditionals
 * Pippin Barr
 * 
 * A simple program to make sure we understand conditionals.
 */

"use strict";

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 400);
}
let spider = {
    x: 200,
    y: 200,
    size: 50,
    speedX: 2,
    speedY: 4,
}


/**
 * Draw shapes based on conditions
 */
function draw() {
    background("#000000");
    drawCircle();
    moveCircle();
}

/**
 * Draws a square on the left side of the canvas
 */
/* function drawSquare() {
    push();
    fill("#ff0000");
    noStroke();
    rectMode(CENTER);
    rect(width * 0.1666, height * 0.5, width * 0.33);
    pop();
} */

/**
 * Draws a circle on the right side of the canvas
 */
function drawCircle() {
    push();
    fill("#ff0000");
    noStroke();
    ellipse(spider.x, spider.y, spider.size, spider.size);
    pop();
}

function moveCircle(){
    spider.x+=spider.speedX;
    spider.y+=spider.speedY;
    if(spider.y>height || spider.y<0) {
        //spider.y=0;
        spider.speedY *= -1;
    }
    if(spider.x>width || spider.x<0){
        //spider.x=0;
        spider.speedX *= -1;
    }
}

/**
 * Draws an X in the centre of the canvas
 */
/* function drawX() {
    push();
    stroke("#ff0000");
    strokeWeight(10);
    line(width * 0.33, height * 0.25, width * 0.66, height * 0.75);
    line(width * 0.66, height * 0.25, width * 0.33, height * 0.75);
    pop();
} */