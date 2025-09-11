/**
 * Thinking like a computer with instructions
 * Pippin Barr
 *
 * An ultra simple example of instructions
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
  createCanvas(500, 500);
}

/**
 * Sets background, draws the eye
 */
function draw() {
 
  background("#D4F0F0");
  drawBird();
  drawLandscape();
  drawGrass();
  clouds();
  illuminatiHouse();
  
}
//Grassy Landscape with hills
function drawLandscape() {
  push();
  stroke(10,250,60);
  fill(10,250,60)
  ellipse(200,420,500,100);
  ellipse(300,420,480,180);
  rect(0,400,1000)
  pop();
}
// Grass Detailing
function drawGrass() {
  push();
  fill(10,200,100);
  stroke(10,200,100);
  rect(100,400,4,10);
  rect(120,390,4,10);
  rect(110,380,4,10);
  rect(400,450,4,10);
  rect(430,460,4,10);
  rect(422,455,4,10);
  pop();
}
// Very Fast Bird with Random Location
function drawBird() {
  //randomize location
  let xBird = random()*200+20;
  let yBird = random()*200+10;
  push();
  fill("#353131ff")
  ellipse(xBird,yBird,10,20);
  ellipse(xBird,yBird,25,10);
  pop();
  push();
  fill("#f78504ef");
  ellipse(xBird+10,yBird-5,20,5);
  pop();

}

function clouds() {
fill(255);
noStroke();

fill("ffffe6");
ellipse(80,55,50,50);
fill("#ffffcc");
ellipse(80, 55, 40, 40); // sun
fill("#ffeecc");
ellipse(80, 55, 30, 30);

// cloud shadow
fill(230);
ellipse(110, 110, 50, 50);
ellipse(110, 180, 20, 20);

ellipse(90, 150, 60, 60);
ellipse(130, 150, 60, 60);
ellipse(60, 170, 30, 30);
ellipse(155, 160, 30, 30);

ellipse(180, 170, 20, 20);

// cloud 1
fill(255);
ellipse(100, 100, 50, 50);
ellipse(100, 170, 20, 20);

ellipse(80, 140, 60, 60);
ellipse(120, 140, 60, 60);
ellipse(50, 160, 30, 30);
ellipse(145, 150, 30, 30);

ellipse(170, 160, 20, 20);

// cloud 2 shadow
fill(230);
ellipse(410, 210, 50, 50);
ellipse(410, 280, 20, 20);

ellipse(390, 250, 60, 60);
ellipse(430, 250, 60, 60);
ellipse(360, 270, 30, 30);
ellipse(455, 260, 30, 30);

ellipse(180, 170, 20, 20);

// cloud 2
fill(255);
ellipse(410, 200, 50, 50);
ellipse(410, 270, 20, 20);

ellipse(390, 240, 60, 60);
ellipse(430, 240, 60, 60);
ellipse(360, 260, 30, 30);
ellipse(455, 250, 30, 30);

ellipse(180, 160, 20, 20);



}
function illuminatiHouse(){

// House
push();
noStroke();
fill("#4f261cff");
rect(300, 50, 30, 100); // Chimney
fill("#92b787ff")
rect(150, 150, 200, 200) // house base
fill("#3a1907ff")
rect(225, 270, 50, 80) // door
fill("#c2f1e7ff")
ellipse(200, 225, 50) // window left
ellipse(300, 225, 50) // window right
pop();

// Roof
push();
noStroke();
fill("#0e6e0eff")
triangle(250, 50, 400, 180, 100, 180)
pop();

// Eye
push();
noStroke();
fill("#ffffff");
ellipse(250, 120, 100, 50);
fill("#000000");
ellipse(250, 120, 40, 50);
pop();

}

/**
 * Draws a creepy void eye
 */
//function drawEye() {
  // Eyeball
//  push();
//  noStroke();
//  fill("#ffffff");
//  ellipse(180, 160, 20);
//  pop();

  // Retina
//  push();
//  noStroke();
//  fill("#000000");
//  ellipse(180, 160, 5);
//  pop();
//}
