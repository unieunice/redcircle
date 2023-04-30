//an array to store all particles
var particles = [];

//the strength of gravity on particles (they will float up)
var gravity = -0.025;

function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  
var backgroundImg;
function preload(){
  backgroundImg= loadImage("heic0206a.jpeg")
}

  
  //constantly create new particles at the mouse position
  createParticle(mouseX, mouseY);
  
  //iterate over all particles
  for (let i = particles.length - 1; i >= 0; i--) {
    
    //get the current particle and store into array
    let p = particles[i];
    
    //calculate the particle size according to its age
    let size = map(p.age, 0, p.lifespan, p.size, 0);
    
    //get the percentage that the particle is through its life span (0 - 1)
    let particlePercent = p.age/p.lifespan;
    
    //we will now use the above value to blend between two colors
    //(based on the age of the particle)
    let particleColor = lerpColor(color(255, 255, 255), color(255, 0, 0), particlePercent);
    
    //set the particle color
    fill(particleColor);
    
    //draw the particle
    ellipse(p.x, p.y, size);
    
    //update the particle's position
    let angle = map(particlePercent, 0, 1, 0, TWO_PI); //calculate angle based on percentage of lifespan
    let radius = p.distance * sin(angle); //calculate radius based on sine wave
    p.x = p.centerX + radius * cos(angle); //calculate x position based on cosine wave
    p.y = p.centerY + radius * sin(angle); //calculate y position based on sine wave
    
    //add gravity to the particle's y-axis direction
    p.directionY += gravity;
    
    //increase the particle's age by 1 each frame
    p.age++;
    
  }
}

//this function will create a new particle and add it to the array
function createParticle(pX, pY) {
  
  let p = {
    centerX: pX,
    centerY: pY,
    distance: random(50, 100),
    directionY: random(-0.1, 0.1),
    size: random(8, 24),
    lifespan: random(60, 120),
    age: 0
  }
  
  particles.push(p);
}
