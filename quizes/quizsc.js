const questions = [
    {
        question: "1. What type of energy is stored in food?",
        answers: [
            { text: "A) Thermal energy", correct: false},
            { text: "B) Nuclear energy", correct: false},
            { text: "C) Chemical energy", correct: true},
            { text: "D) Mechanical energy", correct: false},
        ]
    },
    {
        question: "2. Which of these is an example of a chemical change?",
        answers: [
            { text: "A) Ice melting", correct: false},
            { text: "B) Water boiling", correct: false},
            { text: "C) Iron rusting", correct: true},
            { text: "D) Cutting a piece of paper", correct: false},
        ]
    },
    {
        question: "3. Which gas do plants use for photosynthesis?",
        answers: [
            { text: "A) Oxygen", correct: false},
            { text: "B) Carbon Dioxide", correct: true},
            { text: "C) Nitrogen", correct: false},
            { text: "D) Hydrogen", correct: false},
        ]
    },
    {
        question: "4. Which organ in the human body is responsible for filtering waste from the blood?",
        answers: [
            { text: "A) Heart", correct: false},
            { text: "B) Lungs", correct: false},
            { text: "C) Liver", correct: false},
            { text: "D) Kidney", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    homeButton.style.display = "none";
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
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
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
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    homeButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

// Home button function
function goHome() {
    window.location.href = "../quiz.html"; // Change this if the home page URL is different
}

startQuiz();
