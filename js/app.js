// Array of quiz question objects
const questions = [
    {
        question: "What year did World War Two Start?",
        choices: [
            "1939",
            "1941",
            "1935",
            "1945"
        ],
        correctIndex: 0
    },
    {
        question: "What was the first country that Germany Invaded to Start World War Two?",
        choices: [
            "Poland",
            "France",
            "Soviet Union",
            "Great Britain"
        ],
        correctIndex: 0
    },
    {
        question: "What country was the target of operation Barbarossa?",
        choices: [
            "Italy",
            "Empire of Japan",
            "Soviet Union",
            "Great Britain"
        ],
        correctIndex: 2
    },
    {
        question: "What was the Target of Operation Overlord",
        choices: [
            "Normandy",
            "Italy",
            "Africa",
            "Iwo Jima"
        ],
        correctIndex: 0
    },
    {
        question: "What Battle was Taffy 3 famous for fighting in?",
        choices: [
            "Midway",
            "Leyte Gulf",
            "Coral Sea",
            "Battle off Samar"
        ],
        correctIndex: 3
    },
    {
        question: "What Aircraft Carriers did the United States sink During the battle of Midway?",
        choices: [
            "Zuiho, Hiyo, Junyo, Gamber Bay",
            "Shinano, Yorktown, and Lexington",
            "Akagi, Kaga, Soryu, and Hiryu",
            "Kaga, Ryujo, Shokaku, and Zuikaku"
        ],
        correctIndex: 2
    },
    {
        question: "What Day was D-Day?",
        choices: [
            "June 6, 1944",
            "September 1, 1939",
            "December 7, 1941",
            "June 5, 1944"
        ],
        correctIndex: 0
    },
    {
        question: "What United States Capital ships were sunk during the attack on Pearl Harbor?",
        choices: [
            "USS Arizona",
            "USS Oklahoma",
            "USS West Virginia",
            "All of the above"
        ],
        correctIndex: 3
    },
    {
        question: "What United States Carrier was the most successful during World War Two?",
        choices: [
            "USS Enterprise",
            "USS Yorktown",
            "USS Hornet",
            "USS Washington"
        ],
        correctIndex: 0
    },
    {
        question: "What was the trials held for German War Criminals called?",
        choices: [
            "Nuremberg Trials",
            "Tokyo Trials",
            "London Trials",
            "Paris Trials"
        ],
        correctIndex: 0
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