/**
 * Overflow(?)
 * Willow Casinghino
 * 
 * Dynamic image warper, see how you subject loses form the more you engage with it. try writing some poetry.
 */

"use strict";

/**
 * set up important variables like counters and images
*/

// incrementers
let iS = 0;
let wI = 0;
let pI = 0;
let i = 0;
let pushDist = 0;
let c = 0;
let build = 0;
let replace = 0;
// image objects storing variables, note that the math doesn't play nice with inconsistent or odd sizes
let clown = {
    image: undefined,
    x: 100,
    y: 100,
    on: false,
    width: 0,
    height: 0,
}

let post = {
    width: 600,
    height: 400,
    image: undefined

}
let mid = {
    width: 600,
    height: 400,
    image: undefined

}
let pre = {
    buffer: undefined,
    width: 400,
    height: 400,
    image: undefined

}
let writing = {
    image: {
        width: 600,
        height: 400,
    },
    text: {
        boundH: 150,
        boundW: 200,
    },
    // font settings here
    size: 23,
    leading: 14.9,
    fill: 'white',
    sWeight: 2,
    strokeVal: 0,
    wrapType: 'CHAR',
    font: 'Courier New',
}
// variables important for image drawing process
let typing = '';
let capture = undefined;
let video = true;
let fileBuffer = {
    bg: undefined,
    sticker: undefined,
    sSize: undefined,
}
let gBuffer = undefined;
let cBuffer = undefined;
let sBuffer = undefined;

function preload() {
    pre.image = createImage(pre.width, pre.height);
    clown.image = loadImage('./assets/images/clown.png');
    post.image = createImage(post.width, post.height);
    mid.image = createImage(mid.width, mid.height);
    writing.image = createImage(writing.image.width, writing.image.height);
}
// set up canvas and fill in background, load pixels to create their pixel arrays, create the graphics buffers for elements that need to be converted to images,
//  set up the text properties for gBuffer, set up the video capture that will go into cBuffer, set up file handler to call function if file is dropped on canvas
function setup() {
    createCanvas(700, 400);
    let bg = createImg('./assets/images/bgchange.png', 'drop here to change background');
    //bg.size(300, AUTO);
    bg.position(windowWidth / 2 - 650, windowHeight / 2 - 150);
    let sticker = createImg('./assets/images/stchange.png', 'drop here to change the sticker');
    sticker.position(windowWidth / 2 + 350, windowHeight / 2 - 150);
    background(0);
    post.image.loadPixels();
    mid.image.loadPixels();
    pre.image.loadPixels();
    gBuffer = createGraphics(writing.image.width, writing.image.height);
    cBuffer = createGraphics(pre.width, pre.height);
    console.log(pre.image.pixels);
    c = mid.width * mid.height * 4;
    gBuffer.textSize(writing.size);
    gBuffer.textLeading(writing.leading);
    gBuffer.fill(writing.fill);
    gBuffer.strokeWeight(writing.sWeight);
    gBuffer.stroke(writing.strokeVal);
    gBuffer.textWrap(writing.wrapType);
    gBuffer.textFont(writing.font);
    capture = createCapture(VIDEO);
    capture.size = (pre.width, pre.height);
    capture.hide();
    bg.drop(bgFile);
    sticker.drop(stickerFile);
}


/**
 * Call on functions to draw text, generate warped image from text, and do a progressive scan-line reveal of the image
*/
function draw() {
    // uses video input by default, drag and drop image onto canvas to use image instead
    if (video == true) {
        cBuffer.image(capture, 0, 0);
    }
    else if (video == false) {
        cBuffer.image(fileBuffer.bg, 0, 0, pre.width, pre.height);
    }
    pre.image.copy(cBuffer, 0, 0, pre.width, pre.height, 0, 0, pre.width, pre.height);
    pre.image.loadPixels();
    // draw stickers with animation (with a little clown surprise)
    drawSticker();
    // generate text by making an image from a graphics buffer, which then copies its array data to the midway buffer 
    textGenerate();
    // scans through midway buffer. if no live pixel then copy the pre image to itself as normal. if there is a live pixel then skip over it but do not move through pre image data.
    // keep placing until the horizontal line of pre image data is finished, then start a new line while removing the distance of pixels added from the text
    moveNwarp();
    // copy the midway image to the post image progressively to create a reveal effect. it still updates after its finished. rSpeed param controls the reveal speed (1-100 or so)
    reveal(5.2);

}


function textGenerate() {
    gBuffer.text(typing, 50, 20, 300, 400);
    writing.image.copy(gBuffer, 0, 0, gBuffer.width, gBuffer.height, 0, 0, gBuffer.width, gBuffer.height);

    writing.image.loadPixels();
    for (wI = 0; wI < (writing.image.height * writing.image.width * 4); wI += 4) {
        for (pI = 0; pI <= 3; pI++) {
            mid.image.pixels[wI + pI] = writing.image.pixels[wI + pI];
        }
    }
    writing.image.updatePixels();

}

