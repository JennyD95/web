let btns=[];
fieldsx=[];
fieldso=[];
let winCombos=[['0','1','2'],["3","4","5"],["6","7","8"],["0","3","6"],["1","4","7"],["2","5","8"],["0","4","8"],["2","4","6"]];
var fields = document.getElementsByClassName('ticElement');
var btn= document.getElementById('start');
var gewonnen=0;
var verloren=0;
var gewonnenO=0;
var verlorenO=0;
var unentschieden=0;
var unentschiedenO=0;
let mode= "zufall";
var draw=0;
i=0;
naechsterZug=null;

//Depending on the status of the start button, either the addEvent or deleteEvent function is executed.
btn.addEventListener('click', function(){
    if(btn.textContent==='Start'){
    btn.textContent="Beenden";
    addEvent();
    document.getElementById('zufall').disabled=true;
    document.getElementById('mittel').disabled=true;
    document.getElementById('unbesiegbar').disabled=true;
    document.getElementById('2-Spieler').disabled=true;
    }
    else{
        btn.textContent="Start";
        deleteEvent();
        document.getElementById('zufall').disabled=false;
        document.getElementById('mittel').disabled=false;
        document.getElementById('unbesiegbar').disabled=false;
        document.getElementById('2-Spieler').disabled=false;
    }
});


//adds a ClickEvent to all fields after start press
function addEvent(){
mode= document.querySelector('input[name="options"]:checked').id;


if(mode=== '2-Spieler'){
    Array.from(fields).map(element => {
        element.addEventListener('click', zweiSpieler);
      });

}
else{
Array.from(fields).map(element => {
  element.addEventListener('click', turnByClick);
});
}
}

/*The zweiSpieler function is called when the '2-Spieler' mode is selected and a square on the game board is clicked.
The function takes an event object as an argument, which is the 'click' event that occurred on a square. The ele variable is assigned the value of the element that was clicked, which is the square.
A conditional statement checks the value of draw modulo 2. If it is 1, the square is filled with an 'O' character, the value of the 'field' attribute of the square is added to the fieldso array, and the hasWon function is called with the arguments 0, fieldso, and the value of the 'field' attribute of the square. If the value of draw modulo 2 is not 1, the square is filled with an 'X' character, the value of the 'field' attribute of the square is added to the fieldsx array, and the hasWon function is called with the arguments 1, fieldsx, and the value of the 'field' attribute of the square.
The click event listener for the square is removed, and the value of draw is incremented by 1.*/
function zweiSpieler(event){

    ele= event.target;
if(draw%2==1){
    ele.textContent= 'O';
    fieldso.push(ele.getAttribute('field'));
    var t=hasWon(0, fieldso, ele.getAttribute('field'));
}
else{
    
    ele.textContent= '╳';
    fieldsx.push(ele.getAttribute('field'));
    var t=hasWon(1, fieldsx, ele.getAttribute('field'));
}

ele.removeEventListener('click', zweiSpieler);
draw+=1;
}

/*The turnByClick function is called when a square on the game board is clicked in the 'zufall', 'mittel', or 'unbesiegbar' modes.
The function takes an event object as an argument, which is the 'click' event that occurred on a square. The ele variable is assigned the value of the element that was clicked, which is the square.
The square is filled with an 'X' character and the 'click' event listener for the square is removed. The value of the 'field' attribute of the square is added to the fieldsx array and the hasWon function is called with the arguments 1, fieldsx, and the value of the 'field' attribute of the square. If the hasWon function returns true, the function returns and the computer's turn is skipped.
Depending on the selected mode differ function will be executed
zufall -> zufallCpm
mittel -> nextTurn or zufallCom if false
unbesiegbar-> max
for each method is a short Timeout set for the performance*/
function turnByClick(event){
    ele= event.target;
    ele.textContent= '╳';
    ele.removeEventListener('click', turnByClick);
    fieldsx.push(ele.getAttribute('field'));
    var t=hasWon(1, fieldsx, ele.getAttribute('field'));
    if(t){
        return;
    }
    let mode= document.querySelector('input[name="options"]:checked').id;
    if(mode=== 'zufall'){
        const myTimeout = setTimeout( zufallCom, 300);
    }
    else if (mode=== 'mittel'){
        
        setTimeout(()=> {if(!nextMove(fieldso, fieldsx)){
        if(!nextMove(fieldsx, fieldso)){
            zufallCom();
        }}}, 300)


    }

    else if(mode==='unbesiegbar'){

        
        setTimeout(()=> { max(fieldsx, fieldso);
            setField(naechsterZug, "O");},300)
        /*if(fieldsx.length===1){
            ersterZug();
        }
        else{
            max(fieldsx, fieldso);
        setO();} */
    }

}


