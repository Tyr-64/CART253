/**
 * Art Jam - Memory Mixer
 * Willow Casinghino
 * 
 * Art project. Explore and mash together memories (images) to make all new compositions.
 */

"use strict";
/**
 * Establish scene objects, functions, and preload images
*/

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

let blendType = 0;

let display = {
    pics: [],
    x: 550,
    y: 150,
    transfer: undefined,
    right: undefined,
    left: undefined,
    rightActive: false,
    leftActive: false,
}
//image array iterator
let i = 0;

let delay = false;

let hand = {
    x: undefined,
    y: undefined,
    size: 100,
    img1: undefined,
    img2: undefined,
    img3: undefined,
}

// preload image assets
function preload() {
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
    display.pics[0] = loadImage('./assets/images/1.jpg');
    display.pics[1] = loadImage('./assets/images/2.jpg');
    display.pics[2] = loadImage('./assets/images/3.jpg');
    display.pics[3] = loadImage('./assets/images/4.jpg');
    display.pics[4] = loadImage('./assets/images/5.jpg');
    display.pics[5] = loadImage('./assets/images/6.jpg');
    display.pics[6] = loadImage('./assets/images/7.jpg');
    display.pics[7] = loadImage('./assets/images/8.jpg');
    display.pics[8] = loadImage('./assets/images/9.jpg');
    display.pics[9] = loadImage('./assets/images/10.jpg');
    display.pics[10] = loadImage('./assets/images/11.jpg');
    display.pics[11] = loadImage('./assets/images/12.jpg');
    display.pics[12] = loadImage('./assets/images/13.jpg');
    display.pics[13] = loadImage('./assets/images/14.jpg');
    display.pics[14] = loadImage('./assets/images/15.jpg');
}

// set canvas and background, disable cursor visibility
function setup() {
    createCanvas(800, 500);
    background("#000000ff");
    noCursor();
}


/**
 * Draw image elements like hand, background, and images as well as reset button booleans so they dont stay on after being depressed
*/
function draw() {
    background("#000000ff");
    if (i == 15) {
        setTimeout(finalScreen, 700);
    }
    image(bg.main, 0, 0);
    buttonPress();
    imgDisplay();
    button.up = false;
    button.right = false;
    button.smile = false;
    button.down = false;
    button.left = false;
    button.frown = false;
    //console.log(mouseX, mouseY);
    if (display.rightActive == true) {
        image(display.right, 631, 82, 164, 216);
    }
    if (display.leftActive == true) {
        image(display.left, 3, 82, 164, 216);
    }
    drawHand();
}

// Draws hand image depending on location, uses y value to create a depth effect
function drawHand() {
    let sizeMult = map(mouseY, 300, 500, 0.48, 1.8, true);
    if (sizeMult == 0) {
        sizeMult += 0.1;
    }
    hand.size = sizeMult * 200;
    hand.y = constrain(mouseY, 50, 400);
    hand.x = constrain(mouseX - (50 * sizeMult), 0, 800 - (100 * sizeMult));
    if (mouseX <= 300) {
        image(hand.img1, hand.x - 25, hand.y, hand.size, hand.size);
    }
    else if (mouseX <= 500) {
        image(hand.img2, hand.x - 25, hand.y, hand.size, hand.size);
    }
    else {
        image(hand.img3, hand.x - 25, hand.y, hand.size, hand.size);
    }
}

// checks location of pointer to corresponding button on screen. changes background image and sets button boolean to true (reversed in draw)
function buttonPress() {
    // up arrow
    if (hand.x >= 506 && hand.x <= 593 && hand.y >= 251 && hand.y <= 300 && display.y > 0) {
        image(bg.up, 0, 0);
        button.up = true;
    }
    // right arrow
    else if (hand.x >= 506 && hand.x <= 593 && hand.y >= 168 && hand.y <= 216 && display.x < 994) {
        image(bg.right, 0, 0);
        button.right = true;
    }
    // smiley :)
    else if (hand.x >= 506 && hand.x <= 593 && hand.y >= 85 && hand.y <= 137) {
        image(bg.smile, 0, 0);
        button.smile = true;
    }
    //down arrow
    else if (hand.x >= 168 && hand.x <= 250 && hand.y >= 251 && hand.y <= 300 && display.y < 930) {
        image(bg.down, 0, 0);
        button.down = true;
    }
    // left arrow
    else if (hand.x >= 168 && hand.x <= 250 && hand.y >= 168 && hand.y <= 216 && display.x > 0) {
        image(bg.left, 0, 0);
        button.left = true;
    }
    // frown :(
    else if (hand.x >= 168 && hand.x <= 250 && hand.y >= 85 && hand.y <= 137) {
        image(bg.frown, 0, 0);
        button.frown = true;
    }
}

