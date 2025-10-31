/**
 * Art Jam - Ball Action
 * Willow Casinghino
 * 
 * Art project. Try to push the ball into the hole and discover what follows.
 */

"use strict";
/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
const ball = {
    x: 400,
    y: 250,
    color: "#0d00ffff",
    size: 100
};

let smiler;

// let smiler;

// function preload() {
//     smiler = loadImage('/assets/images/clown.jpg');
//  }
function preload(){
    smiler = loadImage('./assets/images/smiler.jpg');
}

function setup() {
    //let smiler = loadImage('assets/images/clown.png');
    createCanvas(800,500);
    background("#000000ff");
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#000000ff");
    image(smiler,0,0,800,200);
    image(smiler,0,200,800,200);
    image(smiler,0,400,800,200);
    
}