// Resets the field and variables
function deleteEvent(){
    Array.from(fields).map(element => {
      element.removeEventListener('click', turnByClick);
      element.removeEventListener('click', zweiSpieler);
    });
    Array.from(fields).map(element => {
        element.textContent='';
      });
    var res= document.getElementById('result');
    res.className="";
    res.textContent='';
    fieldsx=[];
    fieldso=[];
    
}

//check if a player has won.
function hasWon(player, list, fieldNumber){
    var newWinCombos= winCombos.filter(combo => combo.includes(fieldNumber));
    for(var i=0; i<newWinCombos.length;i++){
        var win= true;

        for(var j=0;j<3;j++){


            if(!( list.includes(newWinCombos[i][j]))){
                win=false;
            }

        }
        if(win=== true){
                var res= document.getElementById('result');
                res.classList.add('alert');
                if(mode==='2-Spieler'){
                    res.classList.add('alert-success');

                    if(player ===1){
                        res.textContent='Spieler 1 hat gewonnen!'
                        var gewonnenFX= document.getElementById('gewonnen');
                        gewonnen+=1;
                        gewonnenFX.textContent=gewonnen;
                        var verlorenFO= document.getElementById('verlorenO');
                        verlorenO+=1;
                        verlorenFO.textContent=gewonnen;
                    }
                    else{
                        res.textContent='Spieler 2 hat gewonnen!'
                        var verlorenFX= document.getElementById('verloren');
                        var gewonnenFO= document.getElementById('gewonnenO');
                        console.log(gewonnenFO);
                        verloren+=1;
                        gewonnenO+=1;
                        console.log(gewonnen);
                        verlorenFX.textContent=verloren;
                        gewonnenFO.textContent=gewonnenO;
                    }

                    draw=0;
                    Array.from(fields).map(element => {
                        element.removeEventListener('click', zweiSpieler);
                      });
                }
                
                
                else if(player ===1){
                    res.textContent='Sie haben gewonnen!'
                    res.classList.add('alert-success');
                    var gewonnenFX= document.getElementById('gewonnen');
                    gewonnen+=1;
                    gewonnenFX.textContent=gewonnen;
                    var verlorenFO= document.getElementById('verlorenO');
                    verlorenO+=1;
                    verlorenFO.textContent=gewonnen;
                }
                else{
                    res.classList.add('alert-danger');
                    res.textContent='Sie haben verloren!'
                    var verlorenFX= document.getElementById('verloren');
                    var gewonnenFO= document.getElementById('gewonnenO');
                    verloren+=1;
                    gewonnenO+=1;
                    verlorenFX.textContent=verloren;
                    gewonnenFO.textContent=gewonnenO;
                }
               
                Array.from(fields).map(element => {
                    element.removeEventListener('click', turnByClick);
                  });

                return true;
            
        }
    }

        if(fieldsx.concat(fieldso).length===9){
            var res= document.getElementById('result');
            res.classList.add('alert');
            res.classList.add('alert-warning');
            res.textContent= "Es ist unentschieden.";
            var unentschiedenFX= document.getElementById('unentschieden');
            var unentschiedenFO= document.getElementById('unentschiedenO');
                    
                    unentschieden+=1;
                    unentschiedenFX.textContent=unentschieden;
                    unentschiedenO+=1;
                    unentschiedenFO.textContent=unentschieden;
    
        }
}

