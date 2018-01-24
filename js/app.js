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
let cardList = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb" ,"fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-leaf","fa fa-bicycle","fa fa-bomb"];

//Remove all the child elements from the card to reshuffle the symbols every time page loads
$(".card").children("i").remove();

//Adds child elements to the cards
/**
 *  
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
    cards = shuffle(cards);
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
let openCards = 0;

function runFunction(){
   // if(openCards)
   console.log(this)
}

$('.card').on('click',runFunction)