//using the button booleans, image display either moves or cycles the images, then calls on the blend functions to alter/place images on the right and left
function imgDisplay() {
    //displays image using i iterator variable, cropping it and placing it in the center with p5's image arguments. display x and y are the values that allow the image to 'move' under the crop.
    image(display.pics[i], 293, 55, 205, 270, display.x, display.y, 205, 270);
    display.transfer = display.pics[i].get(display.x, display.y, 205, 270);
    //start with the up down left right arrows, moving the current center image
    if (button.up == true) {
        display.y -= 2;
        console.log(display.y);
    }
    else if (button.down == true) {
        display.y += 2;
        console.log(display.y);
    }
    else if (button.left == true) {
        display.x -= 2;
        console.log(display.x);
    }
    else if (button.right == true) {
        display.x += 2;
        console.log(display.x);
    }
    // then check if one of the face buttons was pressed and act accordingly
    else if (button.smile == true && delay == false) {

        if (display.rightActive == true) {
            blendRight();
        }
        else if (display.rightActive == false) {
            display.right = display.transfer;
        }
        display.rightActive = true;
        i++;
        delay = true;
        setTimeout(nextPic, 1000);
    }
    else if (button.frown == true && delay == false) {
        if (display.leftActive == true) {
            blendLeft();
        }
        else if (display.leftActive == false) {
            display.left = display.transfer;
        }
        display.leftActive = true;
        i++;
        delay = true;
        setTimeout(nextPic, 1000);
    }
}
//toggle for boolean in delay function, keeps the user from blasting through all the images with a single button press
function nextPic() {
    delay = false;
}
// blends images for right and left side using a random blend mode corresponding to each side
// this feels like a convoluted way of doing it, but using a string variable wasn't working as an argument in the blend function so here we are ¯\_(-.-)_/¯
function blendRight() {
    blendType = int(random(1, 5));
    if (blendType == 1) {
        //takes the image on the right and combines it with the image from the center held in the display.transfer variable, check the p5 image blend reference for details
        display.right.blend(display.transfer, 0, 0, 205, 270, 0, 0, 205, 270, HARD_LIGHT);
        //if you want to know how the images are being combined then uncomment these console.log lines :-)
        //console.log("hard light");
    }
    else if (blendType == 2) {
        display.right.blend(display.transfer, 0, 0, 205, 270, 0, 0, 205, 270, SOFT_LIGHT);
        //console.log("soft light");
    }
    else if (blendType == 3) {
        display.right.blend(display.transfer, 0, 0, 205, 270, 0, 0, 205, 270, ADD);
        //console.log("add");
    }
    else if (blendType == 4) {
        display.right.blend(display.transfer, 0, 0, 205, 270, 0, 0, 205, 270, LIGHTEST);
        //console.log("lightest");
    }
    else if (blendType == 5) {
        display.right.blend(display.transfer, 0, 0, 205, 270, 0, 0, 205, 270, MULTIPLY);
        //console.log("multiply");
    }
}
//(i know that the right side is biased towards making bright or even all white images, but i kind of like it that way)

// same deal. other side. different blend modes.
function blendLeft() {
    blendType = int(random(1, 5));
    if (blendType == 1) {
        display.left.blend(display.transfer, 0, 0, 205, 270, 0, 0, 205, 270, DARKEST);
        //console.log("darkest");
    }
    else if (blendType == 2) {
        display.left.blend(display.transfer, 0, 0, 205, 270, 0, 0, 205, 270, BURN);
        //console.log("burn");
    }
    else if (blendType == 3) {
        display.left.blend(display.transfer, 0, 0, 205, 270, 0, 0, 205, 270, DODGE);
        //console.log("dodge");
    }
    else if (blendType == 4) {
        display.left.blend(display.transfer, 0, 0, 205, 270, 0, 0, 205, 270, DIFFERENCE);
        //console.log("difference");
    }
    else if (blendType == 5) {
        display.left.blend(display.transfer, 0, 0, 205, 270, 0, 0, 205, 270, SCREEN);
        //console.log("screen");
    }
}
// a nice gallery view of your works :D - draws the end screen then allows the code to break a bit later, making this the last rendered frame
function finalScreen() {
    background("#ffffffff");
    if (display.leftActive == true) {
        image(display.left, 30, 40, 328, 432);
    }
    if (display.rightActive == true) {
        image(display.right, 430, 40, 328, 432);
    }

}