//Arrange with Math.random a free field. 
/*Declares an array allFields containing all the possible positions in a tic-tac-toe board (i.e., "1", "2", "3", "4", "5", "6", "7", "8", "0").
Declares an array usedFields containing the positions that have already been used by either player (i.e., the fieldso and fieldsx arrays concatenated).
Declares an array freeFields containing the positions that are not contained in usedFields, using the Array.prototype.filter() method.
Generates a random number between 0 and the length of freeFields - 1, using the Math.random() function and the bitwise OR operator (|).
Loops through the fields array and finds the element whose field attribute is equal to the randomly chosen position.
Changes the text content of that element to "O", pushes the element's field attribute value to the fieldso array, and removes the turnByClick event listener from the element.
Call the hasWon function to determine if a player has won*/ 
function zufallCom(){
    var allFields= ["1", "2", "3", "4", "5", "6", "7", "8", "0"]
    var usedFields=fieldso.concat(fieldsx);
    var freeFields=allFields.filter(x => !usedFields.includes(x));
    var randomNumber= (Math.random()*(freeFields.length-0.5))-0.5 | 0;
    for(var i =0; i< fields.length;i++){
        if(fields[i].getAttribute('field')===freeFields[randomNumber].toString()){

            fields[i].textContent="O";
            fieldso.push(fields[i].getAttribute('field'));
            hasWon(2, fieldso, fields[i].getAttribute('field'));
            fields[i].removeEventListener('click', turnByClick);
            break;
        }
    }

}

//This function is called if mode "mittel" has chosen and if the player has set his turn. the the function is used to determine if a player could be win in the next move
/*
The code takes in two arguments: list_a and list_b.
The function iterates over an array of winning combinations (winCombos) and checks if either player has a winning move available. It does this by:
Initializing the variables frei and besetzt to -1 and 0, respectively.
Iterating over each winning combination (combo).
For each combo, iterating over each position in the combination (x).
If x is in list_a, increment besetzt by 1. If x is not in list_b, set frei to x.
If besetzt is equal to 2 and frei is not equal to -1, return frei. */
/**
 * 
 * @param {array of string(Fieldnumbers)} list_a 
 * @param {array of string(Fieldnumbers)} list_b 
 * @returns a Fieldnumber as string if the player of list_a could win in the next move 
 */
function nextMove(list_a, list_b){

    var frei = -1;
    var besetzt = 0;

    for (let i = 0; i < winCombos.length; i++) {
        const combo = winCombos[i];
        besetzt = 0;
        frei = -1;

        for (let j = 0; j < combo.length; j++) {
            const x = combo[j];
            if (list_a.includes(x)) {
                besetzt++;
            } else if (!list_b.includes(x)) {
                frei = x;
            }
        }

        if ((besetzt === 2) && (frei > -1)) {
            setField(frei, "O");
            return frei;
        }
    }
    return false;
}

//set a Field for a given number and sign
/**
 * 
 * @param {string(Number as a string)} number Fieldnumber
 * @param {string} letter The sign which will be set in the field
 */
function setField(number, letter){

    for(var i =0; i< fields.length;i++){
        if(fields[i].getAttribute('field')===number){

            fields[i].textContent=letter;
            fieldso.push(number);
            hasWon(2, fieldso, number);
            fields[i].removeEventListener('click', turnByClick);
            break;
        }
    }

}

//Used for the evaluation of Minmax algoritmus
/**
 * 
 * @param {array of string(number as string)} xlist setted player list
 * @param {array of string(number as string)} olist setted computer player list
 * @returns {number} the evaluation: 1 if the player wins, -1 if the computer player wins, 0 in a case of a tie 
 */
function resFunc(xlist, olist){

    for(var i=0; i<winCombos.length;i++){
        var winx= true;
        var wino=true;
        for(var j=0;j<3;j++){


            if(!( xlist.includes(winCombos[i][j]))){
                winx=false;
            }
            if(!( olist.includes(winCombos[i][j]))){
                wino=false;
            }

        }
        if(winx=== true){
            return -1;
        }
        if(wino===true){
            return 1;
        }
    }

    if((xlist.length+olist.length)===9){
        return 0;
    }
    return null;
}

