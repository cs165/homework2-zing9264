// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

const allGrid = document.querySelectorAll('.choice-item');

var finished = [0,0,0];
var totalGrid ={};
var finalanswer=[];

for (const grid of allGrid) {

    grid.addEventListener('click', function () {
        changeToClick(grid);
    });
    totalGrid[grid.dataset.choiceId+grid.dataset.questionId]={
        name:grid.dataset.choiceId+grid.dataset.questionId,
        qid:grid.dataset.questionId,
        cid:grid.dataset.choiceId,
        selected:false,
        unselected:false
    }
    console.log(totalGrid[grid.dataset.choiceId+grid.dataset.questionId]);
}

function changeToClick(event){
    let choiceId = event.dataset.choiceId;
    let questionId=event.dataset.questionId;
    let thisId=choiceId+questionId;

    if(finished[0]===1 && finished[1]===1 && finished[2]===1){
        anwser();
        return;
    }

    console.log("this is:"+choiceId+questionId);
    console.log("free:"+totalGrid[choiceId+questionId].name);

    for(let obj of Object.keys(totalGrid)){
        console.log("obj:"+obj);
        if(totalGrid[obj].qid===questionId){
            if(totalGrid[obj].name===thisId ){
                totalGrid[obj].selected=true;
                totalGrid[obj].unselected=false;
            }
            else {
                totalGrid[obj].unselected=true;
                totalGrid[obj].selected=false ;
            }
        }
    }
    if(totalGrid[thisId].qid==="one"){
        finished[0]=1;
        finalanswer[0]=choiceId;
    }
    if(totalGrid[thisId].qid==="two"){
        finished[1]=1;
        finalanswer[1]=choiceId;
    }
    if(totalGrid[thisId].qid==="three"){
        finished[2]=1;
        finalanswer[2]=choiceId;
    }

    console.log('finish:'+finished);
    console.log("name:"+totalGrid[thisId].name);
    console.log("qid:"+totalGrid[thisId].qid);
    console.log("selected:"+totalGrid[thisId].selected);
    console.log("unselected:"+totalGrid[thisId].unselected);

    changeToGray(event);
}

function changeToGray(target) {
    for(let grid of allGrid){
        let thisId=grid.dataset.choiceId+grid.dataset.questionId;
        console.log('tid:'+target.dataset.questionId );
        if(totalGrid[thisId].qid===target.dataset.questionId ){
            console.log("freename:"+totalGrid[thisId].name);
            console.log("qid:"+totalGrid[thisId].qid);
            console.log("selected:"+totalGrid[thisId].selected);
            console.log("unselected:"+totalGrid[thisId].unselected);
            if(totalGrid[thisId].selected===true){
                grid.classList.add('choice-grid-selected');
                grid.classList.remove('choice-grid-unselected');
            }
            if(totalGrid[thisId].unselected===true){
                grid.classList.add('choice-grid-unselected');
                grid.classList.remove('choice-grid-selected');
            }
        }
    }

    if(finished[0]===1 && finished[1]===1 && finished[2]===1){
        anwser();
        return;
    }
}
function anwser() {
    let cnt={
        blep:0,
        happy:0,
        sleeping:0,
        dopey: 0,
        burger: 0,
        cart: 0,
        nerd:0,
        shy:0,
        sleepy:0
        }

    for( let i of finalanswer){
        cnt[i] = cnt[i]+1;
    }

    let max=0;
    let maxptr;
    for( let i of   Object.keys(cnt)){
        if(parseInt(cnt[i])>parseInt(max)){
            max=cnt[i];
            maxptr=i;
        }
    }
    console.log("max:"+max );
    console.log(typeof max);
    console.log("maxptr:"+ maxptr );

    if(max===1){
        document.getElementById("title").innerText=RESULTS_MAP['burger'].title;
        document.getElementById("contents").innerText=RESULTS_MAP['burger'].contents;
    }
    else {
        document.getElementById("title").innerText=RESULTS_MAP[maxptr].title;
        document.getElementById("contents").innerText=RESULTS_MAP[maxptr].contents;
    }
    document.getElementById("top").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

}
function restart(){
    finalanswer=[];
    finished = [0,0,0];
    document.getElementById("title").innerText='';
    document.getElementById("contents").innerText='';
    for (const grid of allGrid) {
        grid.classList.remove('choice-grid-selected');
        grid.classList.remove('choice-grid-unselected');
        totalGrid[grid.dataset.choiceId+grid.dataset.questionId]={
            name:grid.dataset.choiceId+grid.dataset.questionId,
            qid:grid.dataset.questionId,
            cid:grid.dataset.choiceId,
            selected:false,
            unselected:false
        }
    }
    document.getElementById("top").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}
