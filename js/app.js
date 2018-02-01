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
 * @description -A move in this code represents two flips of cards or clicks. This function updates moves by 1 after it has passed the comparision test of two cards. 
 */
function updateMoves(){
   moves+=1;
   $('.moves').text(`${moves}`)
}

/**
 * @description - A match represents if two cards have same child elements. Thus after a successful match, match variable is updated.
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
       console.log("1st time")
   }
}


/**
 * @description -  Stars function provides stars based on no.of moves user played to accomplish 8 matches.
 */

function stars(){
    console.log(match);
    
    if(match == 8){
       
         if(moves < 10){
         $('.stars').find('.fa').removeClass('fa-star-o').addClass('fa-star');
         console.log("moves < 10")
        } 
         else if(moves > 10 && moves <= 14){
            $('.stars').find('li:nth-child(1)').children('i').removeClass('fa fa-star-o').addClass('fa fa-star')
            $('.stars').find('li:nth-child(2)').children('i').removeClass('fa fa-star-o').addClass('fa fa-star')
            
            console.log("moves > 10 < 14")
        }
         else if(moves > 14){
            $('.stars').find('li:nth-child(1)').children('i').removeClass('fa fa-star-o').addClass('fa fa-star')
            console.log("moves > 14")
        } 
    }
    else{
         console.log("no stars yet")
    }
}
/**
 * @description - Score function shows the stars awarded,time he took to complete the game, restart button and a congragulatory text.
 */
function score(){
    if(match ==8){
        timerstop();
        fetchValues();
        $('.container').append(`
        <!-- The Modal -->
        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                <h4 class="modal-title">Congragulations!</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-3">
                            <ul class="stars">
                                <li>
                                    <i class="fa fa-star-o"></i>
                                </li>
                                <li>
                                    <i class="fa fa-star-o"></i>
                                </li>
                                <li>
                                    <i class="fa fa-star-o"></i>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-3">
                            <span class="moves">${moves}</span> Moves
                        </div>
                        <div class="col-md-3">
                            <div class = "time"><label id="minutes">00</label>:<label id="seconds">00</label></div>
                        </div>
                        <div class="col-md-3">
                            <div class="restart">
                                <i class="fa fa-repeat"></i>
                            </div>
                        </div>
                    </div>
                </div>
              
              <!-- Modal footer -->
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
              
            </div>
          </div>
        </div>`);
        $('#myModal').modal('show')
    }
}
let gameStart = false
let totalSeconds = 0;
let setTimes;

/**
 * @description - Timer function is a simple stop watch. It is used here to display time starting from user's first move.
 */

function timerFunction(){
   let minutesLabel = document.getElementById("minutes");
   let secondsLabel = document.getElementById("seconds");
  
   setTimes = setInterval(setTime, 1000);
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

let secondValue = 0;
let minuteValue = 0;

function fetchValues(){
    secondValue = $('#minutes').val();
    minuteValue = $('#seconds').val();
    console.log("gand fat gai hai")
}

/**
 * @description - Stops timer counter on being called.
 */

let timerstop = function(){
    clearInterval(setTimes);
    console.log("flow is here");
    
   
    
}

/**
 * @description - this function starts the timer counter
 */
let startTimer = function(){
    if(gameStart == false){
        gameStart = true;
        timerFunction()
    }
}

/**
* @description - Restarts the timer,moves and matches counter when restart button is clicked.
*/
function restart(){
    match = 0;
    moves = 0;
    openCards.length = 0;
    totalSeconds = 0;
    $('.moves').text(`${moves}`)
    $('.match').on('click',runFunction);
    $('.card').removeClass('open show match');
    $('.stars').children('li').children('i').removeClass('fa fa-star').addClass('fa fa-star-o');
    $('#minutes').html('00');
    $('#seconds').html('00');
    timerstop();
    
    gameStart = false;
    $('.card').click(startTimer); 
}
$('.restart').click(restart);

/**
* @description - runFunction starts the game. The click on card should be disabled upon click,and once two cards are clicked, they should be matched. 
*/
function runFunction(){
   
   startTimer();
   disableClick.call(this);
   if(openCards.length == 0 || openCards.length == 1){
       $(this).addClass('open show');
       openCards.push($(this));
       console.log("inside runFunction openCards: ",openCards,"color:green;");
       compare();
       
       score();
       stars();
       $('.modal .restart').on('click',restart);
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
