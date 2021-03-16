var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var cycleBell, pinkCG, yellowCG, redCG;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  gameoverImg = loadImage("gameOver.png");
  cycleBell = loadSound("sound/bell.mp3");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  pinkImg=loadAnimation("opponent1.png");
  redImg=loadAnimation("opponent7.png");
  yellowImg=loadAnimation("opponent4.png");
}

function setup(){
  
createCanvas(500,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -(6+2*distance/150);
  
  gameOver=createSprite(250,150);
  gameOver.addImage(gameoverImg);
  gameOver.visible=false;
  gameOver.scale=0.8;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
  yellowCG=new Group();
  redCG=new Group();
  pinkCG=new Group();
  
  
}

function draw() {
  background(0);
  
  
  
  var select = Math.round(random(1,3));
  
  if(frameCount % 150 === 0){
    if(select===1){
      pinkCyclists();
    }
    else if(select===2){
      redCyclists();
    }
    else{
      yellowCyclists();
    }
  }
  
  if(keyDown("space")){
    cycleBell.play();
  }
  
  //camera.position.x = width;
  camera.position.y = mainCyclist.y;

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
    
  distance = distance+Math.round(getFrameRate()/60);
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    
 
  
  if(mainCyclist.isTouching(pinkCG)){
    mainCyclist.velocityX=0;
    gameState=END;
  }
  
  if(mainCyclist.isTouching(yellowCG)){
    mainCyclist.velocityX=0;
    gameState=END;
  }
  
  if(mainCyclist.isTouching(redCG)){
    mainCyclist.velocityX=0;
    gameState=END;
  }
  }
  else if(gameState===END){
    pinkCG.destroyEach();
    path.velocityX=0;
    pinkCG.setLifetimeEach(-1);
    yellowCG.destroyEach();
    yellowCG.setLifetimeEach(-1);
    redCG.destroyEach();
    mainCyclist.velocityY=0;
    redCG.setLifetimeEach(-1);
    mainCyclist.addAnimation("ENDING",mainRacerImg2);
    pinkCG.setVelocityXEach(0);
    yellowCG.setVelocityXEach(0);
    redCG.setVelocityXEach(0);
    gameOver.visible=true;
    textSize(20);
    text("Press up arrow to restart game", 100,200);
    if(keyDown("up")){
      reset();
    }
  }
  
}

function pinkCyclists(){
  player1 = createSprite(1100,Math.round(random(50,250),10,10))
  player1.addAnimation("opp_player1", pinkImg);
  player1.scale=0.06;
  player1.lifetime=170;
  pinkCG.add(player1);
  player1.velocityX=-(6+2*distance/150);
}

function redCyclists(){
  player2 = createSprite(1100,Math.round(random(50,250),10,10))
  player2.addAnimation("opp_player2", redImg);
  player2.scale=0.06;
  player2.lifetime=170;
  redCG.add(player2);
  player2.velocityX=-(6+2*distance/150);
}

function yellowCyclists(){
  player3 = createSprite(1100,Math.round(random(50,250),10,10))
  player3.addAnimation("opp_player3", yellowImg);
  player3.scale=0.06;
  player3.lifetime=170;
  yellowCG.add(player3);
  player3.velocityX=-(6+2*distance/150);
}

function reset(){
  gameState=PLAY;
  pinkCG.destroyEach();
  redCG.destroyEach();
  yellowCG.destroyEach();
  gameOver.visible=false;
  distance=0;
}