//Create variables here
var dog;
var dogHappy;
var foodS;
var foodStock;

function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {

  database = firebase.database();
  createCanvas(500, 500);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  
}


function draw() {  
  background(46,139,87);

  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg1);
  dog.scale = 0.150;

 if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg2);
  }

  drawSprites();
  //add styles here
  fill("white");
  text("Food remaining:"+foodS,200,100);
}

function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if (x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



