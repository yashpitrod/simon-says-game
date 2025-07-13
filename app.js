let gameseq = [];
let userseq = [];
let highestscore = [];
let btncolors = ["yellow","red","blue","green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let highestscr = document.querySelector(".Highestscr");

document.addEventListener("keypress" , function(){
    if(started == false){
        started = true;
        levelup();
    }

});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },200);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },200);
}

function checkAns(idx){
    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelup , 500);
        }
    }
    else{
        h2.innerHTML = `Game Over! Your score was <b>${level}<b> Press any key to play again.`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "rgb(239, 255, 255)";
        }, 100);
        highestscore.push(level);
        highestscr.innerText = `Highest Score: ${Math.max(...highestscore)}`
        reset();
    }
}

function levelup(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randomidx = Math.floor(Math.random()*4);
    let randcolor = btncolors[randomidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    gameflash(randbtn);
}

function btnpress(){
    let btn = this;
    userflash(btn);
    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}