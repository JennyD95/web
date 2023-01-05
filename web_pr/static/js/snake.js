snake= [[0, 0]];
direction='down';
owand= Array.from({length: 24}, (v, i) => -i - 1);
uwand= Array.from({length: 24}, (v, i) => i + 384);
lwand=Array.from({length: 16}, (v, i) => i*24 -1);
rwand= Array.from({length: 16}, (v, i) => i*24 + 24);


//Fügt den Html Template einen Key Listener das auf die auf die Pfeil Tasten reagieren 
//und verzeichnen in welcher richtung die Schlange als nächstes geht
document.addEventListener('keyup', (e) => {
if(e.code==="ArrowUp" && (!(direction==="down") || snake.length===1)){
    direction='up'
}
else if(e.code==="ArrowDown" && (!(direction==="up") || snake.length===1)){
    direction='down'
}
else if(e.code==="ArrowRight" && (!(direction==="left") || snake.length===1)){
    direction='right'
}
else if(e.code==="ArrowLeft" && (!(direction==="right") || snake.length===1)){
    direction='left'
}
});

//Im html Template wird eine variable übergeben die hier aufgenommen und abgefragt wird
//So wird erkannt in welchen "Modus" das Template sich gerade befindet
var box= document.getElementById('box');
var attribute= box.getAttribute("val");

//spiel läuft, Schlangenkopf  wird gesetzt und eine Frucht zufällig platziert und ein Intervall
//wird gesetzt die die Funktion moveSnake ausführt
if(attribute=="on"){
    fruit=Math.random()*384 |0;
    fruitField=document.getElementsByName(fruit)[0];
    fruitField.classList.remove('field');
    fruitField.classList.add('fruit');
    fields=document.getElementsByClassName("field");
    fields[0].classList.add('snake');
    fields[0].classList.remove('field');
    var timeout= setInterval(moveSnake, 200);}

    //Startbildschirm form wird ein Feld beigefügt damit in der view erkannt wird, das es als nächstes 
    //das Spielfeld aufbauen soll
 else if(attribute=="startGame"){
    console.log(snake.length);
    var atr = document.createElement('input');
    atr.type = 'hidden';
    atr.name = 'status';
    atr.value="startGame";
    var csrfToken = getCookie('csrftoken');
    var csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = csrfToken;
    var form= document.getElementById('startform');
    form[0].appendChild(csrfInput);
    form[0].appendChild(atr);
}

//wird beim Game over ausgeführt
else{
    var atr = document.createElement('input');
    atr.type = 'hidden';
    atr.name = 'status';
    atr.value="else";
    var csrfToken = getCookie('csrftoken');
    var csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'csrfmiddlewaretoken';
    csrfInput.value = csrfToken;
    var form= document.getElementById('againform');
    form[0].appendChild(csrfInput);
    form[0].appendChild(atr);

}

/*
Die Funktion moveSnake bewegt die Schlange auf dem Spielfeld. Dazu werden zunächst die Startkoordinaten der Schlange (startx und starty) sowie die Endkoordinaten (endx und endy) bestimmt. Anschließend werden die Spielfeldnummern des Kopfes (fieldNumberHead) und des Endes (fieldNumberEnd) berechnet, indem die y-Koordinate mit 30 multipliziert und die x-Koordinate addiert wird.
Anschließend wird der Kopf der Schlange mithilfe von direction in die entsprechende Richtung bewegt. Dazu wird zunächst das HTML-Element mit der Spielfeldnummer des Kopfes mithilfe der getElementsByName-Funktion ausgewählt. Danach wird die Klasse snake hinzugefügt und die Klasse field entfernt, um das entsprechende Feld als Teil der Schlange darzustellen. Sollte die Schlange auf eine Wand treffen, wird die Funktion gameOver aufgerufen.
Die Schlange wird anschließend in der entsprechenden Richtung bewegt, indem das erste Element des snake-Arrays entsprechend modifiziert wird. Der Rest des Körpers der Schlange bleibt unverändert und wird in dem Array body gespeichert. Sollte der Kopf der Schlange auf den Körper treffen, wird ebenfalls die Funktion gameOver aufgerufen.
Wenn der Kopf der Schlange auf das Obst trifft (fruit entspricht der Spielfeldnummer), wird das Obst an eine neue Stelle gesetzt, indem die Funktion placeFruit aufgerufen wird. Andernfalls wird das letzte Element der Schlange entfernt und das entsprechende Feld wieder als normales Feld dargestellt.
*/
function moveSnake(){
    startx= snake[0][0];
    starty= snake[0][1];
    console.log(snake);
    endx=snake[snake.length-1][0];
    endy=snake[snake.length-1][1];
    fieldNumberHead= starty*24+startx;
    fieldNumberEnd= endy*24+endx;
    var end= document.getElementsByName(fieldNumberEnd)[0];

    switch(direction){
        case 'right':
            fieldNumberHead=fieldNumberHead+1;    
            var head= document.getElementsByName(fieldNumberHead)[0];
            head.classList.add('snake');
            head.classList.remove('field');
            if(rwand.includes(fieldNumberHead)){
                gameOver();
            }
            snake.unshift([startx+1,starty]);
            
            break;

        case 'down':

            fieldNumberHead=fieldNumberHead+24;
            var head= document.getElementsByName(fieldNumberHead)[0];
            if(uwand.includes(fieldNumberHead)){
                gameOver();
            }
            head.classList.add('snake');
            head.classList.remove('field');
            snake.unshift([startx,starty+1]);
            
            break;

        case 'left':
            fieldNumberHead=fieldNumberHead-1;
            var head= document.getElementsByName(fieldNumberHead)[0];
            head.classList.add('snake');
            head.classList.remove('field');
            if(lwand.includes(fieldNumberHead)){
                gameOver();
            }
            snake.unshift([startx-1,starty]);
            
            break;

        case 'up':
            
            fieldNumberHead=fieldNumberHead-24;
            var head= document.getElementsByName(fieldNumberHead)[0];
            if(owand.includes(fieldNumberHead)){
                gameOver();
            }
            head.classList.add('snake');
            head.classList.remove('field');
            snake.unshift([startx,starty-1]);

            
            break;

        

    }

    body= snake.slice(1);
    if(body.map(x => x[1]*24+x[0]).includes(fieldNumberHead)){
        gameOver();
    }


    if(fruit===fieldNumberHead){
        placeFruit();
    }
    else{
    end.classList.remove('snake');
    end.classList.add('field');
    snake.pop();
    }
    
}

