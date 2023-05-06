const questions = [
    {
        question: "HTML stands for ?",
        answers: [
            { text: "Hypermark Language", correct: false},
            { text: "Hypermix Language", correct: false},
            { text: "Hypertext Markup Language", correct: true},
            { text: "Hypertension Language", correct: false},
        ]
    },
    {
        question: "Which attribute set the text direction ?",
        answers: [
            { text: "dir", correct: true},
            { text: "lang", correct: false},
            { text: "direction", correct: false},
            { text: "sub", correct: false},
        ]
    },
    {
        question: "From which tag descriptive list starts ?",
        answers: [
            { text: "LL", correct: false},
            { text: "LDL", correct: false},
            { text: "DD", correct: false},
            { text: "DL", correct: true},
        ]
    },
    {
        question: "HTML is subset of which of the following ?",
        answers: [
            { text: "SGML", correct: true},
            { text: "GHL", correct: false},
            { text: "SHL", correct: false},
            { text: "SGHL", correct: false},
        ]
    },
    {
        question: "How many ways can CSS be written in?",
        answers: [
            { text: "1", correct: false},
            { text: "2", correct: false},
            { text: "3", correct: true},
            { text: "4", correct: false},
        ]
    },
    {
        question: "Which HTML tag is used to declare internal CSS ?",
        answers: [
            { text: "style", correct: true},
            { text: "link", correct: false},
            { text: "script", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: "How can we write comments in CSS ?",
        answers: [
            { text: "/* */", correct: true},
            { text: "//", correct: false},
            { text: "#", correct: false},
            { text: "All of the above", correct: false},
        ]
    },
    {
        question: " By which javascript code is used ?",
        answers: [
            { text: "Classes", correct: false},
            { text: "Methods/Functions", correct: true},
            { text: "RMI", correct: false},
            { text: "Events", correct: false},
        ]
    },
    {
        question: "Original Name of Javascript is ?",
        answers: [
            { text: "Mocha", correct: true},
            { text: "LiveScript", correct: false},
            { text: "Escript", correct: false},
            { text: "Javascript", correct: false},
        ]
    },
    {
        question: "Which is not valid data type in Javascript ?",
        answers: [
            { text: "Undefinded", correct: false},
            { text: "Boolean", correct: false},
            { text: "float", correct: true},
            { text: "Number", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0; 
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = " You Scored "+ score + " out of " + questions.length;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();

