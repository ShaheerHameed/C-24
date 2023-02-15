const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

let engine;
let world;
let ground;
let towerImg, cannon, backgroundImg;
let angle;
let cannonBall
let balls = []

function preload() {

  towerImg = loadImage("assets/tower.png")
  backgroundImg = loadImage("assets/background.gif")


}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create()
  world = engine.world

  var options = {
    isStatic: true
  }
  angleMode(DEGREES)
  angle = 15

  ground = Bodies.rectangle(0, 599, 1500, 1, options)
  World.add(world, ground)

  tower = Bodies.rectangle(160, 350, 160, 310, options)
  World.add(world, tower)

  cannon = new Cannon(180, 110, 130, 100, angle)

}


function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height)
  Engine.update(engine)

  rect(ground.position.x, ground.position.y, 1500, 1)

  push()
  imageMode(CENTER)
  image(towerImg, tower.position.x, tower.position.y, 160, 310)
  pop()

  cannon.display();
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i])
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y)
    cannonBall.trajectory=[]
    Matter.Body.setAngle(cannonBall.body, cannon.angle)
    balls.push(cannonBall)
  }
}

function showCannonBalls(ball) {
  if (ball) {
    ball.display()
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length-1].shoot()
  }
}