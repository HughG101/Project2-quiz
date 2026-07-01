// Array of quiz question objects
const questions = [
    {
        question: "What does HTML stand for?",
        choices: [
            "HyperText Markup Language",
            "HighTech Modern Language",
            "Hyperlink Text Machine Language",
            "Home Tool Markup Language"
        ],
        correctIndex: 0
    },
    {
        question: "Which HTML element is used for the main content of a page?",
        choices: [
            "<section>",
            "<main>",
            "<footer>",
            "<nav>"
        ],
        correctIndex: 1
    },
    {
        question: "Which CSS property changes the text color?",
        choices: [
            "font-style",
            "background-color",
            "color",
            "text-size"
        ],
        correctIndex: 2
    },
    {
        question: "Which CSS layout method is commonly used for one-dimensional layouts?",
        choices: [
            "Flexbox",
            "Tables",
            "Alerts",
            "JSON"
        ],
        correctIndex: 0
    },
    {
        question: "Which keyword should you use instead of var for a value that will not change?",
        choices: [
            "let",
            "const",
            "fixed",
            "static"
        ],
        correctIndex: 1
    },
    {
        question: "What is an array used for in JavaScript?",
        choices: [
            "Storing multiple values in one variable",
            "Changing the page title only",
            "Styling a webpage",
            "Creating image files"
        ],
        correctIndex: 0
    },
    {
        question: "Which symbol is used for comments on a single line in JavaScript?",
        choices: [
            "<!-- comment -->",
            "/* comment */",
            "// comment",
            "# comment"
        ],
        correctIndex: 2
    },
    {
        question: "What does a conditional statement help a program do?",
        choices: [
            "Repeat code forever only",
            "Make decisions based on conditions",
            "Add images to CSS",
            "Create a new HTML file"
        ],
        correctIndex: 1
    },
    {
        question: "Which method can be used to select an HTML element by its id?",
        choices: [
            "document.getElementById()",
            "document.makeElement()",
            "document.styleElement()",
            "document.newId()"
        ],
        correctIndex: 0
    },
    {
        question: "What does responsive design mean?",
        choices: [
            "A website only works on desktop",
            "A website changes layout for different screen sizes",
            "A website has no CSS",
            "A website loads only images"
        ],
        correctIndex: 1
    }
];

// State variables
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;
let answerSubmitted = false;

// HTML element variables
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");

const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score-text");
const progressFill = document.getElementById("progress-fill");
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices-container");
const answerForm = document.getElementById("answer-form");
const feedbackMessage = document.getElementById("feedback-message");

const finalScore = document.getElementById("final-score");
const finalMessage = document.getElementById("final-message");

// Event listeners
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
answerForm.addEventListener("submit", checkAnswer);
nextBtn.addEventListener("click", goToNextQuestion);

// Starts or restarts the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswerIndex = null;
    answerSubmitted = false;

    showScreen("quiz");
    displayQuestion();
}

// Shows the correct screen
function showScreen(screenName) {
    startScreen.classList.add("hidden");
    quizScreen.classList.add("hidden");
    resultsScreen.classList.add("hidden");

    if (screenName === "start") {
        startScreen.classList.remove("hidden");
    } else if (screenName === "quiz") {
        quizScreen.classList.remove("hidden");
    } else if (screenName === "results") {
        resultsScreen.classList.remove("hidden");
    }
}

// Displays the current question and answer choices
function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    selectedAnswerIndex = null;
    answerSubmitted = false;

    questionText.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";
    feedbackMessage.textContent = "";
    feedbackMessage.className = "feedback";

    submitBtn.disabled = true;
    submitBtn.classList.remove("hidden");
    nextBtn.classList.add("hidden");

    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    scoreText.textContent = `Score: ${score}`;

    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Loop through each answer choice and add it to the page
    currentQuestion.choices.forEach(function(choice, index) {
        const label = document.createElement("label");
        label.classList.add("choice-option");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = index;

        const choiceText = document.createElement("span");
        choiceText.textContent = choice;

        label.appendChild(radio);
        label.appendChild(choiceText);

        label.addEventListener("click", function() {
            selectAnswer(index);
        });

        choicesContainer.appendChild(label);
    });
}

// Handles selecting an answer
function selectAnswer(index) {
    if (answerSubmitted) {
        return;
    }

    selectedAnswerIndex = index;
    submitBtn.disabled = false;

    const choiceLabels = document.querySelectorAll(".choice-option");

    choiceLabels.forEach(function(label) {
        label.classList.remove("selected");
    });

    choiceLabels[index].classList.add("selected");
}

// Checks whether the selected answer is correct
function checkAnswer(event) {
    event.preventDefault();

    if (selectedAnswerIndex === null || answerSubmitted) {
        return;
    }

    answerSubmitted = true;

    const currentQuestion = questions[currentQuestionIndex];
    const choiceLabels = document.querySelectorAll(".choice-option");

    if (selectedAnswerIndex === currentQuestion.correctIndex) {
        score++;
        feedbackMessage.textContent = "Correct!";
        feedbackMessage.classList.add("correct-text");
        choiceLabels[selectedAnswerIndex].classList.add("correct");
    } else {
        feedbackMessage.textContent = `Incorrect. The correct answer was: ${currentQuestion.choices[currentQuestion.correctIndex]}`;
        feedbackMessage.classList.add("incorrect-text");
        choiceLabels[selectedAnswerIndex].classList.add("incorrect");
        choiceLabels[currentQuestion.correctIndex].classList.add("correct");
    }

    scoreText.textContent = `Score: ${score}`;

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");

    // Disable all radio buttons after submitting
    const radioButtons = document.querySelectorAll("input[name='answer']");
    radioButtons.forEach(function(radio) {
        radio.disabled = true;
    });
}

// Goes to the next question or shows results
function goToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Displays the final results screen
function showResults() {
    showScreen("results");

    progressFill.style.width = "100%";

    finalScore.textContent = `You scored ${score} out of ${questions.length}.`;

    const percentage = (score / questions.length) * 100;

    if (percentage >= 90) {
        finalMessage.textContent = "Excellent work! You really know this material.";
    } else if (percentage >= 70) {
        finalMessage.textContent = "Good job! You have a solid understanding.";
    } else if (percentage >= 50) {
        finalMessage.textContent = "Not bad, but you may want to review a few topics.";
    } else {
        finalMessage.textContent = "Keep practicing. You can improve with more review.";
    }
}