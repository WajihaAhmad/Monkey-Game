var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananasImage, obstacle, obstacleImage;
var bananasGroup, obstacleGroup;
var ground;
var invisibleGround;
var survivalTime;

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  obstacleImage = loadImage("obstacle.png");
  bananasImage = loadImage("banana.png");
 
}

function setup() {
  createCanvas(600,400);
  
  bananasGroup= createGroup();
  obstacleGroup= createGroup();
  
  monkey=createSprite(80,390,40,40)
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.12;
  
  invisibleGround=createSprite(300,390,600,10);
  invisibleGround.visible=false;
  
  ground=createSprite(300,390,600,10);

  survivalTime = 0;
  
}

function draw() {
  background("lightblue")
  textSize(20);
  fill("blue");
  text("Survival Time: "+survivalTime,410,40);
    
  if (gameState==1){
  survivalTime=Math.ceil(frameCount/frameRate());
     
  food();
  obstacles();
    
  monkey.velocityY = monkey.velocityY + 0.5
    
  monkey.collide(invisibleGround);
    
  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -15;
      }
    
   if (monkey.isTouching(bananasGroup)){
    bananasGroup[0].destroy();   
      } 
  }
  
  if (monkey.isTouching(obstacleGroup)){
    gameState=0;
    monkey.visible=false;
    obstacleGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    monkey.velocityY = 0;
  }
  
    drawSprites();
}

function food(){
  if (World.frameCount%60===0){
  banana=createSprite(400,200,20,20);
    banana.addImage(bananasImage);
    banana.y=Math.round(random(100,170));
    banana.scale=0.12;
    banana.velocityX=-(6);
    banana.setLifetime=100;
    bananasGroup.add(banana);
  }
}

function obstacles(){
  if (World.frameCount%200===0){
    obstacle=createSprite(600,340,40,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.25;
    obstacle.setLifetime=100;
    obstacle.velocityX=-(6);
    obstacleGroup.add(obstacle);
  }
}