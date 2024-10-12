let details=JSON.parse(localStorage.getItem("details"));
let QuizUser=JSON.parse(localStorage.getItem("QuizUser"));
let body=document.querySelector("body")

if(QuizUser){
   if(QuizUser.quiz) {
    body.innerHTML=`Quiz Already Taken,to see result <a href="#">click here</a>`
   }
   else{
    mainFunction()
   }
}
else{
    alert("Please Login First");
    window.location.href="login.html"
}


function mainFunction(){
    let storage=[
        {
            questionId:"1",
            question:"ROLLBACK in a database is ________ statement ?",
            options:["TCL","DCL","DML","DDL"],
            crctans:"TCL",
            userAnswer:"",
            visited:false
        },
    
        {
            questionId:"2",
            question:"Dr. E.F. Codd represented ______ rules that a database must obey if it has to be considered truly relational ?",
            options:["10","8","12","6"],
            crctans:"12",
            userAnswer:"",
            visited:false
        },
    
        {
            questionId:"3",
            question:"	Periodically adding, changing and deleting file records is called file ?",
            options:["updating ","upgrading","restructiring ","renewing "],
            crctans:"updating",
            userAnswer:"",
            visited:false
        },
    
        {
            questionId:"4",
            question:"A collection of interrelated records is called a ?",
            options:["management information system","spreadsheet","database","text file"],
            crctans:"data",
            userAnswer:"",
            visited:false
        },
        {
            questionId:"5",
            question:"__________ represents raw facts, whereas __________ is data made meaningful ?",
            options:["Information, reporting","Data, information ","Information, bits","Records, bytes"],
            crctans:"Data, information ",
            userAnswer:"",
            visited:false
        },
    
        {
            questionId:"6",
            question:"	A collection of unprocessed items is ________ ?",
            options:["information","data","memory","reports"],
            crctans:"data",
            userAnswer:"",
            visited:false
        },
    
        {
            questionId:"7",
            question:"External database is ?",
            options:["Database created in EXCEL","Database created using DBMS package ","Database created in MS-Word","All of the above "],
            crctans:"Database created using DBMS package ",
            userAnswer:"",
            visited:false
        }
    ];
    let actualQuestion=document.querySelector("#actualCont");
    let actualOption=document.querySelector("#actualOption");
    let actualButton=document.querySelector("#actualButton");
    let footer=document.querySelector("footer");
    let previousBtn=footer.querySelectorAll("button")[0];
    let nextBtn=footer.querySelectorAll("button")[1];
    let saveBtn=footer.querySelectorAll("button")[2];
    let submitBtn=footer.querySelectorAll("button")[3];
    
    
    // console.log(actualQuestion,actualOption,actualButton,footer,previousBtn,nextBtn,saveBtn,submitBtn);
    let index=0;
    function create(){
        storage.forEach((e)=>{
            let btn=document.createElement("button");
            btn.innerText=e.questionId;
            actualButton.append(btn);
            btn.id=e.questionId;
    
        })
    }
    create()
    let allbtn=actualButton.querySelectorAll("button");
    
    function display() {
        // Reset all buttons to their original colors
        allbtn.forEach((btn, i) => {
            if (storage[i].userAnswer) {
                btn.style.backgroundColor = "green"; // Answered
            } else if (storage[i].visited) {
                btn.style.backgroundColor = "red"; // Visited but not answered
            } else {
                btn.style.backgroundColor = ""; // Default color
            }
        });
    
        // Set the current question's button to cyan
        actualQuestion.innerHTML = storage[index].questionId + "." + storage[index].question;
        storage[index].visited = true;
        actualOption.innerHTML = "";
        storage[index].options.map((e) => {
            let btn = document.createElement("input");
            btn.type = "radio";
            btn.value = e;
            btn.name = "options";
            let label = document.createElement("label");
            label.innerText = e;
            if (storage[index].userAnswer == btn.value) {
                btn.checked = true;
            }
            actualOption.append(btn, label);
        });
    
        // Highlight the current question button in cyan
        allbtn.forEach((e) => {
            if (e.id - 1 == index) {
                e.style.backgroundColor = "cyan";
            }
        });
    }
    
    // function display(){
    //     actualQuestion.innerHTML=storage[index].questionId+"."+storage[index].question;
    //     storage[index].visited=true;
    //     actualOption.innerHTML="";
    //     storage[index].options.map((e)=>{
            
    //         let btn=document.createElement("input");
    //         btn.type="radio";
    //         btn.value=e;
    //         btn.name="options"
    //         let label=document.createElement("label");
    //         label.innerText=e;
    //         if(storage[index].userAnswer==btn.value){
    //             btn.checked=true;
    //         }
    //         actualOption.append(btn,label);
    
         
    //     })
    //     allbtn.forEach((e)=>{
    //         if(e.id-1==index){
    //             e.style.backgroundColor="cyan";
    //         }
            
    //     })
    // }
    
    display();
    
    nextBtn.addEventListener("click",()=>{
         save();
        notsave();
        
        index=(index+1)%storage.length;
        display();
    legends()
    
    })
    
    previousBtn.addEventListener("click",()=>{
        save();
        notsave();
        index=(index-1+storage.length)%storage.length;
        display();
    legends()
    
    })
    
    saveBtn.addEventListener("click",()=>{
        save();
        notsave();
        index=(index+1)%storage.length;
        display();
    legends()
    
    })
    
    // console.log(allbtn);
    
    
    function individualbtn(){
        allbtn.forEach((btn)=>{
            btn.addEventListener("click",()=>{
             save();
            index=btn.id-1;
    
            notsave();
            display();
    legends()
    
            })
        })
    }
    individualbtn()
    
    
    function save(){
        let opt=document.querySelectorAll("input");
        opt.forEach((e)=>{
            if(e.checked){
                
                storage[index].userAnswer=e.value;
                console.log(storage);
    
                allbtn.forEach((e)=>{
                    if(e.id-1==index){
                        e.style.backgroundColor="green";
                    }
                    
                })
                         
                
            }
          
        })
    }
    save();
    
    function notsave(){
        storage[index].visited=true;
        if(!(storage[index].userAnswer)){
            allbtn.forEach((e)=>{
                if(e.id-1==index){
                    e.style.backgroundColor="red";
                }
                
            })
    
        }
    }
    function legends(){
    let span=document.querySelector("#option");
    let answered=span.querySelectorAll("span")[0];
    let notanswered=span.querySelectorAll("span")[1];
    let marked=span.querySelectorAll("span")[2];
    let visited=span.querySelectorAll("span")[3];
    
    let answerCount=0;
    let notansweredCount=storage.length;
    let markedCount=0;
    let notVisitedCount=storage.length;
    
    storage.forEach((e)=>{
        if(e.userAnswer){
            answerCount++;
            notansweredCount--;
        }
       
       if((e.visited)){
            notVisitedCount--;
        }
    
    
        if(e.visited && !e.userAnswer){
            markedCount++;
        }
    
     
    })
    // console.log(span,answered,notanswered,marked,visited);
    answered.innerText=answerCount;
    marked.innerText=markedCount
    notanswered.innerText=notansweredCount;
    visited.innerText=notVisitedCount;
    
    
    }
    legends()
    
    function timer(){
        let nav=document.querySelector("#timer");
        let hr=nav.querySelectorAll("span")[0]
        let min=nav.querySelectorAll("span")[1]
        let sec=nav.querySelectorAll("span")[2]
    
        let duration=50;
        let interval=setInterval(()=>{
        duration--;
        hr.innerText=Math.floor((duration/3600));
        min.innerText=Math.floor((duration%3600)/60);
        sec.innerText=(duration%3600)%60;
    
    
        if(duration==0){
            clearInterval(interval)
            QuizUser.quiz=storage;
            localStorage.setItem("QuizUser",JSON.stringify(QuizUser));
        
            details=details.filter((e)=>{
                if(e.phone!=QuizUser.phone){
                    return;
                }
            })
                    
            details.push(QuizUser);
            localStorage.setItem("details",JSON.stringify(details));
            window.location.href="./result.html";
    
        }
    
        },1000)
       
    
    
    }
    timer();
    
    
    submitBtn.addEventListener("click",()=>{
       let a= confirm("Are you sure want to submit?")
       if(a){      
        QuizUser.quiz=storage;
        localStorage.setItem("QuizUser",JSON.stringify(QuizUser));
    
        details=details.filter((e)=>{
            if(e.phone!=QuizUser.phone){
                return;
            }
        })
                
        details.push(QuizUser);
        localStorage.setItem("details",JSON.stringify(details));
        window.location.href="./result.html";
       }
    
    })
}

