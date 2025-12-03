/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
let typing = '';
let gBuffer = undefined;
// incrementers
let iS = 0;
let wI = 0;
let pI = 0;
let i = 0;
let fill = 0;
let replace = 0;
let pushDist = 0;
let c = 0;
let build = 0;
let log = '';
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
    size: 23,
    leading: 14.9,
    fill: 'white',
    sWeight: 2,
    strokeVal: 0,
    wrapType: 'CHAR',
    font: 'Courier New',
}
let capture = undefined;
let cBuffer = undefined;
let video = true;
let fileBuffer = undefined;

function preload() {
    //pre.image = loadImage('./assets/images/turntable.jpg');
    pre.image = createImage(pre.width, pre.height);
    clown.image = loadImage('./assets/images/clown.png');
    post.image = createImage(post.width, post.height);
    mid.image = createImage(mid.width, mid.height);
    writing.image = createImage(writing.image.width, writing.image.height);
}
function setup() {
    let p = createCanvas(700, 400);
    background(0);
    post.image.loadPixels();
    mid.image.loadPixels();
    //pre.image.resize(pre.width, pre.height);
    pre.image.loadPixels();
    //image(pre.image, 0, 0);
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
    p.drop(handleFile);
}


/**
 * Call on functions to draw text, generate warped image from text, and do a progressive scan-line reveal of the image
*/
function draw() {
    if (video == true) {
        cBuffer.image(capture, 0, 0);
    }
    else if (video == false) {
        cBuffer.image(fileBuffer, 0, 0, pre.width, pre.height);
    }
    pre.image.copy(cBuffer, 0, 0, pre.width, pre.height, 0, 0, pre.width, pre.height);
    pre.image.loadPixels();
    // a little clown treat.
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
    // generate text by making an image from a graphics buffer, which then copies its array data to the midway buffer 
    textGenerate();
    // scans through midway buffer. if no live pixel then copy the pre image to itself as normal. if there is a live pixel then skip over it but do not move through pre image data.
    // keep placing until the horizontal line of pre image data is finished, then start a new line while removing the distance of pixels added from the text
    moveNwarp();
    // copy the midway image to the post image progressively to create a reveal effect. it still updates after its finished. rSpeed param controls the reveal speed (1-20 or so)
    reveal(1);

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
function handleFile(file) {
    if (file.type === 'image') {
        video = false;
        fileBuffer = createImg(file.data, '');
        fileBuffer.hide();
    }
}

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
        typing += '💥';
    }
    else if (keyCode === 50) {
        typing += '🧊';
    }
    else if (keyCode === 51) {
        typing += '🕴️';
    }
    else if (keyCode === 52) {
        typing += '👍';
    }
    else if (keyCode === 53) {
        typing += '💿';
    }
    else if (keyCode === 54) {
        typing += '🌱';
    }
    else if (keyCode === 55) {
        typing += '♦️';
    }
    else if (keyCode === 56) {
        typing += '💫';
    }
    else if (keyCode === 57) {
        typing += '💋';
    }
    else if (keyCode === 48) {
        clown.on = true;
        clown.x = random(300) + 50;
        clown.y = random(300) + 50;
    }
}