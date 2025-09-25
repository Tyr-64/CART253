/**
 * Circle Master
 * Pippin Barr
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
  x: 200,
  y: 200,
  size: 100,
  fill: "#ff0000"
};

let target = {
  x: 100,
  y: 100,
  size: 80,
  fill: "#34FF00",
}

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000"
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");



  // Move user circle
  moveUser();

  // Draw the user and puck


  drawTarget();
  drawUser();
  drawPuck();
  movePuck();
  checkTarget();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}

function movePuck() {
  let d = dist(user.x, user.y, puck.x, puck.y);
  let dX = puck.x - user.x;
  let dY = puck.y - user.y;
  console.log(dY);
  if (d < user.size) {
    console.log("touching");
    puck.x += dX / 15;
  }
  if (d < user.size) {
    puck.x += dX / 15;
  }
  if (d < user.size) {
    puck.y += dY / 15;
  }
}
function drawTarget() {
  push();
  fill(target.fill);
  ellipse(target.x, target.y, target.size);
  pop();
}
function checkTarget() {
  let dT = dist(puck.x, puck.y, target.x, target.y);
  if (dT < puck.size / 2) {
    target.fill = "#1e00ffff";
  }
  else {
    target.fill = "#34FF00";
  }
}
