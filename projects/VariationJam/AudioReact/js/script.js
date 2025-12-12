/**
 * Waterfall visualizer
 * Willow Casinghino
 * 
 * An audio reactive visualizer tuned for the song Waterfall by Oneohtrix Point Never.
 * Plan to make the code more modular and dynamic in the future.
 */

"use strict";

/**
 * Establish variables and counters such as object properties and arrays to contain them
 * Preload assets like audio and 3d models
 * Setup creates the canvas and audio objects, including beat detectors with paramaters to determine their sensitivity
*/
let height = 900;
let width = 600;
let start = true;
let travel = {
    up: 0,
    x: 0,
    y: 0,
}
let detect = {
    bass: undefined,
    shimmer: undefined,
    harp: undefined,
    piano: undefined,
    marimba: undefined,
    harpsichord: undefined,
    handDrums: undefined,
}
// let timers = {
//     delay: 15,
//     one: {
//         on: false,
//         log: 0
//     },
//     two: {
//         on: false,
//         log: 0
//     },
//     three: {
//         on: false,
//         log: 0
//     },
//     four: {
//         on: false,
//         log: 0
//     },
//     five: {
//         on: false,
//         log: 0
//     },
//     six: {
//         on: false,
//         log: 0
//     },
// }
let endingCam = {
    x: 0,
    y: 0,
    z: 0,
    tilt: 0,
}
let object = {
    chair: {
        x: [],
        y: [],
        z: [],
        rotation: [],
    },
    desk: {
        x: [],
        y: [],
        z: [],
    },
    carpet: {
        x: [],
        y: [],
        z: [],
    },
    bed: {
        x: [],
        y: [],
        z: [],
    },
    window: {
        x: [],
        y: [],
        z: [],
    },
    shelf: {
        x: [],
        y: [],
        z: [],
    },
}
let sound = undefined;
let music = undefined;
let fft = undefined;
let ending = false;
let testun = 0;
let testdeux = undefined;
let chair = undefined;
let roomWindow = undefined;
let bed = undefined;
let secondClick = false;
let font = undefined;

function preload() {
    soundFormats('mp3');
    music = loadSound('./assets/sounds/waterfalls.mp3');
    chair = loadModel('./assets/models/simplechair.obj');
    roomWindow = loadModel('./assets/models/simplewindow.obj');
    bed = loadModel('./assets/models/simplebed.obj');
    font = loadFont('./assets/images/Inconsolata-Black.ttf');
}

function setup() {
    createCanvas(width, height, WEBGL);
    getAudioContext().suspend();
    sound = new p5.AudioIn();
    fft = new p5.FFT();
    music.play();
    detect.bass = new p5.peakDetect(30, 120, .965, 5);
    detect.shimmer = new p5.peakDetect('treble', undefined, .41, 5);
    detect.harp = new p5.peakDetect(1400, 2800, .6, 1);
    detect.piano = new p5.peakDetect(300, 800, .75, 5);
    detect.marimba = new p5.peakDetect(3200, 4000, .55, 1);
    detect.harpsichord = new p5.peakDetect(4000, 9000, .52, 5);
}


/**
 * Update all p5 audio objects as necessary for audio analysis, draws background, uses draw function to place objects and then places the camera
*/
function draw() {
    fft.smooth(.7);
    fft.analyze();
    background('black');
    orbitControl();
    detect.bass.update(fft);
    detect.shimmer.update(fft);
    detect.marimba.update(fft);
    detect.harpsichord.update(fft);
    detect.piano.update(fft);
    detect.harp.update(fft);
    beatDetect();
    drawScene();


    if (ending === false) {
        camera(0, travel.up - 40, -500, 0, travel.up - 40, 0);
    }
    if (millis() > 313000) {
        ending = true;
        camera(0 + endingCam.x, travel.up - 40, -(500 - endingCam.z), 0, travel.up - 40 + endingCam.tilt, 0 + endingCam.z / 6)
        endingCam.tilt += .3;
    }
    if (start === true) {
        push();
        textFont(font);
        textAlign(CENTER);
        fill('white');
        rotateY(PI);
        text('"Waterfall" - Oneohtrix Point Never \n Visualizer by Willow Casinghino \n Click to Start', -250, -100, 500, 500);
        pop();
    }
}
// start the music by clicking
function mousePressed() {
    userStartAudio();
    start = false;
}

