//To verify that the cards do not show its symbols when page loads
$(document).ready(function(){
    if($('.deck').children('.card')){
       $('.deck').children('.card').removeClass('match');
       $('.deck').children(".card").removeClass('open show') 
    }
    $('<div class = "time"><label id="minutes">00</label>:<label id="seconds">00</label></div>').insertAfter(".restart");
    $('.stars').children('li').children('i').removeClass('fa fa-star').addClass('fa fa-star-o')
    $('.card').wrap('<div class="container-card"></div>');
});

/* A list that holds all cards*/
let cardList = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb" ,"fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];

//Remove all the child elements from the card to reshuffle the symbols every time page loads
$(".card").children("i").remove();


/** 
* @description - Assign icons to the cards, based upon the cards index
* @param {string} icon - the icons that have to be revealed upom clicking a card.
* @param {number} i - the index at where the icon has to be placed  
*/

function icons (icon,i){
   $(".card:nth-child("+i+")").append(`<i class = "${icon}"></i>`)
}

//Shuffles and loops through each card and creates it HTML
/**
* @class - Creates deck with 16 cards with icons at the back of each card.
* @description Creates cards with shuffled icons at the time of load.
* @param {string} cards - the icons that have to be revealed upom clicking a card. 
*/

function createCard (cards){
   //cards = shuffle(cards);
       for(let i = 0 ; i < cards.length ; i++){
           icons(cards[i],i+1)
   }
} 

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
   let currentIndex = array.length, temporaryValue, randomIndex;
   while (currentIndex !== 0) { 
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
   }
   return array;
}

let deck = new createCard(cardList);

//An array that holds flipped cards
let openCards = [];

let moves = 0;
let match = 0;

/**
 * 
 */
function updateMoves(){
   moves+=1;
   $('.moves').text(`${moves}`)
}

/**
 * 
 */
function updateMatch(){
    match+=1;
}

/**
* @description - A function that adds a class "match" to all the elements of the array if the classnames are same
* @param {*} cards - Array containing child elements on which a class has to be added
*/
function areAMatch(cards){
   //console.log(cards);
   for(let i = 0 ; i < cards.length ; i++){
       setTimeout(() =>{
           cards[i][0].className+= ' ' + 'match' 
       },300);
       
      
   }
}
/**
* @description - A function to removes a specific set of classes to all child elements of an array if the names of the classes of the elements are different
* @param {*} cards - Array containing child elements on which a classes has to be removed
*/

function areNotAMatch(cards){
   for(let i = 0 ; i < cards.length ; i++){
       setTimeout(() => {
           cards[i][0].classList.remove('open','show')
       }, 800); 
   }
}

/**
* @description - Removes the 'click' eventListner when a card is clicked - 
*/
function disableClick(){

   $(this).off('click');
}

/**
* @description - Adds a 'click' eventListner when the flipped cards are not a match so that user can flip this next time to match with a different card.
* @param {*} clickedCards - An array that consist of clicked cards and click eventListner has been set off on the child elements.
*/
function enableClick(clickedCards){
   for(let i = 0 ; i < clickedCards.length ; i++){
       clickedCards[i].click(runFunction);
   }
}
/**
* @description  -compares the two cards. If two cards are a match, a class match is added to both the elements otherwise two classes 'open' & 'show' are removed from the child elements. 
*/

function compare(){
   if(openCards.length == 2){
       //console.log(openCards[0][0].children[0].className)
       if(openCards[0][0].children[0].className == openCards[1][0].children[0].className){
           areAMatch(openCards);
           setTimeout(()=>{
               openCards.length = 0;
           },500);
           updateMoves();
           updateMatch() 
           
       }
       else{
          // console.log("not same");
           areNotAMatch(openCards);
           setTimeout(() =>{
               enableClick(openCards);
           },600)
           setTimeout(() =>{
               openCards.length = 0
           },1000) ;
           updateMoves();
       }
   }
   else{
      // console.log("1st time")
   }
}

let gameStart = false
let totalSeconds = 0;

function timerFunction(){
   let minutesLabel = document.getElementById("minutes");
   let secondsLabel = document.getElementById("seconds");
  
   setInterval(setTime, 1000);
   function setTime() {
       ++totalSeconds;
       secondsLabel.innerHTML = pad(totalSeconds % 60);
       minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
   }

   function pad(val) {
       let valString = val + "";
       if (valString.length < 2) {
           return "0" + valString;
       } else {
           return valString;
       }
   }

}

function stars(){
    console.log(moves);
    if(match == 8){
        if(moves < 10){
         $('.stars').find('.fa').removeClass('fa-star-o').addClass('fa-star')
        }
        else if(moves >10 && moves <14 ){
            $('.stars').find('.fa:nth-child(1)').removeClass('fa-star-o').addClass('fa-star');
            $('.stars').find('.fa:nth-child(2)').removeClass('fa-star-o').addClass('fa-star')
        }
        else if(moves > 14){
            $('.stars').find('.fa:nth-child(1)').removeClass('fa-star-o').addClass('fa-star')
        }
    }
}
/**
* @description - Restarts the timer,moves and matches counter when restart button is clicked.
*/

/**
 * 
 */
function restart(){
    match = 0;
    moves = 0;
    openCards.length = 0;
    $('.moves').text(`${moves}`)
    totalSeconds = 0;
    $('.card').removeClass('open show match');
    openCards.click(emeb)

    
}

$('.restart').click(restart);
/**
* @description - runFunction starts the game. The click on card should be disabled upon click,and once two cards are clicked, they should be matched. 
*/
function runFunction(){
   
   if(gameStart == false){
       gameStart = true;
       timerFunction();
   }
   disableClick.call(this);
   if(openCards.length == 0 || openCards.length == 1){
       $(this).addClass('open show');
       openCards.push($(this));
       console.log(openCards);
       compare();
       stars();
       
   }
 else{
       console.log("you can't do this");
       $(this).click(runFunction);
   }
}


function play(){
    $('.card').on('click',runFunction);
}

play();