function moveNwarp() {
    for (i = 0; i <= (mid.width * mid.height * 4); i += 4) {
        if (writing.image.pixels[i + 3 + iS - ((mid.width - pre.width) * 4)] === 0) {
            mid.image.pixels[i + iS - ((mid.width - pre.width) * 4)] = pre.image.pixels[i];
            mid.image.pixels[i + 1 + iS - ((mid.width - pre.width) * 4)] = pre.image.pixels[i + 1];
            mid.image.pixels[i + 2 + iS - ((mid.width - pre.width) * 4)] = pre.image.pixels[i + 2];
            mid.image.pixels[i + 3 + iS - ((mid.width - pre.width) * 4)] = pre.image.pixels[i + 3];

        }
        else {
            pushDist += 4;
            iS += 4;
        }
        if (i % (pre.width * 4) === 0) {
            iS -= pushDist;
            iS += ((mid.width - pre.width) * 4);
            pushDist = 0;
        }
    }
    iS = 0;
    mid.image.updatePixels();
}

function reveal(rSpeed) {
    c -= (rSpeed * 100);
    for (replace = (mid.height * mid.width * 4); replace > c; replace--) {
        post.image.pixels[replace] = mid.image.pixels[replace];
    }

    post.image.updatePixels();
    image(writing.image, 150, 0, writing.width, writing.height);
    image(post.image, 150, 0, post.width, post.height);
}
function drawSticker() {
    if (clown.on == true && clown.width < 100) {
        push();
        gBuffer.imageMode(CENTER);
        clown.width++;
        clown.height++;
        gBuffer.image(clown.image, clown.x, clown.y, clown.width, clown.height);
        pop();
        if (clown.width == 100) {
            clown.on = false;
            clown.width = 0;
            clown.height = 0;
        }
    }
}
// take in file data and put it in buffer (its an HTML element and not a regular image so it needs to go into a graphics buffer first)
function bgFile(file) {
    if (file.type === 'image') {
        video = false;
        fileBuffer.bg = createImg(file.data, '');
        fileBuffer.bg.hide();
    }
}
function stickerFile(file) {
    if (file.type === 'image') {
        fileBuffer.sticker = createImg(file.data, '', undefined, setSticker);
    }
}
function setSticker() {
    fileBuffer.sSize = fileBuffer.sticker.size();
    fileBuffer.sticker.hide();
    sBuffer = createGraphics(pre.height / 2, pre.width / 2);
    clown.image = createImage(pre.width / 2, pre.width / 2);
    console.log(fileBuffer.sSize.width);
    sBuffer.image(fileBuffer.sticker, 0, 0, pre.width / 2, fileBuffer.sSize.height * ((pre.width / 2) / fileBuffer.sSize.width));
    clown.image.copy(sBuffer, 0, 0, pre.width / 2, pre.height / 2, 0, 0, pre.width / 2, pre.width / 2);
    console.log(fileBuffer.sSize.height * ((pre.width / 2) / fileBuffer.sSize.width));

}
// typing detection. with some extras
function keyTyped() {
    if (key === 'a') {
        typing += 'a';
    }
    else if (key === 'b') {
        typing += 'b';
    }
    else if (key === 'c') {
        typing += 'c';
    }
    else if (key === 'd') {
        typing += 'd';
    }
    else if (key === 'e') {
        typing += 'e';
    }
    else if (key === 'f') {
        typing += 'f';
    }
    else if (key === 'g') {
        typing += 'g';
    }
    else if (key === 'h') {
        typing += 'h';
    }
    else if (key === 'i') {
        typing += 'i';
    }
    else if (key === 'j') {
        typing += 'j';
    }
    else if (key === 'k') {
        typing += 'k';
    }
    else if (key === 'l') {
        typing += 'l';
    }
    else if (key === 'm') {
        typing += 'm';
    }
    else if (key === 'n') {
        typing += 'n';
    }
    else if (key === 'o') {
        typing += 'o';
    }
    else if (key === 'p') {
        typing += 'p';
    }
    else if (key === 'q') {
        typing += 'q';
    }
    else if (key === 'r') {
        typing += 'r';
    }
    else if (key === 's') {
        typing += 's';
    }
    else if (key === 't') {
        typing += 't';
    }
    else if (key === 'u') {
        typing += 'u';
    }
    else if (key === 'v') {
        typing += 'v';
    }
    else if (key === 'w') {
        typing += 'w';
    }
    else if (key === 'x') {
        typing += 'x';
    }
    else if (key === 'y') {
        typing += 'y';
    }
    else if (key === 'z') {
        typing += 'z';
    }
    else if (keyCode === 32) {
        typing += ' ';
    }
    else if (keyCode === 190) {
        typing += '.';
    }
    else if (keyCode === 191) {
        typing += '?';
    }
    else if (keyCode === 13) {
        typing += '                       \n';
    }
    else if (keyCode === 49) {
        typing += '1';
    }
    else if (keyCode === 50) {
        typing += '2';
    }
    else if (keyCode === 51) {
        typing += '3';
    }
    else if (keyCode === 52) {
        typing += '4';
    }
    else if (keyCode === 53) {
        typing += '5';
    }
    else if (keyCode === 54) {
        typing += '6';
    }
    else if (keyCode === 55) {
        typing += '7';
    }
    else if (keyCode === 56) {
        typing += '8';
    }
    else if (keyCode === 57) {
        typing += '9';
    }
    else if (keyCode === 48) {
        '0'
    }

}
function mousePressed() {
    clown.on = true;
    clown.width = 0;
    clown.height = 0;
    clown.x = mouseX - 150;
    clown.y = mouseY;
}