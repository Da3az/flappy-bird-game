
var player = "unnamed"
var level = 0

var nameBtn = document.getElementById('name')
var nameInput = document.getElementById('player-name')

nameBtn.addEventListener('click',function(){
  player = nameInput.value
  console.log(player)
})


var winh = window.innerHeight
var winw = window.innerWidth

function levelUp(){
  var condition = score / 5
  console.log(condition)
  if(condition - Math.floor(condition) == 0){
  level += 1
  if(gap > 80){
    gap -= 10
  }
  speed += 0.5
  console.log('levele up')
} }


// window.addEventListener("resize", () => {
//   console.log("resized")
//   winh = window.innerHeight
//   winw = window.innerWidth
//   cvs.height = window.innerHeight*0.6
//   cvs.width = window.innerHeight*0.4
//   if(pipes[0].x < cvs.width){
//     for(i = 0; i < pipes.length; i++){
//      ctx.drawImage(bgImg,0,0,cvs.width,cvs.height*0.9)
//      ctx.drawImage(northPipe, pipes[i].x, pipes[i].y, 50,cvs.height*0.8)
//      ctx.drawImage(southPipe, pipes[i].x, pipes[i].y+cvs.height*0.8+gap, 50, cvs.height*0.8)
//      ctx.drawImage(birdImg,20,Yb,cvs.width*0.07,cvs.width*0.07)
//      ctx.drawImage(fgImg,0,cvs.height*0.9,cvs.width,cvs.height*0.1)
//      }
//   } else {
//     theme()
//   }
//  });


var stop = document.getElementById("stop");
var start = document.getElementById("start");
var change = document.getElementById("change");

var container = document.getElementById("play-container");
var scoreBoard = document.getElementById("score-board")





//Get and set scores
var scores =  JSON.parse(localStorage.getItem("scores"))
function initialize(){
  scores.forEach( (score) => {
    var scoreElement = document.createElement('li')
    scoreElement.innerText = `${score[1]} by ${score[0]}`
    scoreBoard.append(scoreElement)
   })
  console.log(scoreBoard)
}
if(scores != null){
  initialize()
 } else {
  scores = []
}

var cvs = document.createElement("canvas");
cvs.height = window.innerHeight*0.6
cvs.width = window.innerHeight*0.8*0.6
cvs.style.border = "blue groove"
var ctx = cvs.getContext("2d");
//
function makeImage(src){
    var img = new Image()
    img.src = src
    return img
  }

var southPipe = makeImage("images/southPipe.png")
var northPipe = makeImage("images/northPipe.png")

var birdFly = makeImage("images/flappybj.png")


var gap = 160
var speed = 3
var gravity = 1.2
var jump = 30
var jumpon = 0
var Yb = (cvs.height*0.9 - gap)/2
var pipes = [{
 x: cvs.width,
 y: -(cvs.height*0.3+gap/2)
}]
var score = 0
var restart = 0
var restartBtn = document.getElementById('restart')

document.addEventListener("keydown",(e) => {
  if (e.key == 'w') {
       Yb -= jump
       jumpon = 1
     return;
   }
});
document.addEventListener("keydown",(e) => {
  if (e.key == 's') {
     Yb += jump
     jumpon = 1
   return;
  }

});

function theme(){
  ctx.drawImage(bgImg,0,0,cvs.width,cvs.height*0.9)
  ctx.drawImage(birdImg,20,Yb,cvs.width*0.07,cvs.width*0.07)
  ctx.drawImage(fgImg,0,cvs.height*0.9,cvs.width,cvs.height*0.1)
  container.append(cvs)
}
theme()

function addScore(oldScores,newScore){
  scoreBoard.textContent = ''
  if(oldScores.length){
  var newScores = [...oldScores,[player,newScore]]
  } else {
  var newScores = [[player,newScore]]
   }
    newScores.sort( (x,y) => y[1] - x[1])
    if(newScores.length > 10){
      newScores = newScores.slice(0,10)
    }
    console.log(JSON.stringify(newScores))
    newScores.forEach( (score) => {
      console.log(JSON.stringify(score))
      var scoreElement = document.createElement('li')
      scoreElement.innerText = `${score[1]} by ${score[0]}`
      scoreBoard.append(scoreElement)
     })
     console.log(scoreBoard)
     localStorage.setItem("scores", JSON.stringify(newScores));
         return newScores
}

