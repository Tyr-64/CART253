/**
 * Lines
 * Willow Casinghino
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas and generates a rainbow gradient background using a for loop making lines with the HSL color system
 */

let bgLine = {
    hue: undefined,
    L: 0,
    R: 0
}
function setup() {
    colorMode(HSL, 250);
    createCanvas(500, 500);
    for (let y = 0; y<500; y++){
        bgLine.hue = map(y, 0, 500, 0, 250);
        stroke(bgLine.hue, 200, 100);
        line(0, bgLine.L, width, bgLine.R);
        bgLine.L ++;
        bgLine.R ++;
    }
}
let barV = {
    hue: 0,
    topX: 0,
    bottomX: 0
}
let barH = {
    hue: 0,
    L: 0,
    R: 0
}
/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {


    while (barV.hue < 250) {
        colorMode(RGB, 250);
        stroke(barV.hue);
        line(barV.topX, 0, barV.bottomX, height);
        barV.hue += 25;
        barV.topX += 50;
        barV.bottomX += 50;
        console.log(barV.hue);
    }
    while (barH.hue < 250) {
        colorMode(RGB, 250);
        stroke(barH.hue);
        line(0, barH.L, width, barH.R);
        barH.hue += 25;
        barH.L += 50;
        barH.R += 50;
        console.log(barH.hue);
    }
    
    

}