var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database(); //storing the firebase.database in 'database'
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('ball/position'); //added the node ball/position
  hypnoticBallPosition.on("value", readPosition, showError); //keeps on checking the value of the database
}

function draw(){
  background("white");
    if(position!==undefined){

    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0); //function is writePosition
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
  }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref("ball/position").set({
    "x":position.x+x,
    "y":position.y+y,
  })
}

function readPosition(data){
  position = data.val(); //reading position of the database
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database"); //if there is any error, that error message will appear on the console
}
