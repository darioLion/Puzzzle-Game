var rows = 3;
var columns = 4;
var wrapper = document.getElementsByClassName("wrapper-start")[0];
wrapper.classList.remove("wrapper-start");
wrapper.classList.add("wrapper-end");

var innerStructure = document.createElement('div'); 
innerStructure.className = "puzzle";
wrapper.appendChild(innerStructure);
var innerStructure = document.createElement('div'); 
innerStructure.className = "controls";

wrapper.appendChild(innerStructure);

var controls = document.getElementsByClassName("controls")[0];
var cancelBtn = document.createElement('img'); 
cancelBtn.className = "cancel-btn";
cancelBtn.setAttribute("src", "./img/cancel_button.png");
controls.appendChild(cancelBtn);



var puzzle = document.getElementsByClassName("puzzle")[0];
var puzzleWidth = puzzle.offsetWidth;
puzzle.style.minWidth = puzzleWidth + 4+"px";
var puzzleHeight = 720*puzzleWidth/1280;
controls.style.height = puzzleHeight +"px";
var timeManager = document.createElement('div'); 
timeManager.className = "time-mng";
controls.appendChild(timeManager);

var timer = document.getElementsByClassName("time-mng")[0];
var timeLine = document.createElement('div'); 
timeLine.className = "timer"; 
timer.appendChild(timeLine);



var puzzlePartW = puzzleWidth / columns;
var puzzlePartH = puzzleHeight / rows;

var puzzles = [];
var t = 0;

for(let i=0; i<rows; i++){
    for(let j=0; j<columns; j++){
        let posW = j*puzzlePartW*-1;
        let posH = i*puzzlePartH*-1;
        puzzles[t]={
            id_true : t,
            id_false : t,
            positionX : posW,
            positionY : posH,
            height : puzzlePartH,
            width : puzzlePartW,
            bgSize : puzzleWidth,
            move_id: false
        };
        t++;  
    }
}

