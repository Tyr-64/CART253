/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

let movingToRight = true;

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 200,
    b: 200,
  }
};
let sky = {
    fill: {
        r: 160,
        g: 180,
        b: 200,
    },
}
let bird = {
    pos: {
        x: 100,
        y: 100,
    },
    fill: {
        r: 70,
        g: 70,
        b: 255,
    },
    stroke: {
        r: 255,
        g: 255,
        b: 255,
    },
    bodySize: {
        x: 40,
        y: 20,
    },
    wingSize: {
        x: 15,
        y: 40,
    },
    beakSize: {
        x: 10,
        y: 3,
    },
    beakFill: {
        r: 252,
        g: 115,
        b: 3,
    },
    velocity: 1
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}


/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(sky.fill.r, sky.fill.g, sky.fill.b);
  //make Mr Furious red over time
  mrFurious.fill.g /= 1.002;
  mrFurious.fill.b /= 1.002;
  //constrain Mr Furious' rage
  mrFurious.fill.g = constrain(mrFurious.fill.g, 90, 255);
  mrFurious.fill.g = constrain(mrFurious.fill.g, 90, 255);

  sky.fill.r /= 1.004;
  sky.fill.g /= 1.004;
  sky.fill.b /= 1.004;

  
  

  
  drawBird();




    if(movingToRight)
    {
        birdMoveR();

        if(bird.pos.x >= 300)
        {
            movingToRight = false;
        }
    }

    else if(!movingToRight)
    {
        birdMoveL();

        if(bird.pos.x <= 100)
        {
            movingToRight = true;
        }
    }

    //Make Mr.Furious shake from rage!
mrFurious.x = mrFurious.x + 1;

if (mrFurious.x == 210) {
mrFurious.x = mrFurious.x - 5;
}
else if (mrFurious.x == 200) {
mrFurious.x = mrFurious.x + 5;
}
  
  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();
  fill(0,0,0);
  rect(mrFurious.x+10, mrFurious.y-20, 20, 5);
  rect(mrFurious.x-30, mrFurious.y-20, 20, 5);
  rect(mrFurious.x-10, mrFurious.y+5, 20, 20);
  push();

}


// Draw the bird
function drawBird(){
    //draw the bird's body
   push();
   fill(bird.fill.r, bird.fill.g, bird.fill.b);
   noStroke();
   ellipse(bird.pos.x, bird.pos.y,bird.bodySize.x, bird.bodySize.y);
   //draw the bird's wings
   push();
   fill(bird.fill.r, bird.fill.g, bird.fill.b);
   noStroke();
   ellipse(bird.pos.x, bird.pos.y, bird.wingSize.x, bird.wingSize.y);
   //draw the bird's beak
   push();
   noStroke();
   fill(bird.beakFill.r, bird.beakFill.g, bird.beakFill.b);
   ellipse(bird.pos.x+20, bird.pos.y, bird.beakSize.x, bird.beakSize.y);
   pop();
   pop();
   pop();
   //draw the bird's eyes
   ellipse(bird.pos.x+10,bird.pos.y+3,3);
   ellipse(bird.pos.x+10,bird.pos.y-3,3);
}

    //move the bird right
    function birdMoveR (){
        bird.velocity += .15;
        bird.velocity = constrain(bird.velocity, -2, 2);
        bird.pos.x += bird.velocity;
    }
    //move the bird left
    function birdMoveL (){
        bird.velocity -= .15;
        bird.velocity = constrain(bird.velocity, -2, 2);
        bird.pos.x += bird.velocity;
    }