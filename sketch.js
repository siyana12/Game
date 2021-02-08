const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint = Matter.Constraint;

var HWI, book1, girlI, book2, book3, book4;
var girl;
var score = 0;
function setup(){
  var canvas = createCanvas(800,500)
  engine = Engine.create();
  world = engine.world;

  ground = createSprite(400, 250);
  ground.addImage(HWI); 
  ground.scale = 1.5;

  girl = createSprite(350,400, 10, 20);
  girl.addImage(girlI);
  girl.scale = 0.5;

  booksGroup = new Group();
   
}

function preload(){
  HWI=loadImage("Images/hallway.jpg");
  book1=loadImage("Images/Gray_book.png");
  girlI=loadImage("Images/GirlRunning.png");
  book2=loadImage("Images/greenbook.png");
  book3=loadImage("Images/bluebook.png");
  book4=loadImage("Images/unnamed (1).png")
}

function draw(){
   background("white")

   Engine.update(engine);

   if(keyDown("left_arrow")){
    girl.velocityX=-5;
  }
   if(keyDown("right_arrow")){
    girl.velocityX=5;
  }
  
   if(keyDown("space")){
    girl.velocityY=-5;
  }

  if(girl.isTouching(booksGroup)){
    booksGroup.destroyEach();
    score=score+1;
    }
    text("Score = " + score, 600,100);
   spawnBooks();
   drawSprites(); 
}

function spawnBooks(){
    if (frameCount % 80 === 0){
      var books = createSprite(350,20,5,20);
      books.x = Math.round(random(140,710));
      books.velocityY = 3 ;
   
       // //generate random obstacles
       var rand = Math.round(random(1,4));
       switch(rand) {
         case 1: books.addImage(book1);
                 break;
         case 2: books.addImage(book2);
                 break;
         case 3: books.addImage(book3);
                 break;
         case 4: books.addImage(book4);
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       books.scale = 0.1;
       books.lifetime = 500;
      
      //adding obstacles to the group
      booksGroup.add(books);
    }
}
