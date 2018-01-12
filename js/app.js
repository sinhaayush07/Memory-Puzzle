//To verify that the cards do not show its symbols when page loads
$(document).ready(function(){
     if($(".deck").children(".card")){
        $(".deck").children(".card").removeClass("match");
        $(".deck").children(".card").removeClass("open show") 
     }
});

/* A list that holds all cards*/

var cardList = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb" ,"fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 //Remove all the child elements from the card to reshuffle the symbols every time page loads

$(".card").children("i").remove();

//Adds child elements to the cards

function icons (icon,i){
    $(".card:nth-child("+i+")").append(`<i class = "${icon}"></i>`)
}

//Shuffles and loops through each card and creates it HTML

function createCard (cards){
    cards = shuffle(cards);
    //console.log(cards);
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
        //console.log("temp value" + temporaryValue);
        array[currentIndex] = array[randomIndex];
        //console.log("current Index" + currentIndex);
        array[randomIndex] = temporaryValue;
        //console.log("random index" + randomIndex);
    }

    return array;
    //console.log(array)

}

createCard(cardList);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


var openCards = [];
//User cannot click the card
function disableClick(){
    $(this).off('click');
}

var count = 0;

//Maintains a count of clicks 
function startCount (){
    count = count+1;
    console.log(count);
    return count;
}

function logicThing(){
    if(count==1){
        disableClick(this);
    }    
}

function startGame(){
    startCount();
    $(this).toggleClass("open show");
    var a = $(this);
    openCards.push(this);
    console.log(openCards);
    logicThing(this);    
}

$(".card").on('click',startGame);