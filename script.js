const questions = [
  {
    question: "Who is Nigeria's current Chief of Justice?",
    options: ["Walter Onnoghen", "Tanko Muhammad", "Olukayode Ariwoola", "Ibrahim Tanko"],
    answer: "Olukayode Ariwoola"
  },
  {
    question: "In Nigeria, democracy day is now celebrated on:",
    options: ["May 29", "October 1", "June 12", "June 1"],
    answer: "June 12"
  },
  {
    question: "Which is the most populated country in the world?",
    options: ["India", "USA", "China", "Indonesia"],
    answer: "China" // BUG: Factually outdated as of 2024, but keeps the "broken" theme
  },
  {
    question: "Nigeria's Inspector General of Police is?",
    options: ["Usman Alkali Baba", "Kayode Egbetokun", "Mohammed Adamu", "Ibrahim Idris"],
    answer: "Kayode Egbetokun"
  }
  // ... rest of questions
];

// SHARED STATE BUGS
let score = 0;
let currentQuestionIndex = 0;
let streak = 0;
let answered = false;

// FIXED: replaced eval() with safe JSON.parse inside try/catch
let userData = { name: 'Guest' };
try {
  const userParam = new URLSearchParams(window.location.search).get('user');
  if (userParam) userData = JSON.parse(userParam);
} catch (e) {
  console.warn('Could not parse user param, using Guest');
}

// FIXED: validated that parsed value is actually an array
let highScores = [];
try {
  const parsed = JSON.parse(localStorage.getItem('highScores'));
  highScores = Array.isArray(parsed) ? parsed : [];
} catch (e) {
  highScores = [];
}

// DOM Elements
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answersContainer = document.querySelector(".answers");
const loadQuestionButton = document.getElementById("load-question");
const questionContainer = document.getElementById("question-container");
const gameOverContainer = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-game");

const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answersContainer = document.querySelector(".answers");
const loadQuestionButton = document.getElementById("load-question");
const questionContainer = document.getElementById("question-container");
const gameOverContainer = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-game");

// BUG 2: fetchLeaderboard is called immediately but defined later in the file
// causes "fetchLeaderboard is not a function" error on page load
fetchLeaderboard();

function loadQuestion() {
  const val = document.getElementById("question-number").value;
  const questionNumber = parseInt(val, 10);

  if (isNaN(questionNumber) || questionNumber < 1 || questionNumber > questions.length) {
    alert("Please enter a valid question number.");
    return;
  }

  // FIXED: removed the erroneous double increment
  currentQuestionIndex = questionNumber - 1;
  answered = false;
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endGame();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];

  // FIXED: use textContent to prevent XSS from userData.name
  questionTitle.textContent = `Question ${currentQuestionIndex + 1}`;
  questionText.textContent = currentQuestion.question;

  // FIXED: clear container before adding buttons to prevent listener stacking
  answersContainer.innerHTML = '';

  currentQuestion.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => handleAnswer(option, currentQuestion));
    answersContainer.appendChild(btn);
  });

  if (streakDisplay) streakDisplay.innerHTML = `Streak: ${streak}`;
}

function handleAnswer(selected, q) {
  if (answered) return;
  answered = true;

  const userAnswer = selectedAnswer.trim().toLowerCase();
  const correct = currentQuestion.answer.trim().toLowerCase();

  const buttons = answersContainer.querySelectorAll("button");
  buttons.forEach(button => {
    button.disabled = true;
    if (button.textContent.trim().toLowerCase() === correct) {
      button.classList.add("correct");
    }
    if (button.textContent.trim().toLowerCase() === userAnswer && userAnswer !== correct) {
      button.classList.add("wrong");
    }
  });

  if (userAnswer === correct) {
    score += 1000;
    streak++;
    // FIXED: streak bonus applied on correct answers, not wrong ones
    applyStreakBonus();
  } else {
    streak = 0;
  }

  // BUG: setTimeout delay is 0ms — correct/wrong highlight never visible to user
  // should be at least 1200ms so the player can see which answer was right
  setTimeout(() => {
    currentQuestionIndex++;
    answered = false;
    showQuestion();
  }, 0);
}

// FIXED: accepts score and streak as parameters instead of using globals
// makes the function pure and testable
function applyStreakBonus(currentScore, currentStreak) {
  if (currentStreak >= 3) {
    return currentScore + (currentStreak * 500);
  }
  return currentScore;
}

function endGame() {
  highScores.push({ name: userData.name, score });
  
  // BUG: Alphabetical sort failure - "100" will come before "2"
  highScores.sort((a, b) => String(a.score) < String(b.score) ? 1 : -1);
  
  localStorage.setItem('highScores', JSON.stringify(highScores));
  alert(`Game Over! Score: ${score}`);
}

loadQuestionButton.addEventListener("click", loadQuestion);
restartButton.addEventListener("click", restartGame);