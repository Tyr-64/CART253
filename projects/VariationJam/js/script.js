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
let x = 0;
let y = 0;
let typing = '';
let gBuffer = undefined;
let iS = 0;
let iP = 0;
let wI = 0;
let pI = 0;
let i = 0;
let fill = 0;
let replace = 0;
let pushDist = 0;
let c = 0;
let build = 0;
let log = '';

let post = {
    width: 500,
    height: 400,
    image: undefined

}
let mid = {
    width: 500,
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
        width: 500,
        height: 400,
    },
    text: {
        boundH: 150,
        boundW: 200,
    },
}

function preload() {
    pre.image = loadImage('./assets/images/gargoylemid.jpg');
    post.image = createImage(post.width, post.height);
    mid.image = createImage(mid.width, mid.height);
    writing.image = createImage(writing.image.width, writing.image.height);
}
function setup() {
    createCanvas(600, 400);
    background(0);
    post.image.loadPixels();
    mid.image.loadPixels();
    pre.image.resize(pre.width, pre.height);
    pre.image.loadPixels();
    //image(pre.image, 0, 0);
    gBuffer = createGraphics(writing.image.width, writing.image.height);
    console.log(pre.image.pixels);
    c = mid.width * mid.height * 4;
    gBuffer.textSize(22);
    gBuffer.textLeading(13);
    gBuffer.fill('white');
    gBuffer.strokeWeight(2);
    gBuffer.stroke(0);
    gBuffer.textWrap(CHAR);
    gBuffer.textFont('Courier New');

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    gBuffer.text(typing, 50, 20, 300, 400);
    writing.image.copy(gBuffer, 0, 0, gBuffer.width, gBuffer.height, 0, 0, gBuffer.width, gBuffer.height);

    writing.image.loadPixels();
    for (wI = 0; wI < (writing.image.height * writing.image.width * 4); wI += 4) {
        for (pI = 0; pI <= 3; pI++) {
            mid.image.pixels[wI + pI] = writing.image.pixels[wI + pI];
        }
    }
    writing.image.loadPixels();

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
    //console.log(log);

    mid.image.updatePixels();
    if (c < (mid.width * mid.height * 4)) {
        // for (build = (mid.width * mid.height * 4); build > (mid.width * mid.height * 4) - c; build--) {
        //     post.image.pixels[build + c] = mid.image.pixels[build + c];
        //     post.image.pixels[build + c + (mid.width * 4)] = mid.image.pixels[build + c + (mid.width * 4)];
        //     // post.image.pixels[build + c + (mid.width * 8)] = mid.image.pixels[build + c + (mid.width * 8)];
        //     // post.image.pixels[build + c + (mid.width * 12)] = mid.image.pixels[build + c + (mid.width * 12)];
        //     // post.image.pixels[build + c + (mid.width * 16)] = mid.image.pixels[build + c + (mid.width * 16)];
        //     // post.image.pixels[build + c + (mid.width * 20)] = mid.image.pixels[build + c + (mid.width * 20)];
        // }
    }
    c -= 200;
    for (replace = (mid.height * mid.width * 4); replace > c; replace--) {
        post.image.pixels[replace] = mid.image.pixels[replace];
    }

    post.image.updatePixels();
    image(writing.image, 100, 0, writing.width, writing.height);
    image(post.image, 100, 0, post.width, post.height);
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
}

function sTp() {

}

function textAdd() {

}
function textGen() {
    //text('hello', 20, 20);
}