/*
Die Funktion placeFruit setzt das Obst auf ein zufälliges Feld des Spielfelds. Dazu wird zunächst das bisherige Obstfeld mithilfe der getElementsByName-Funktion ausgewählt und die Klasse fruit entfernt. Danach wird eine neue Zufallszahl für das Obst erzeugt und geprüft, ob diese bereits Teil der Schlange ist. Sollte dies der Fall sein, wird die Zufallszahl erneut erzeugt, bis sie nicht Teil der Schlange ist.
Anschließend wird das Obst an die neue Stelle gesetzt, indem das HTML-Element mit der Spielfeldnummer des Obstes ausgewählt wird und die Klasse fruit hinzugefügt wird. Die Klasse field wird entfernt, um das Obst darzustellen.
Die Funktion enthält außerdem mehrere console.log-Aufrufe, die zur Debugging-Zwecke dienen und Informationen über den aktuellen Zustand der Schlange und des Obstes in der Konsole ausgeben.
*/
    function placeFruit(){
        fruitField=document.getElementsByName(fruit)[0];
        fruitField.classList.remove('fruit');
        fruitField.classList.add('snake');
        do{
        fruit=Math.random()*384 |0; }
        while(snake.map(e => e[1]*24+e[0]).includes(fruit));

        fruitField=document.getElementsByName(fruit)[0];
        fruitField.classList.remove('field');
        fruitField.classList.add('fruit');
    }

/*
Die Funktion gameOver wird aufgerufen, wenn das Spiel beendet ist, wenn die Schlange auf eine Wand oder ihren eigenen Körper trifft.
Zunächst wird ein neues HTML-Formular-Element erstellt und die Attribute method und action festgelegt. Dann werden drei neue HTML-Input-Elemente erstellt, die dem Formular hinzugefügt werden. Das erste Input-Element ist für die Größe der Schlange (size), das zweite für den Namen des Spiels (name) und das dritte für den CSRF-Token (csrfmiddlewaretoken), der zur Sicherheit des Formulars verwendet wird. Die Werte der Input-Elemente werden festgelegt, wobei der Wert von size der Länge der Schlange entspricht und der Wert von name immer "gameOver" ist. Der Wert des CSRF-Tokens wird mithilfe der Funktion getCookie ausgelesen.
Anschließend werden die Input-Elemente dem Formular hinzugefügt und das Formular dem Dokument hinzugefügt. Zuletzt wird das Formular mithilfe der submit-Methode abgeschickt.
Diese Funktion dient dazu, das Ergebnis des Spiels (Größe der Schlange) an den Server zu senden.
*/
    function gameOver(){

        var sub= document.createElement('form');
        sub.method="post";
        sub.action=''
        var size = document.createElement('input');
        size.type = 'hidden';
        size.name = 'size';
        console.log(snake.length);
        size.value=snake.length;
        var name = document.createElement('input');
        name.type = 'hidden';
        name.name = 'status';
        name.value="gameOver";
        var csrfInput = document.createElement('input');
        var csrfToken = getCookie('csrftoken');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrfmiddlewaretoken';
        csrfInput.value = csrfToken;
        sub.appendChild(csrfInput);
        sub.appendChild(name);
        sub.appendChild(size);

        document.body.appendChild(sub);
        sub.submit();
         
        }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
            }
    


