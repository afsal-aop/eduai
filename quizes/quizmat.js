const questions = [
    {
        question: "1. What is the value of 5^3?",
        answers: [
            { text: "A) 15", correct: false },
            { text: "B) 25", correct: false },
            { text: "C) 125", correct: true },
            { text: "D) 225", correct: false },
        ]
    },
    {
        question: "2. If a triangle has angles measuring 35° and 55°, what is the measure of the third angle?",
        answers: [
            { text: "A) 90°", correct: true },
            { text: "B) 80°", correct: false },
            { text: "C) 70°", correct: false },
            { text: "D) 60°", correct: false },
        ]
    },
    {
        question: "3. What is the square root of 144?",
        answers: [
            { text: "A) 10", correct: false },
            { text: "B) 11", correct: false },
            { text: "C) 12", correct: true },
            { text: "D) 14", correct: false },
        ]
    },
    {
        question: "4. If a car travels at 60 km/h, how far will it go in 2.5 hours?",
        answers: [
            { text: "A) 120 km", correct: false },
            { text: "B) 150 km", correct: true },
            { text: "C) 180 km", correct: false },
            { text: "D) 200 km", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn"); // Home Button Reference

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    homeButton.style.display = "none"; // Hide home button at start
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    homeButton.style.display = "none"; // Hide home button during questions
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    homeButton.style.display = "block"; // Show home button when quiz ends
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Home Button Event
homeButton.addEventListener("click", () => {
    window.location.href = "../quiz.html"; // Adjust if needed
});

startQuiz();
