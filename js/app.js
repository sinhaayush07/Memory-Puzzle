//To verify that the cards do not show its symbols when page loads
$(document).ready(function(){
     if($('.deck').children('.card')){
        $('.deck').children('.card').removeClass('match');
        $('.deck').children(".card").removeClass('open show') 
     }
     //$('<div class = "time"><p><time>00:00:00</time></p></div>').insertAfter(".restart");
     $('.stars').children('li').children('i').removeClass('fa fa-star').addClass('fa fa-star-o')
     $('.card').wrap('<div class="container-card"></div>');
});

/* A list that holds all cards*/
var cardList = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb" ,"fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];

 //Remove all the child elements from the card to reshuffle the symbols every time page loads
$(".card").children("i").remove();

//Adds child elements to the cards
function icons (icon,i){
    $(".card:nth-child("+i+")").append(`<i class = "${icon}"></i>`)
}

//Shuffles and loops through each card and creates it HTML
 function createCard (cards){
    cards = shuffle(cards);
        for(var i = 0 ; i <  cards.length ; i++){
            icons(cards[i],i+1)
        
    }
} 

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) { 
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

createCard(cardList);



 //Maintains the time
/*function timerFunction(){
    var p = document.getElementsByTagName('p')[0];
    console.log(p)
    var restart = document.getElementsByClassName('.restart');
        
    var seconds = 0, minutes = 0, hours = 0, t;

    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
                }
            }   
        p.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        timer();
    }
    function timer() {
        t = setTimeout(add, 1000);
    }
    timer();
    restart.onclick = function() {
        h1.textContent = "00:00:00";
        seconds = 0; minutes = 0; hours = 0;
    }
}
*/
var openCards = [];

//User cannot click the card
function disableClick(){
    
    $('.card.open.show').one('click');
    $('.card.open.show.match').off('click');
    
}

/*Reenable the click functionality */
function enableClick(){

    $('.card').on('click',playGame)
}
 

var count = 0;

//Maintains a count of clicks and updates no.of moves
function startCount (){
    count = count+1;
    $('.moves').text(count);
    return count;
}

var match = 0;

function win(){
    if(match == 8){
        results();
    }
}

//Checks whether the cards flipped are a match or not
function matchFunction(){
     if(openCards[0].children[0].className === openCards[1].children[0].className){
        $('.card.open.show').addClass('match');
        openCards.length = 0;
        match+= 1;

    }
    else{
        openCards.length = 0;
        $('.card.open.show').addClass('nomatch');
        setTimeout(function(){
            $('.nomatch').removeClass('nomatch')
            $('.open.show').removeClass('open show');
        },200)
        clearInterval(matchFunction)
        
    }   

}


//Shows the symbol behind the card upon clicking 
function logicThing(){
    if(openCards.length == 0){
        $(this).toggleClass('open show');
        openCards.push(this);
        disableClick();
    }
    else if(openCards.length ==1){
        $(this).toggleClass('open show');
        openCards.push(this);
        disableClick();
        setTimeout(matchFunction,800)
    }

}

//functionality for awarding stars
function stars (){
    if(match == 8 && count == 18){
                $('.stars').children('li').children('i').removeClass('fa fa-star-o').addClass('fa fa-star');
    }

    else if(match > 4 &&match <8 && count > 20 && count < 24){
            console.log("2nd")
            $('.stars').children('li').children('i:nth-child(1)').removeClass('fa fa-star-o').addClass('fa fa-star');
            $('.stars').children('li').children('i:nth-child(2)').removeClass('fa fa-star-o').addClass('fa fa-star');
        }

    else if(match < 5 && match > 0 && count < 30 && count > 25){
        console.log("3rd");
        $('.stars').children('li').children('i:nth-child(1)').removeClass('fa fa-star-o').addClass('fa fa-star');
    }

    else{
        $('.stars').children('li').children('i').removeClass('fa fa-star').addClass('fa fa-star-o')
    }
}

//Restarts button functionality
function restart(){
        count = 0;
        $('.moves').text(count);
        $('.card').removeClass('open show');
        $('.card').removeClass('match');
        match = 0;

}

$('.restart').on('click',restart)

function results() {
    $('#sucess-result').empty();
   
    var scoreBoard = `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
            <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
            <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " /> </svg>
        <p class="success"> Congrats !!! </p>
        <p>
            <span class="score-titles">Moves:</span>
            <span class="score-values">${moves}</span>
            <span class="score-titles">Time:</span>
            <span class="score-values">${timer.getTimeValues().toString()}</span>
        </p>
        <div class="text-center margin-top-2">
             <div class="star">
                <i class="fa fa-star fa-3x"></i>    
             </div>
             <div class="star">
                <i class="fa ${ (moves > 23) ? "fa-star-o" : "fa-star"}  fa-3x"></i>    
             </div>
            <div class="star">
                <i class="fa ${ (moves > 14) ? "fa-star-o" : "fa-star"} fa-3x"></i>    
             </div>
        </div>
        <div class="text-center margin-top-2" id="restart">
            <i class="fa fa-repeat fa-2x"></i>
          </div>
    `;
    $('#game-deck')[0].style.display = "none";
    $('#sucess-result')[0].style.display = "block";
    $('#sucess-result').append($(scoreBoard));
    $('#restart').click(resetGame);
}

function win(){
    if(match == 8){
        alert("congragulations!")
    }
}


//This function starts game
function startGame(){
    //timerFunction()
    startCount();
    logicThing.call(this);
    stars();
    win();
}

function playGame(){
   //timerFunction()
    $('.card').on('click',startGame); 
    
}

playGame();