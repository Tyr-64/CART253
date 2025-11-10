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

let bg = {
    main: undefined,
    up: undefined,
    right: undefined,
    smile: undefined,
    down: undefined,
    left: undefined,
    frown: undefined
}

let button = {
    up: false,
    down: false,
    right: false,
    left: false,
    smile: false,
    frown: false
}

let display = {
    pics: [],
    x: 550,
    y: 150,
}

let i = 1;

let delay = false;


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
    img3: undefined,
}
// preload image assets
function preload(){
    hand.img1 = loadImage('./assets/images/left.png');
    hand.img2 = loadImage('./assets/images/middle.png');
    hand.img3 = loadImage('./assets/images/right.png');
    bg.main = loadImage('./assets/images/bgartjam.jpg');
    bg.up = loadImage('./assets/images/bgarrowup.jpg');
    bg.down = loadImage('./assets/images/bgarrowdown.jpg');
    bg.smile = loadImage('./assets/images/bgsmile.jpg');
    bg.frown = loadImage('./assets/images/bgfrown.jpg');
    bg.left = loadImage('./assets/images/bgarrowleft.jpg');
    bg.right = loadImage('./assets/images/bgarrowright.jpg');
    display.pics[1] = loadImage('./assets/images/1.jpg');
    display.pics[2] = loadImage('./assets/images/2.jpg');
    display.pics[3] = loadImage('./assets/images/3.jpg');
    display.pics[4] = loadImage('./assets/images/4.jpg');
    display.pics[5] = loadImage('./assets/images/5.jpg');
    display.pics[6] = loadImage('./assets/images/6.jpg');
    display.pics[7] = loadImage('./assets/images/7.jpg');
    display.pics[8] = loadImage('./assets/images/8.jpg');
    display.pics[9] = loadImage('./assets/images/9.jpg');
    display.pics[10] = loadImage('./assets/images/10.jpg');
    display.pics[11] = loadImage('./assets/images/11.jpg');
    display.pics[12] = loadImage('./assets/images/12.jpg');
    display.pics[13] = loadImage('./assets/images/13.jpg');
    display.pics[14] = loadImage('./assets/images/14.jpg');
    display.pics[15] = loadImage('./assets/images/15.jpg');



}

// set canvas and background
function setup() {
    createCanvas(800,500);
    background("#000000ff");
    //noCursor();
}


/**
 * Draw image elements
*/
function draw() {
    background("#000000ff");
    image(bg.main, 0,0);
    buttonPress();
    imgDisplay();
    drawHand();
    noCursor();
    button.up = false;
    button.right = false;
    button.smile = false;
    button.down = false;
    button.left = false;
    button.frown = false;
    //console.log(mouseX, mouseY);
    
}

// Draw hand image depending on location, scaling with height to create a depth effect
function drawHand () {
    hand.size = distance(mouseY) * 200;
    hand.y = constrain(mouseY, 50, 400);
    hand.x = constrain(mouseX - (50*distance(mouseY)), 0, 800 - (100*distance(mouseY)));
    if (mouseX <= 300) {
        image(hand.img1, hand.x-25, hand.y, hand.size, hand.size);
    }
    else if (mouseX <= 500){
        image(hand.img2, hand.x-25, hand.y, hand.size, hand.size);
    }
    else {
        image(hand.img3, hand.x-25, hand.y, hand.size, hand.size);
    }
}
// calculates a 'distance' value from the height of a hand, returning a value from 0 to 1 with a cutoff on the horizon 300 pixels below the top of the frame
function distance(Ypos){
    let sizeMult = map(mouseY, 300, 500, 0.48, 1.8, true);
    if (sizeMult == 0){
        sizeMult += 0.1;
    }
    return sizeMult;
}
function buttonPress(){
    // up arrow
    if (hand.x >= 506 && hand.x <= 593 && hand.y >=251 && hand.y <= 300 && display.y > 0){
        image(bg.up, 0, 0);
        button.up = true;
    }
    // right arrow
    else if (hand.x >= 506 && hand.x <= 593 && hand.y >=168 && hand.y <= 216 && display.x < 994){
        image(bg.right, 0, 0);
        button.right = true;
    }
    // smiley :)
    else if (hand.x >= 506 && hand.x <= 593 && hand.y >=85 && hand.y <= 137){
        image(bg.smile, 0, 0);
        button.smile = true;
    }
    //down arrow
    else if (hand.x >= 168 && hand.x <= 250 && hand.y >=251 && hand.y <= 300 && display.y < 930){
        image(bg.down, 0, 0);
        button.down = true;
    }
    // left arrow
    else if (hand.x >= 168 && hand.x <= 250 && hand.y >=168 && hand.y <= 216 && display.x > 0){
        image(bg.left, 0, 0);
        button.left = true;
    }
    // frown :(
    else if (hand.x >= 168 && hand.x <= 250 && hand.y >=85 && hand.y <= 137){
        image(bg.frown, 0, 0);
        button.frown = true;
    }
}
function imgDisplay(){
    // let dispY = constrain(150, 0, 1200);
    // let dispX = constrain(550, 0, 1200);
    image(display.pics[i],293,55, 205, 270, display.x, display.y, 205, 270);
    if (button.up == true){
        display.y -= 2;
        console.log(display.y);
    }
    else if (button.down == true) {
        display.y += 2;
        console.log(display.y);
    }
    else if(button.left == true){
        display.x -= 2;
        console.log(display.x);
    }
    else if(button.right == true){
        display.x += 2;
        console.log(display.x);
    }
    else if(button.smile == true && delay == false){
        i ++;
        delay = true;
        setTimeout(nextPic, 1000);
    }
    else if(button.frown == true && delay == false){
        i ++;
        delay = true;
        setTimeout(nextPic, 1000);
    }
}

function nextPic(){
    delay = false;
}


