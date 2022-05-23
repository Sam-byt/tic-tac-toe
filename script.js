let win =false;
let gameTurn = true;
let myArray = new Array(3);
let f = true;

for (var i = 0; i < 3; i++)myArray[i] = new Array(3);

for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++)myArray[i][j] = -1;
}

let ids = new Array();

function whose_turn(k) {
    let turn_text = document.getElementById('turn');
    turn_text.innerHTML = k ? `Turn for X` : `Turn for 0`;
}

function initial_conditions() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++)myArray[i][j] = -1;
    }
    win = false;
    gameTurn = true;
    while(ids.length>0){
        document.getElementById(ids[ids.length-1]).innerHTML = "";
        ids.pop();
    }
    document.getElementById('reset').disabled = false;
    document.getElementById('reset').style.visibility = "visible";
    document.getElementById('play_again').style.visibility = "collapse";
    document.getElementById('play_again').disabled = true;
    document.getElementById('myLine').style = "background-color: transparent;";
    document.getElementById('winner').innerText = "";
    
    whose_turn(gameTurn);
    
}

function playAgain(){
    initial_conditions();
}

function checkforWin() {
    //Rows
    if ((myArray[0][0] == 1 && myArray[0][1] == 1 && myArray[0][2] == 1) || (myArray[0][0] == 0 && myArray[0][1] == 0 && myArray[0][2] == 0)) return "row0";
    if ((myArray[1][0] == 1 && myArray[1][1] == 1 && myArray[1][2] == 1) || (myArray[1][0] == 0 && myArray[1][1] == 0 && myArray[1][2] == 0)) return "row1";
    if ((myArray[2][0] == 1 && myArray[2][1] == 1 && myArray[2][2] == 1) || (myArray[2][0] == 0 && myArray[2][1] == 0 && myArray[2][2] == 0)) return "row2";

    //columns
    if ((myArray[0][0] == 1 && myArray[1][0] == 1 && myArray[2][0] == 1) || (myArray[0][0] == 0 && myArray[1][0] == 0 && myArray[2][0] == 0)) return "col0";
    if ((myArray[0][1] == 1 && myArray[1][1] == 1 && myArray[2][1] == 1) || (myArray[0][1] == 0 && myArray[1][1] == 0 && myArray[2][1] == 0)) return "col1";
    if ((myArray[0][2] == 1 && myArray[1][2] == 1 && myArray[2][2] == 1) || (myArray[0][2] == 0 && myArray[1][2] == 0 && myArray[2][2] == 0)) return "col2";

    //Diagonals
    if ((myArray[0][2] == 1 && myArray[1][1] == 1 && myArray[2][0] == 1) || (myArray[0][2] == 0 && myArray[1][1] == 0 && myArray[2][0] == 0)) return "left";
    if ((myArray[0][0] == 1 && myArray[1][1] == 1 && myArray[2][2] == 1) || (myArray[0][0] == 0 && myArray[1][1] == 0 && myArray[2][2] == 0)) return "right";

    else {
        return ids.length == 9 ? "0" : "-1";
    }

}

function myGame(s, k) {
    let e = document.getElementById(s);
    e.innerHTML = k ? "<span class='boxText'>X</span>" : "<span class='boxText'>0</span>";
}