start.addEventListener('click',()=>{
 change.disabled = true
 nameBtn.disabled = true
 console.log(scores)
 if(lose){
   console.log(lose)
   pipes = [{
    x: cvs.width,
    y: -(cvs.height*0.3+gap/2)
    }]
   Yb = (cvs.height*0.9 - gap)/2
   score = 0
   lose = 0
   draw()
 }
 else if(cel){
  cel = 0
  draw()
 }
})
restartBtn.addEventListener('click',()=>{
  change.disabled = false
  nameBtn.disabled = false
  pipes = [{
   x: cvs.width,
   y: -(cvs.height*0.3+gap/2)
   }]
  Yb = (cvs.height*0.9 - gap)/2
  score = 0
  lose = 0
  cel = 1
  draw()
 }
 )

function motion(ms) {
  return new Promise(resolve => setTimeout(resolve, ms) )
}
var time = 0
var nmotion = -1

 async function draw(){

  function cancel(){
    if (cel){
      return true
    } else {
      return false
    }
  }
  function losed(){
    console.log('losed--------')
    console.log(scores)
    console.log(score)
    console.log("---------")
   scores = addScore(scores,score)
   ctx.textAlign = "start";
   ctx.fillText("Score : "+score,100,cvs.height-20);
   lose = 1
   return lose
  }

  ctx.drawImage(bgImg,0,0,cvs.width,cvs.height*0.9)
  for(i = 0; i < pipes.length; i++){
    if(pipes[i].x > 0){
        ctx.drawImage(northPipe, pipes[i].x, pipes[i].y, 50,cvs.height*0.8)
        ctx.drawImage(southPipe, pipes[i].x, pipes[i].y+cvs.height*0.8+gap, 50, cvs.height*0.8)
        pipes[i].x -= speed
        if((pipes[i].x - cvs.width * 0.5) <= speed ){
         if((pipes[i].x - cvs.width*0.5) > 0){
         pipes.push({
           x: cvs.width,
           y: -cvs.height*0.7 + Math.floor(Math.random()*cvs.height*0.4)
         })


         }
        }
        if(Yb >= pipes[i].y+cvs.height*0.8+gap -20){
          if( pipes[i].x  < 50){
            losed()
            var message = 'Bird on the southPipe'
          }
       }
        if((Yb <= pipes[i].y+cvs.height*0.8-5) && (pipes[i].x  < 50) ){
           losed()
           var message = 'Bird on the northPipe'
       }
        if((pipes[i].x ) < speed){
         if((pipes[i].x  ) >= 0){
          score += 1
          levelUp()
         }
        }
      }
    }
    if( Yb >= cvs.height*0.88){
     losed()
     var message = 'Bird on the ground'
    }
    if(nmotion >= 0){
        time = new Date()
        // console.log(Math.abs(time.getMilliseconds() - nmotion))
        if((Math.abs(time.getMilliseconds() - nmotion)) < 100){
          console.log(time.getMilliseconds() )
           ctx.drawImage(birdFly,20,Yb,cvs.width*0.07,cvs.width*0.07)
        } else {
          nmotion = -1
        }
    } else {
      // console.log('else')
      ctx.drawImage(birdImg,20,Yb,cvs.width*0.07,cvs.width*0.07)
    }
    ctx.drawImage(fgImg,0,cvs.height*0.9,cvs.width,cvs.height*0.1)
    Yb += gravity
    // if(jumpon){
    //   time = new Date();
    //   nmotion = time.getMilliseconds();
    //   console.log('on jump')
    //   console.log(nmotion)
    //   // ctx.drawImage(birdFly,20,Yb,cvs.width*0.07,cvs.width*0.07)
    //   // await motion(500)
    //   jumpon = 0
    // }
    ctx.textAlign = "start";
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    ctx.textAlign = "start";
    ctx.fillText("Level : "+level,cvs.width*0.7,cvs.height-20);

    if(!cancel() && !lose && !restart){
      requestAnimationFrame(draw)
    }


     if(lose){
       level = 0
       gap = 160
       speed = 3
       ctx.fillStyle = "#FF0000";
       ctx.font = "20px Verdana";
       ctx.textAlign = "center";
       ctx.fillText("Game Over ",cvs.width*0.5,cvs.height*0.40);
       ctx.textAlign = "center";
       ctx.fillText(message,cvs.width*0.5,cvs.height*0.60);

     }
     stop.addEventListener('click',()=>{
      if(!cel){
      console.log('clicked')
      cel = 1
     }

     })

}

// Theme handler
change.addEventListener('click',theme)
