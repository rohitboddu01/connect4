board=document.querySelector(".board");
reset=document.querySelector("#reset");
winner=document.querySelector("#winner");
undo=document.querySelector("button");

winner.innerText="Blue Turn";
let currentTurn="blueturn";
let gameOver=false;
let arr=[];
let cols=[5,5,5,5,5,5,5];
let item=0;
let r=0;
let c=0;
let undoCount=0;


for(let i=0;i<6;i++){
    rows=[]
    for(let j=0;j<7;j++){
        but=document.createElement("button");
        but.id=`${i}_${j}`
        but.classList.add("but");
        board.append(but);

        but.addEventListener("click", addColor);//addColor is callback function do not have parenthesis(having () means execute)
        // checkWinner();
        rows.push("");
    }
    arr.push(rows);
} 

function addColor(ele){
    undoCount=1;
    if(gameOver==true){
        return;
    }
    list=ele.target.id.split("_");
    c=list[1];
    r=cols[c];
    if(r<0){
        return;
    }
    // console.log(list);
    item = document.getElementById(`${r}_${c}`);
    // console.log(item);
    
    if(currentTurn == "blueturn"){
       item.classList.add("blue");
       arr[r][c]="b";
       currentTurn="pinkturn";
       winner.innerText="pink Turn";
    }
    else{
        item.classList.add("pink");
        currentTurn="blueturn";
        arr[r][c]="p";
        winner.innerText="Blue Turn";
    }
    r -= 1;
    cols[c]=r;
    checkWinner();
}
function checkWinner(){
    // row to check
    for(let i=0;i<6;i++){
        for(let j=0;j<7-3;j++){
            if(arr[i][j]==""){
                continue;
            }
            else{
                if(arr[i][j] == arr[i][j+1] && arr[i][j+1]==arr[i][j+2] && arr[i][j+2]==arr[i][j+3]){
                    setWinner(arr[i][j]);
                    gameOver=true;
                }
            }
        }
    } 
    // columns check   
    for(let i=0;i<6-3;i++){
        for(let j=0;j<7;j++){
            if(arr[i][j]==""){
                continue;
            }
            else{
                if(arr[i][j] == arr[i+1][j] && arr[i+1][j]==arr[i+2][j] && arr[i+2][j]==arr[i+3][j]){
                    setWinner(arr[i][j]);
                    gameOver=true;
                }
            }
        }    
    }
    // diagonal 1 check
    for(let i=0;i<6-3;i++){
        for(let j=0;j<7-3;j++){
            if(arr[i][j]==""){
                continue;
            }
            else{
                if(arr[i][j] == arr[i+1][j+1] && arr[i+1][j+1]==arr[i+2][j+2] && arr[i+2][j+2]==arr[i+3][j+3]){
                    setWinner(arr[i][j]);
                    gameOver=true;
                }
            }
        }    
    }
    // diagnal 2 check
    for(let i=0;i<6-3;i++){
        for(let j=3;j<7;j++){
            if(arr[i][j]==""){
                continue;
            }
            else{
                if(arr[i][j] == arr[i+1][j-1] && arr[i+1][j-1]==arr[i+2][j-2] && arr[i+2][j-2]==arr[i+3][j-3]){
                    setWinner(arr[i][j]);
                    gameOver=true;
                }
            }
        }    
    }

}
function setWinner(x){
    if(x=="b"){
        winner.innerText=`Winner is blue`;
    }
    else{
        winner.innerText=`Winner is pink`;
    }
}

reset.addEventListener("click",resetGame);
 
function resetGame(){
    arr=[]
    for(let i=0;i<6;i++){
        rows=[]
        for(let j=0;j<7;j++){
            item = document.getElementById(`${i}_${j}`);
            item.classList.remove("blue","pink");
            rows.push("");
        }
        arr.push(rows);
    }
    gameOver=false;
    currentTurn="blueturn";
    cols=[5,5,5,5,5,5,5];
    winner.innerText="Blue Turn";
}
undo.addEventListener("click",()=>{
    if(gameOver==true || undoCount==0){
        return;
    }
    else if(currentTurn == "blueturn"){
       item.classList.remove("pink");
       arr[r+1][c]="";
       currentTurn="pinkturn";
       winner.innerText="pink Turn";
    }
    else{
        item.classList.remove("blue");
        currentTurn="blueturn";
        arr[r+1][c]="";
        winner.innerText="Blue Turn";
    }
    undoCount=0;
    cols[c] +=1;
    // console.log(item,c,r);
});