function gameTest() {
    let b = checkforWin();
    if (b == "-1") {
        whose_turn(gameTurn);
    }
    else if (b == "0") {
        document.getElementById('turn').innerText = "";
        document.getElementById('winner').innerHTML = "Oops! Match Draw!"
        if(f){
            document.getElementById('winner').style.animation = "f1 1s ease-in-out 1";
            f=!f;
        }
        else{
            document.getElementById('winner').style.animation = "f2 1s ease-in-out 1";
            f=!f;
        }
        win = true;
        document.getElementById('reset').disabled = true;
        document.getElementById('reset').style.visibility = "collapse";
        document.getElementById('play_again').style.visibility = "visible";
        document.getElementById('play_again').disabled = false;
    }
    else {
        switch (b) {
            case "row0":
                document.getElementById('myLine').style = "background-color: #FF0266; width:30vw; transform:translateY(-10vw);";
                break;
            case "row1":
                document.getElementById('myLine').style = "background-color: #FF0266; width:30vw;";
                break;
            case "row2":
                document.getElementById('myLine').style = "background-color: #FF0266; width:30vw; transform:translateY(10vw);";
                break;
            case "col0":
                document.getElementById('myLine').style = "background-color: #FF0266; width:30vw; transform:rotate(90deg) translateY(10vw);";
                break;
            case "col1":
                document.getElementById('myLine').style = "background-color: #FF0266; width:30vw; transform:rotate(90deg);";
                break;
            case "col2":
                document.getElementById('myLine').style = "background-color: #FF0266; width:30vw; transform:rotate(90deg) translateY(-10vw);";
                break;
            case "left":
                document.getElementById('myLine').style = "background-color: #FF0266; width:40vw; transform:rotate(-45deg)";
                break;
            case "right":
                document.getElementById('myLine').style = "background-color: #FF0266; width:40vw; transform:rotate(45deg)";
                break;
        }
        document.getElementById('turn').innerText = "";
        document.getElementById('winner').innerText = gameTurn?"Player 2 Wins!":"Player 1 Wins!"
        if(f){
            document.getElementById('winner').style.animation = "f1 1s ease-in-out 1";
            f=!f;
        }
        else{
            document.getElementById('winner').style.animation = "f2 1s ease-in-out 1";
            f=!f;
        }
        win = true;
        document.getElementById('reset').disabled = true;
        document.getElementById('reset').style.visibility = "collapse";
        document.getElementById('play_again').style.visibility = "visible";
        document.getElementById('play_again').disabled = false;
        
    }
}





function Updation(str) {
    if (myArray[str[0] - '0'][str[1] - '0'] == -1) {
        myGame(str, gameTurn);
        myArray[str[0] - '0'][str[1] - '0'] = gameTurn ? 1 : 0;
        ids.push(str);
        gameTurn = !gameTurn;
        gameTest();
    }

}

function takeBack() {
    let str1 = ids[ids.length - 1];
    let last_element = document.getElementById(str1);
    ids.pop();
    myArray[str1[0] - '0'][str1[1] - '0'] = -1;
    last_element.innerHTML = "";
    gameTurn = !gameTurn;
    gameTest();
}


let flag = false;
function myButton() {
    if (flag) {
        document.getElementById('reset').style.animation = 'resetAnimation 0.5s ease-in-out 1';
        flag = false;
    }
    else {
        document.getElementById('reset').style.animation = 'resetAnimation360 0.5s ease-in-out 1';
        flag = true;
    }

    if (ids.length == 0) {
        alert('Board is empty');
        gameTurn = true;
    }
    else {
        takeBack();
    }
}


document.getElementById('00').addEventListener('click', function () {
    win == false?Updation('00'):alert('The match has ended !You are Cheating! Hit the play Again Button and Try again! Good luck!');
});
document.getElementById('01').addEventListener('click', function () {
    win == false?Updation('01'):alert('The match has ended !You are Cheating! Hit the play Again Button and Try again! Good luck!');
});
document.getElementById('02').addEventListener('click', function () {
    win == false?Updation('02'):alert('The match has ended !You are Cheating! Hit the play Again Button and Try again! Good luck!');
});

document.getElementById('10').addEventListener('click', function () {
    win == false?Updation('10'):alert('The match has ended !You are Cheating! Hit the play Again Button and Try again! Good luck!');
});
document.getElementById('11').addEventListener('click', function () {
    win == false?Updation('11'):alert('The match has ended !You are Cheating! Hit the play Again Button and Try again! Good luck!');
});
document.getElementById('12').addEventListener('click', function () {
    win == false?Updation('12'):alert('The match has ended !You are Cheating! Hit the play Again Button and Try again! Good luck!');
});
document.getElementById('20').addEventListener('click', function () {
    win == false?Updation('20'):alert('The match has ended !You are Cheating! Hit the play Again Button and Try again! Good luck!');
});
document.getElementById('21').addEventListener('click', function () {
    win == false?Updation('21'):alert('The match has ended !You are Cheating! Hit the play Again Button and Try again! Good luck!');
});
document.getElementById('22').addEventListener('click', function () {
    win == false?Updation('22'):alert('The match has ended !You are Cheating! Hit the play Again Button and Try again! Good luck!');
});



