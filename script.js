const MAXROWS= 6;
const MAXCOLUMNS= 5;
var row= 0;
var column= 0;
var gameOver= false;

const WORD = "GAMES";       


// --------------------------- BOARD CREATION -------------------------------
window.onload = function(){
    for(let r=0; r<MAXROWS; r++){
        for(let c=0; c<MAXCOLUMNS; c++){
            let tile = document.createElement("span");
            tile.id= `${r}${c}`;
            tile.innerText= "";

            document.getElementById("board").appendChild(tile);
        }
    }
}


// ----------------------------- GAME FUNCTIONALITY ---------------------------
// -- Keyboard
document.addEventListener('keyup', e => {
    if(gameOver){
        return;
    }
    else{
        
        // console.log('row: '+row);
        // console.log('column: '+column);
        
        if(e.key >= 'a' && e.key <= 'z'){
            let currentTile= document.getElementById(`${row}${column}`);
            
            if(column < MAXCOLUMNS && currentTile.innerText==""){
                currentTile.innerText= e.key.toUpperCase();
                column++;
            }
        }

        else if(e.key == 'Backspace'){
            if(column> 0 && column <=MAXCOLUMNS ){
                column--;
            }
            let currentTile= document.getElementById(`${row}${column}`);
            currentTile.innerText="";
        }

        else if(e.key == 'Enter' && column == MAXCOLUMNS){
                update();
                row++;
                column= 0;
                if(row == MAXROWS){
                   setTimeout( () => { alert("GAME OVER! The answer was: "+WORD);} , 200);
                }
        }
    }
})


// -- Virtual Keyboard
const keyboard = document.getElementById('keyboard');

keyboard.addEventListener('click', (element) =>{
    // console.log(element.target);
    // console.log(element.target.innerText);

    let key= element.target.innerText;

    if(gameOver){
        return;
    }
    else{
        if(key.length == 1 && key >= 'A' && key <= 'Z'){
            let currentTile= document.getElementById(`${row}${column}`);
            
            if(column < MAXCOLUMNS && currentTile.innerText==""){
                currentTile.innerText= key;
                column++;
            }
        }

        else if(element.target.classList.contains('delete')){
            if(column> 0 && column <=MAXCOLUMNS ){
                column--;
            }
            let currentTile= document.getElementById(`${row}${column}`);
            currentTile.innerText="";
        }

        else if(element.target.classList.contains('enter') && column == MAXCOLUMNS){
                update();
                row++;
                column= 0;
                if(row == MAXROWS){
                    setTimeout( () => { alert("GAME OVER! The answer was: "+WORD);} , 200);
                }
        }
    }
})


// -- UPDATE TILES
function update(){
    let correctLetters=0;

    for(let l=0; l<MAXCOLUMNS; l++){
        let boardTile= document.getElementById(`${row}${l}`);
        let letter= boardTile.innerText;

        // Correct letter
        if(letter == WORD[l]){
            boardTile.classList.add("correct");
            correctLetters++;
        }
        
        // Includes letter
        else if(WORD.includes(letter)){
            boardTile.classList.add("exist");
        }

        // Incorrect letter
        else{
            boardTile.classList.add("incorrect");
        }
        
    }
    
    if(correctLetters == MAXCOLUMNS){
        gameOver=true;

        setTimeout( () => { alert("CONGRATULATIONS! You guessed the word");} , 500);
    }
}