for (let i=puzzles.length-1; i>=0; i--){
    var puzPart = document.createElement('div'); 
    puzPart.className = "puzzle-part";
    puzzles[i].id_false = puzzles.length - 1 - i;
    puzPart.setAttribute("id", puzzles[i].id_false);
    puzPart.style.height = puzzles[i].height + "px";
    puzPart.style.maxWidth = puzzles[i].width + "px";
    puzPart.style.width = puzzles[i].width + "px";

    puzPart.style.backgroundPosition = puzzles[i].positionX + "px " + puzzles[i].positionY + "px";
    puzPart.style.backgroundSize = puzzles[i].bgSize + "px";
    puzzle.appendChild(puzPart);
    
}

    var moveElem, startLeft, startTop, selectedPuzzleID, puzzleForChangeID;

    puzzle.addEventListener('mousedown', function(event){
       // console.log("mousedown");
        startLeft = event.pageX;
        startTop = event.pageY;
        console.log("mousedown Coord"+ startLeft + " "+startTop );
        moveElem = event.target;
        if(moveElem != puzzle){
        selectedPuzzleID = moveElem.getAttribute("id");
        //moveElem.style.left = 0+"px";
        moveElem.addEventListener('mousemove', move);  
    }             
    })

    
    puzzle.addEventListener('mouseup', function(e){
     console.log("mouseup");
        moveElem.style.zIndex = 0;
       // console.log(e.pageX+ " " + e.pageY);
        puzzleForChangeID = getIdFalseFromPosition(e.pageX, e.pageY);
        moveElem.removeEventListener("mousemove", move);
        changePuzzlePlace(selectedPuzzleID, puzzleForChangeID);
       
    })
   

    var puzzlePadLeft = puzzle.offsetLeft;
    var puzzlePadTop = puzzle.offsetTop;
    console.log(puzzlePadTop+"top");
    function move(e){
        console.log("move");
        moveElem.style.zIndex = 10;
       // moveElem.style.left =  parseInt(moveElem.style.left)+e.pageX- startLeft +  "px";
        var ttt = startLeft - Math.abs(puzzles[getIdFalseFromPosition(startLeft, startTop)].positionX);

        console.log(puzzleWidth +" "+ e.target.offsetLeft+" "+ttt);
        console.log(e.target.offsetLeft);
        if (e.target.offsetLeft >= 0 && (e.target.offsetLeft+puzzlePartW) <= puzzleWidth ){
        moveElem.style.left = e.pageX-startLeft+"px";}
        if (e.target.offsetTop >= 0 && (e.target.offsetTop+puzzlePartH) <= puzzleHeight ){
        moveElem.style.top = e.pageY - startTop + "px";}

    }
    function countPuzzleOffsetX(id_false){
        var currPosX = id_false % 4;
        return puzzlePartW * currPosX;
    }
     function countPuzzleOffsetY(id_false){
        var currPosY = Math.floor(id_false / 4);
        return puzzlePartH * currPosY;
    }
    function getIdFalseFromPosition(upCoordX, upCoordY){
        for(let i = 0; i < puzzles.length; i++){
          //  if( i != selectedPuzzleID ){
               let offsetX = countPuzzleOffsetX(puzzles[i].id_false);
               let offsetY = countPuzzleOffsetY(puzzles[i].id_false);
              
           //    console.log(offsetX +"<="+ upCoordX+ " && "+ upCoordX + "<=" + (offsetX+puzzlePartW) +" && "+ offsetY+" <= "+upCoordY+ " && "+ upCoordY +" <= " + (offsetY+puzzlePartH ));
                if(offsetX <= upCoordX && upCoordX <= offsetX+puzzlePartW && offsetY <= upCoordY &&  upCoordY <= offsetY+puzzlePartH ){

                    return puzzles[i].id_false;
                }
          //  }
        }
    }

    function changePuzzlePlace(selectedPuzzleID, puzzleForChangeID){
        if(selectedPuzzleID != puzzleForChangeID){

        var firstElem = document.getElementById(selectedPuzzleID.toString());
        var secondElem = document.getElementById(puzzleForChangeID.toString());
        var firstElemOffsetX = countPuzzleOffsetX(selectedPuzzleID);
        var firstElemOffsetY = countPuzzleOffsetY(selectedPuzzleID);
        var secondElemOffsetX = countPuzzleOffsetX(puzzleForChangeID);
        var secondElemOffsetY = countPuzzleOffsetY(puzzleForChangeID);   
       
       // if (puzzles[8].move_id == false ){
        firstElem.style.left = secondElemOffsetX - firstElemOffsetX +"px";
        firstElem.style.top = secondElemOffsetY - firstElemOffsetY+"px";
        secondElem.style.left = firstElemOffsetX - secondElemOffsetX +"px";
        secondElem.style.top =  firstElemOffsetY - secondElemOffsetY +"px";
      // } else{
         //    firstElem.style.left =  secondElemOffsetX - firstElemOffsetX  +"px";
         //    console.log(parseInt(firstElem.style.left) + secondElemOffsetX - firstElemOffsetX+"WWWWWW");
         //    firstElem.style.top = parseInt(firstElem.style.top) + secondElemOffsetY - firstElemOffsetY+"px";
         //       secondElem.style.left = parseInt(secondElem.style.left) + firstElemOffsetX - secondElemOffsetX +"px";
         //       secondElem.style.top = parseInt(secondElem.style.top) + firstElemOffsetY - secondElemOffsetY +"px";
       // }

       // console.log( firstElem.style.left +" "+ secondElem.style.left);
        firstElem.setAttribute("id", puzzleForChangeID);
        var bubble = puzzles[selectedPuzzleID].id_false;
        puzzles[selectedPuzzleID].id_false = puzzles[puzzleForChangeID].id_false;
        if(puzzles[11 - selectedPuzzleID].move_id == false){
            puzzles[11 - selectedPuzzleID].move_id = true;
        }
        secondElem.setAttribute("id", selectedPuzzleID);
        puzzles[puzzleForChangeID].id_false = bubble;
        if(puzzles[11 - puzzleForChangeID].move_id == false){
            puzzles[11 -puzzleForChangeID].move_id = true;
        }
}
    }
    
    
    
   




