/**
 * Art Jam - Ball Action
 * Willow Casinghino
 * 
 * Art project. Try to push the ball into the hole and discover what follows.
 */

"use strict";
/**
 * Establish scene objects, functions, and preload images
*/
const ball = {
    x: 400,
    y: 250,
    color: "#0d00ffff",
    size: 100
};

const hole = {
    x: 500,
    y: 100,
    color: "#000000",
    xSize: 100,
    ySize: 50
}

let hand = {
    x: undefined,
    y: undefined,
    size: 100,
    img1: undefined,
    img2: undefined,
    img3: undefined
}
// preload important scene images
function preload(){
    hand.img1 = loadImage('./assets/images/one.png');
    hand.img2 = loadImage('./assets/images/two.jpg');
    hand.img3 = loadImage('./assets/images/three.jpg');
}

// set canvas and background
function setup() {
    createCanvas(800,500);
    background("#000000ff");
}


/**
 * Draw image elements
*/
function draw() {
    background("#000000ff");
    drawHand();
    
}
// Draw hand image depending on location, scaling with height to create a depth effect
function drawHand () {
    hand.size = distance(mouseY) * 100;
    hand.y = constrain(mouseY, 100, 400);
    hand.x = constrain(mouseX - (50*distance(mouseY)), 0, 800 - (100*distance(mouseY)));
    if (mouseX <= 200) {
        image(hand.img1, hand.x, hand.y, hand.size, hand.size);
    }
    else if (mouseX <= 600){
        image(hand.img2, hand.x, hand.y, hand.size, hand.size);
    }
    else {
        image(hand.img3, hand.x, hand.y, hand.size, hand.size);
    }
}
// calculates a 'distance' value from the height of an element, returning a value from 0 to 1 with a cutoff on the horizon 100 pixels below the top of the frame
function distance(Ypos){
    let sizeMult = map(mouseY, 100, 500, 0.1, 1, true);
    if (sizeMult == 0){
        sizeMult += 0.1;
    }
    console.log(sizeMult);
    return sizeMult;
}


