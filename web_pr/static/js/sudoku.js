
var timeField= document.getElementById('time');
var i=0;
var selectedField=false;
var timeChange= setInterval(timeChanger, 1000);
setBorders();
var fields= document.getElementsByClassName("sudokuNumberField");
fields = Array.prototype.slice.call(fields);
fields.map(function(ele) {ele.addEventListener('click', (event) =>{
    console.log(event.target.children);
var field=event.target.parentNode;
console.log(field);
if(selectedField){
    selectedField.classList.remove("redBorder")
}
field.classList.add("redBorder");
selectedField=field;

})});

fieldNumbers=[[],[],[],[],[],[],[],[],[]];

arrowSelected=false;

numbers=document.getElementsByClassName("NumberContainer");
numbers=Array.prototype.slice.call(numbers);
numbers.map(function(ele){
    ele.addEventListener('click', function(event){
        var number= event.target.textContent;
        if(selectedField){
            if(arrowSelected){
                selectedSmallNumberField=selectedField.children[0];
                selectedSmallNumberField.children[parseInt(number)-1].textContent=number;


            }
            else{
        
            
            for(var i=0;i<9;i++){
                selectedField.children[0].children[i].textContent="";
            }
            
            selectedField.children[1].textContent=number;
            xy=selectedField.getAttribute("id");
            x=parseInt(xy.substring(0,1));
            y=parseInt(xy.substring(2,3));
            fieldNumbers[x][y]=number;
        }
    }
    })
})

radiergummi= document.getElementById("radiergummi");
radiergummi.addEventListener('click', function(event){
    if(selectedField){

        for(var i=0; i<9;i++){
            selectedField.children[0].children[i].textContent="";
        }
        selectedField.children[1].textContent="";
        
    }
});

arrow= document.getElementById("arrow");
arrow.addEventListener('click', function(event){
if(arrowSelected){
this.style.borderColor="black";
arrowSelected=false;}
else{
    this.style.borderColor="aqua";
    arrowSelected=true;
}
})

function timeChanger(){
    i++;
    var [minText, sekText] = time.textContent.split(':');
    var [min, sek] = [Number(minText), Number(sekText)];
    sek++;
    if (sek === 60) {
        sek = 0;
        min++;
    }
    minText = min < 10 ? `0${min}` : min;
    sekText = sek < 10 ? `0${sek}` : sek;
    timeField.textContent = `${minText}:${sekText}`;

}

function setBorders(){
    for(i=0;i<9;i++){
        var line1="2";
        var line2="5";


        document.getElementById(line1+"/"+i.toString()).classList.add('underline');
        document.getElementById(line2+"/"+i.toString()).classList.add('underline');
        document.getElementById(i.toString()+"/"+line1).classList.add('rightLine');
        document.getElementById(i.toString()+"/"+line2).classList.add('rightLine');
    }
}
