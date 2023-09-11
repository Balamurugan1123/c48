var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, redBubbleGroup, bulletGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("airplane1.png")
  redBubbleImg = loadImage("airplane2.png")
  skyImg= loadImage("sky.jpg")
  jetwebp = loadImage("jet.webp")
  airGroupImg = loadImage ("airplane3.png")
  jetGroupImg = loadImage ("jet.webp")

}    
function setup() {
  createCanvas(800, 600);

  sky= createSprite(300, height/2, 250,height);
  sky.addImage(skyImg)
  
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();
  airGroup = createGroup(); 
  jetGroup = createGroup();
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}


function gamewon(){
  if (score == 30){
    gameState = 3
    swal({
      title: `!!GOOD JOB!!`,
      text: "!!!You have won the game!!!",
      text: "Your Score is " + score,
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    },function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    });
  }

}

function draw() {
  background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)
  
  

  if(gameState===1){
    gun.y=mouseY  
    gamewon()
    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 80 === 0) {
      drawairGroup();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    
    if (frameCount % 80 === 0) {
        drawjetGroup();
    }

    
   

  

    if(keyDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(gun)){
      handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(gun)) {
      handleGameover(redBubbleGroup);
    }

    if (airGroup.collide(gun)){
      handleGameover(airGroup);
    }

    if (jetGroup.collide(gun)){
      handleGameover(jetGroup);
    }
    
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    if(airGroup.collide(bulletGroup)){
      handleBubbleCollision(airGroup);
    }
 

    if(jetGroup.collide(bulletGroup)){
      handleBubbleCollision(jetGroup);
    }


    
  }
  drawSprites();
  
}
function drawairGroup(){
  air = createSprite(800,random(20,550),40,40);
  air.addImage(airGroupImg);
  air.scale = 0.3;
  air.velocityX = -8;
  air.lifetime = 400;
  airGroup.add(air);
}

function drawjetGroup(){
  jet = createSprite(800,random(20,550),40,40);
  jet.addImage(jetGroupImg);
  jet.scale = 0.3;
  jet.velocityX = -15;
  jet.lifetime = 400;
  jetGroup.add(jet);
}

function drawblueBubble(){
  bluebubble = createSprite(800,random(20,550),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.3;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(800,random(20,550),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.3;
  redbubble.velocityX = -10;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

    blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0 && gameState == 1) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      },function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      });
    }
  
}

