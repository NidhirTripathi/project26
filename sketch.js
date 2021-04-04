var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var invisibleGround;
var PLAY =1;
var END =0;
var gamestate = PLAY ;
var gameover ;
var restart;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  groundImage=loadImage("download.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameoverImage=loadImage("download-1.png");
  restartImage=loadImage("280-2801511_reset-button-image-png.png");
}



function setup() {
  createCanvas(920,370);
  monkey=createSprite(100,300);
monkey.addAnimation("running",monkey_running);
  monkey.scale=0.10;
  
  gameover=createSprite(350,60);
  gameover.addImage(gameoverImage);
  gameover.scale=0.25
 
  restart=createSprite(350,160);
  restart.addImage(restartImage);
  restart.scale=0.05
  
  
  
  
  
  invisibleGround = createSprite(110,310,400,10);
  invisibleGround.visible = false;
  
  
  
  ground=createSprite(400,450,800,10);
  ground.shapeColor="brown";
  ground.velocityX=-20
  ground.addImage(groundImage)
  ground.scale=3.7
 ground.x = ground.width /2;
  ground.depth = monkey.depth;
    monkey.depth = ground.depth + 11;
 console.log(monkey.positionX)



survivaltime=0;
fruitate=0;
obstaclesGroup= new Group();
  FoodGroup=new Group();
}

function draw() {
  //monkey.setCollider("rectangle",-10,-30,monkey.width,monkey.height);
//monkey.debug = true
  
  

background("white");
  
  textSize(20)
  fill("red");
  text("Survival Time:"+survivaltime,500,20);
  text("Fruit ate:"+fruitate,510,40);
  
  survivaltime=survivaltime + 1;
   if (gamestate===PLAY){
      gameover.visible = false;
    restart.visible = false;
    
     
     
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
obstacle();
Bananas ();
     
  if (invisibleGround.x < 0){
      invisibleGround.x = invisibleGround.width/2;
    }
monkey.collide(invisibleGround)
monkey.velocityY=monkey.velocityY+0.9
  
  if(keyDown("space") && monkey.y >= 243){
    monkey.velocity.y=-15;
  monkey.velocityY=monkey.velocityY+0.9
}
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    fruitate=fruitate+1;
     }
  
    if(obstaclesGroup.isTouching(monkey)){
        gamestate = END;
    }
  }
  else if (gamestate === END) {
    gameover.visible = true;
    restart.visible = true;
    
    if (obstaclesGroup.isTouching(monkey)){
      obstaclesGroup.destroyEach();
       FoodGroup.destroyEach();
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(0);
    
      monkey.destroy();
      gameover.visible=true;
   restart.visible=true;
    ground.velocityX=0;
     
    
  }

 obstaclesGroup.lifetime=0
  
  }
  
  drawSprites();
}
function obstacle (){
if(frameCount%50===0){
 var obstacles=createSprite(920,270,20,20)  
  obstacles.velocityX=-21;
obstacles.scale=0.5;
  // var O = Math.round(random(1,2));
  //if (O===1){
obstacles.addImage(obstacleImage)
//obstacles.y=Math.round(random(0,300));
  obstacles.depth=ground.depth+2
  obstacles.lifetime=47
  obstacles.scale=0.20
  obstaclesGroup.add(obstacles);
  }
}
function Bananas (){
if(frameCount%50===0){
  var banana=createSprite(920,260,20,20)
  banana.y= Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.10;
    banana.velocityX = -20;
    banana.lifetime = 200;
     banana.depth = monkey.depth;
    monkey.depth = banana.depth + 11;
    FoodGroup.add(banana);}
function restart(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);

  score = 0;}}

