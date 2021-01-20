//Create variables here
var dog, happyDog, database, foodS, foodStock,foodObj;
var fedTime,lastFed;
var feed,addFood;
function preload()
{
  //load images here
  hungryDog = loadImage("Dog.png");
  fullDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);
  dog = createSprite(800,200);
  dog.addImage("hungry",hungryDog);
  dog.addImage("full",fullDog);
  dog.scale = 0.15;

  foodObj = new Food();

  foodStock=database.ref('Food/foodStock');
  foodStock.on("value",function(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
  });

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}



function draw() {  

  fedTime=database.ref('Food/lastFed');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  background(46,139,87);
  
  drawSprites();

  //add styles here
foodObj.display();
if(lastFed!=null){
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  }
}

function feedDog(){
  dog.addImage(fullDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('Food/').update({
    foodStock:foodObj.getFoodStock(),
    lastFed:hour()
})
}

function addFoods(){
  foodS++;
  database.ref('Food/').update({
    foodStock:foodS
  })
}


 


