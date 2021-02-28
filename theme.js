var birds = document.getElementsByClassName('bird-container')
var backgrounds = document.getElementsByClassName('bg')
var footgrounds = document.getElementsByClassName('fg')
var height = window.innerHeight*0.6*0.7
var width = window.innerHeight*0.4*0.7
var cel = 1
var lose = 0

var birdUrl = "D:\\Programming workbench\\webDev\\flappyBirdGame\\images\\fb.png"
var bgUrl = "D:\\Programming workbench\\webDev\\flappyBirdGame\\images\\bg_night.jpg"
var fgUrl = "D:\\Programming workbench\\webDev\\flappyBirdGame\\images\\ground.png"

var birdImg = document.getElementById('defaultBird')
var bgImg = document.getElementById('defaultBg')
var fgImg = document.getElementById('defaultFg')
//Setting backgrounds heights
for(var i = 0; i < backgrounds.length; i++){
  backgrounds[i].children[0].height = height
  backgrounds[i].children[0].width = width
}
//Setting footgrounds heights
for(var i = 0; i < footgrounds.length; i++){
  footgrounds[i].children[0].width = width
}

//Pick functions
//bird
function pickBird(){
  for(var i = 0; i < birds.length; i++){
    birds[i].style.borderLeft = "none"
    }
  this.parentNode.style.borderLeft = "red groove"
   birdImg = this
  // localStorage.setItem("birdUrl",birdUrl)
  // console.log(birdUrl)
  // theme()
}
//Bg
function pickBg(){
  for(var i = 0; i < backgrounds.length; i++){
    backgrounds[i].style.borderLeft = "none"
    }
  this.parentNode.style.borderLeft = "red groove"
   bgImg = this
  // localStorage.setItem("bgUrl",bgUrl)
  // theme()
  // console.log(bgUrl)
}
//Fg
function pickfg(){
  for(var i = 0; i < footgrounds.length; i++){
    footgrounds[i].style.borderLeft = "none"
    }
  this.parentNode.style.borderLeft = "red groove"
   fgImg = this
  // localStorage.setItem("fgUrl",bgUrl)
  // theme()
  // console.log(fgUrl)
}

//Picking a bird
for(var i = 0; i < birds.length; i++){
  console.log(birds[i].children[0])
  birds[i].children[0].addEventListener('click', pickBird)
}

//Picking a background
for(var i = 0; i < backgrounds.length; i++){
  backgrounds[i].children[0].addEventListener('click', pickBg)
  }
  //Picking a footground
  for(var i = 0; i < footgrounds.length; i++){
    footgrounds[i].children[0].addEventListener('click', pickfg)
    }
localStorage.setItem("birdUrl",birdUrl)
localStorage.setItem("bgUrl",bgUrl)
//
// var bird = birdUrl
// var bg = bgUrl
