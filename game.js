let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

function nextSequence(){
  userClickedPattern = [];
  let randomNumber = Math.floor(Math.random() * 4)

  let randonChosenColour = buttonColours[randomNumber];
  gamePattern.push(randonChosenColour);

  $("#" + randonChosenColour).fadeOut(97).fadeIn(97).fadeOut(97).fadeIn(97);

  playSound(randonChosenColour);

  started = true;
  level ++;
  $("#level-title").html("Level " + level)
};

$(".btn").on("click", function(){
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
}, 100);
};

$(document).on("keypress", function(){
  if (started === false){
    nextSequence();
    $("#level-title").html("Level " + level)
  } ;

})

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
    }, 1000);
    }
  } else{
    let overSound = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over")
    setTimeout(function(){$("body").removeClass("game-over")}, 200)
    $("#level-title").html("Игра окончена, тыкай любую кнопку,чтобы начать заново")
    startOver();
  }
};

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
