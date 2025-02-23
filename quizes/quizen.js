const questions = [
    {
        question: "1. Which sentence uses the correct form of the word 'their'?",
        answers: [
            { text: "A) Their going to the park later.", correct: false},
            { text: "B) The dog wagged it's tail as their walked.", correct: false},
            { text: "C) They left their books on the table. ", correct: true},
            { text: "D) I can't believe their is a test tomorrow!", correct: false},
        ]
    },
    {
        question: "2. What is the meaning of the idiom 'break the ice'?",
        answers: [
            { text: "A) To shatter something fragile", correct: false},
            { text: "B) To start a conversation in a social setting ", correct: true},
            { text: "C) To get very cold", correct: false},
            { text: "D) To ruin a friendship", correct: false},
        ]
    }, 
    {
        question: "Which literary device is used in the sentence: 'The wind whispered through the trees'?",
        answers: [
            { text: "A) Simile", correct: false},
            { text: "B) Metaphor", correct: false},
            { text: "C) Hyperbole", correct: false},
            { text: "D) Personification ", correct: true},
        ]
    },
    {
        question: "Which of the following sentences is in passive voice?",
        answers: [
            { text: "A) She wrote a beautiful poem.", correct: false},
            { text: "B) The cake was baked by my grandmother.", correct: true},
            { text: "C) They will visit the museum tomorrow.", correct: false},
            { text: "D) I saw a bird flying across the sky.", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const homeButton = document.getElementById("home-btn"); // Get the home button

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
    homeButton.style.display = "none"; // Hide home button during quiz
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
    homeButton.style.display = "block"; // Show home button after quiz
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

// Home Button Click - Redirect to quiz.html
homeButton.addEventListener("click", () => {
    window.location.href = "../quiz.html";

});

startQuiz();