// based on params in setup each detector becomes true if its over the threshold
// when detected creates an object by calling on createX functions
function beatDetect() {
    if (detect.bass.isDetected) {
        //this commented code was a way of smoothing out reactions for display, i didnt end up using it but want to keep an example for later. same reason the variables have been kept.
        //timers.one.on = true;
        //timers.one.log = frameCount;
        createCarpet();
    }
    //if (timers.one.on == true && frameCount - timers.one.log < 15) {

    //}
    // else {
    //     timers.one.on = false;
    // }
    if (detect.shimmer.isDetected) {
        createBed();
    }
    if (detect.marimba.isDetected) {
        createChair();
    }
    if (detect.harpsichord.isDetected && (ending === true)) {
        endingCam.x += 15;
        endingCam.z += 15;
    }
    if (detect.harp.isDetected) {
        createWindow();
    }
    // an alternate method of beat detection than the one p5 provides
    // detects change over time instead of a set threshold, makes it more dynamic (better for certain uses)
    if ((frameCount % 15) === 0) {
        testun = fft.getEnergy(1500, 11000);
    }
    if ((fft.getEnergy(1500, 10000) - testun) > 18) {
        travel.up -= 5;
    }
    if ((frameCount % 45) === 0) {
        testdeux = fft.getEnergy(1700, 16000);
    }
    if ((fft.getEnergy(1700, 16000) - testdeux) > 22) {
        travel.up -= 5;
    }
}
// each create function adds a new entry to arrays to describe its position and (for the chair) rotation. allows the objects to build up over time.
function createChair() {
    let xVal = random(100);
    let zVal = random(100);
    let rot = (random(2) * PI)
    object.chair.x.push(xVal);
    object.chair.z.push(zVal);
    object.chair.y.push(0 + travel.up);
    object.chair.rotation.push(rot);
}

function createWindow() {
    let xVal = random(120);
    let yVal = random(150);
    let zVal = 150;
    object.window.x.push(xVal - 60);
    object.window.z.push(zVal);
    object.window.y.push(yVal - 220 + travel.up);
}

function createBed() {
    let xVal = random(100);
    let zVal = random(50);
    object.bed.x.push(xVal - 120);
    object.bed.z.push(zVal);
    object.bed.y.push(0 + travel.up - 20);
}

function createCarpet() {
    let xVal = random(50);
    let zVal = random(50);
    object.carpet.x.push(xVal - 25);
    object.carpet.z.push(zVal);
    object.carpet.y.push(0 + travel.up + 10);
}
// this and a couple other objects arent used in the current project, but i intend on expanding this project with more detail
function createDesk() {
    let xVal = random(100);
    let zVal = random(20);
    object.desk.x.push(xVal);
    object.desk.z.push(zVal + 30);
    object.desk.y.push(0 + travel.up);
}

function createShelf() {
    let xVal = random(100);
    let zVal = random(100);
    object.desk.x.push(xVal);
    object.desk.z.push(zVal + 30);
    object.desk.y.push(0 + travel.up);
}
// draws the scene by building objects from each array, with some adjustments as needed for each model
function drawScene() {
    for (let i = 0; i < object.chair.x.length; i++) {
        push();
        translate(object.chair.x[i], object.chair.y[i], object.chair.z[i]);
        rotateX(PI);
        rotateY(object.chair.rotation[i]);
        scale(4);
        model(chair);
        pop();
    }
    for (let i = 0; i < object.window.x.length; i++) {
        push();
        translate(object.window.x[i], object.window.y[i], object.window.z[i]);
        scale(3);
        model(roomWindow);
        pop();
    }
    for (let i = 0; i < object.bed.x.length; i++) {
        push();
        translate(object.bed.x[i], object.bed.y[i], object.bed.z[i]);
        scale(5);
        rotateY(PI);
        model(bed);
        pop();
    }
    for (let i = 0; i < object.carpet.x.length; i++) {
        push();
        translate(object.carpet.x[i], object.carpet.y[i], object.carpet.z[i]);
        scale(4, .1, 3);
        box();
        pop();
    }
    for (let i = 0; i < object.desk.x.length; i++) {
        push();
        translate(object.desk.x[i], object.desk.y[i], object.desk.z[i]);
        scale(2, 1, 1);
        box();
        pop();
    }
    for (let i = 0; i < object.shelf.x.length; i++) {
        push();
        translate(object.shelf.x[i], object.shelf.y[i], object.shelf.z[i]);
        scale(1, 3, 1);
        box();
        pop();
    }
}