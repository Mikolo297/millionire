const questions = [
  {
    question: "Who is Nigeria's current Chief of Justice?",
    options: ["Walter Onnoghen", "Tanko Muhammad", "Olukayode Ariwoola", "Ibrahim Tanko"],
    answer: "Olukayode Ariwoola"
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
let answered = false;

// BUG 1: eval() used to parse user input — XSS vulnerability
let userData = eval(new URLSearchParams(window.location.search).get('user'));

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

  // BUG 3: innerHTML used with user input — XSS vulnerability
  document.getElementById("result").innerHTML = `You selected: ${selectedAnswer}`;

  if (selectedAnswer === currentQuestion.answer) {
    score += 1000;
    // BUG 4: streak bonus applied even on wrong answers
    applyStreakBonus();
  }

  // BUG 5: 0ms timeout — player never sees correct/wrong highlight
  setTimeout(() => {
    // BUG 6: double increment
    currentQuestionIndex++;
    currentQuestionIndex++;
    answered = false;
    showQuestion();
  }, 0);
}

// BUG 7: uses globals instead of parameters — not testable
function applyStreakBonus() {
  if (streak >= 3) {
    score += streak * 500;
  }
}

function endGame() {
  highScores.push({ name: userData.name, score });
  
  // BUG: Alphabetical sort failure - "100" will come before "2"
  highScores.sort((a, b) => String(a.score) < String(b.score) ? 1 : -1);
  
  localStorage.setItem('highScores', JSON.stringify(highScores));
  alert(`Game Over! Score: ${score}`);
}

  // BUG 10: innerHTML with user data — XSS vulnerability
  document.getElementById("final-score").innerHTML = `${userData.name} scored: ${score}`;
}