//Max function based of the minmax algorithm
/*The max function is a recursive function that plays the role of the "maximizing player" in a two-player game. It takes in two lists as arguments:

xlist: a list of moves made by the "minimizing player"
olist: a list of moves made by the "maximizing player"
The function first initializes several variables:

wert: a placeholder variable that will be used to store the minimum value returned by the min function (more on this later)
maxWert: a placeholder variable that will store the maximum value of wert
zuege: a list of all the possible moves that have not yet been made, calculated by taking the difference between the list of all moves and the list of moves that have already been made
besterZug: a placeholder variable that will store the best move (i.e., the move that results in the highest value of wert)
res: the result of calling the resFunc function (more on this later)
The function then checks if the resFunc function returns a non-null value. If it does, the function returns the result.

If the resFunc function returns a null value, the function enters a loop that iterates over the list of possible moves (zuege). For each iteration of the loop, the function does the following:

Concatenates the current move to the list of moves made by the maximizing player (olist)
Calls the min function with the updated lists of moves made by each player
If the value returned by the min function is greater than the current maximum value (maxWert), the function updates maxWert and besterZug
After the loop finishes executing, the function sets the value of naechsterZug (the next move to be made) to the best move (besterZug) and returns the maximum value (maxWert).
*/
/**
 * 
 * @param {array of string(number as string)} xlist setted Player Field
 * @param {array of string(number as string)} olist setted Com Field
 * @returns the maximum value that can be achieved in the open moves
 */

function max( xlist, olist){
    var wert=0;
    var maxWert=-2;
    var zuege= ["0","1","2","3","4","5","6","7","8"].filter(ele => !xlist.concat(olist).includes(ele));
    var besterZug="";
    var res= resFunc(xlist, olist);
    
    if(res!=null){
        return res;
    }

    for (var zug of zuege){
        listoNeu=olist.concat([zug]);
        wert=min(xlist, listoNeu);
        if(wert>maxWert){
            maxWert=wert;
            besterZug=zug;
        }
    }
        naechsterZug=besterZug;
    

    return maxWert;
}

//min function based of the minmax algorithm
/*
The min function is a recursive function that plays the role of the "minimizing player" in a two-player game. It takes in two lists as arguments:

xlist: a list of moves made by the "minimizing player"
olist: a list of moves made by the "maximizing player"
The function initializes several variables:

minWert: a placeholder variable that will store the minimum value returned by the max function (more on this later)
zuege: a list of all the possible moves that have not yet been made, calculated by taking the difference between the list of all moves and the list of moves that have already been made
res: the result of calling the resFunc function (more on this later)
The function then checks if the resFunc function returns a non-null value. If it does, the function returns the result.

If the resFunc function returns a null value, the function enters a loop that iterates over the list of possible moves (zuege). For each iteration of the loop, the function does the following:

Concatenates the current move to the list of moves made by the minimizing player (xlist)
Calls the max function with the updated lists of moves made by each player
If the value returned by the max function is less than the current minimum value (minWert), the function updates minWert
After the loop finishes executing, the function returns the minimum value (minWert).
 */
/**
 * 
 * @param {array of string(number as string)} xlist setted Player Field
 * @param {array of string(number as string)} olist setted Com Field
 * @returns the minimum value that can be achieved in the open moves
 */
function min(xlist, olist)
{
    naechsterZug;
    var minWert=2;
    var zuege= ["0","1","2","3","4","5","6","7","8"].filter(ele => !xlist.concat(olist).includes(ele));
    
    
    var res= resFunc(xlist, olist);
    if(res!=null){
        return res;
    }

    for (var zug of zuege){
        
            
        wert=max(xlist.concat([zug]), olist);
        if(wert<minWert){
            minWert=wert;
        }
        }
        
    

    return minWert;

}

