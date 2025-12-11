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
let height = 900;
let width = 1600;
let ball = {
    x: 500,
    y: 500,
    width: 150,
    color: 'black',
    one: 0,
    two: 0,
    three: 0,
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
let rectReact = {
    a: 10,
    b: 10,
    c: 10,
    d: 10,
    e: 10,
}
let sound = undefined;
let soundLvl = 0;
let sources = undefined;
let music = undefined;
let fft = undefined;
let spectrum = undefined;
let peakDetect = undefined;
let beat = false;
let last_done = 0;
let delay = 190;
let rectX = 100;
let secondPress = false;
let jumper = 10;

function preload() {
    soundFormats('mp3');
    music = loadSound('./assets/sounds/waterfalls.mp3');
}

function setup() {
    createCanvas(width, height);
    getAudioContext().suspend();
    sound = new p5.AudioIn();
    //sound.start();
    fft = new p5.FFT();
    fft.setInput(music);
    music.play();
    detect.bass = new p5.peakDetect(30, 120, .965, 5);
    detect.shimmer = new p5.peakDetect('treble', undefined, .41, 5);
    detect.harp = new p5.peakDetect(1400, 2800, .6, 1);
    detect.piano = new p5.peakDetect(300, 800, .75, 5);
    detect.marimba = new p5.peakDetect(3200, 4000, .55, 1);
    detect.harpsichord = new p5.peakDetect(8000, 13650, .328, 3);
    //sound.setSource(4);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    fft.smooth(.6);
    fft.analyze();
    spectrum = fft.linAverages(500);
    detect.bass.update(fft);
    detect.shimmer.update(fft);
    detect.marimba.update(fft);
    detect.harpsichord.update(fft);
    detect.piano.update(fft);
    detect.harp.update(fft);
    background('black');
    ball.one = fft.getEnergy('bass');
    ball.two = fft.getEnergy('lowMid');
    ball.three = fft.getEnergy('treble');
    circle(ball.x - 200, height / 2 - ball.one, ball.width);
    circle(ball.x, height / 2 - ball.two, ball.width);
    circle(ball.x + 200, height / 2 - ball.three, ball.width);
    text(getAudioContext().state, 1600 / 2, 900 / 2);
    beatDetect();
    for (let i = 0; i < spectrum.length; i++) {
        let x = i * 3//map(log(i), 0, log(spectrum.length), 0, width);
        let h = map(spectrum[i], 0, 255, 0, height);
        let rectangle_width = 3 //(log(i + 1) - log(i)) * (width / log(spectrum.length));
        rect(x, height, rectangle_width, -h / 2);
        // push();
        fill('white');
        //pop();
    }
    text(map(mouseX, 0, width - 100, 0, 20000), 20, 20);
    text(map(mouseX, 0, width - 100, 0, 1024), 180, 20);
    text(jumper, 380, 20);
    rect(rectReact.a, 100, 50, 100);
    rect(rectReact.b, 200, 50, 100);
    rect(rectReact.c, 300, 50, 100);
    rect(rectReact.d, 400, 50, 100);
    rect(rectReact.e, 500, 50, 100);
}

function mousePressed() {
    userStartAudio();
    //console.log('audio started');
    if (secondPress === true) {
        music.jump(jumper);
        jumper += 50;
    }
    secondPress = true;
}

function beatDetect() {
    if (detect.bass.isDetected) {
        rectReact.a += 1;
    }
    if (detect.shimmer.isDetected) {
        rectReact.b += 1;
    }
    if (detect.marimba.isDetected) {
        rectReact.c += 1;
    }
    if (detect.harpsichord.isDetected && millis() > 313000) {
        rectReact.d += 1;
    }
    // if (fft.getEnergy(1400, 2800) > 145) {
    //     rectReact.e += 1;
    // }
    if (detect.harp.isDetected) {
        rectReact.e += 1;
    }
}