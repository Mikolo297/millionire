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
    answer: "China"
  },
  {
    question: "Nigeria's Inspector General of Police is?",
    options: ["Usman Alkali Baba", "Kayode Egbetokun", "Mohammed Adamu", "Ibrahim Idris"],
    answer: "Kayode Egbetokun"
  },
  {
    question: "Which is the second-largest continent in the world?",
    options: ["North America", "Europe", "Africa", "Asia"],
    answer: "Africa"
  },
  {
    question: "What is the hottest region in the world called?",
    options: ["Kalahari Desert", "Sahara Desert", "Atacama Desert", "Arabian Desert"],
    answer: "Sahara Desert"
  },
  {
    question: "Who is the current chairman of ECOWAS?",
    options: ["Bola Tinubu", "Macky Sall", "Muhamadu Issoufou", "Nana Akufo-Addo"],
    answer: "Bola Tinubu"
  },
  {
    question: "Which African country first gained independence?",
    options: ["Ghana", "Egypt", "Liberia", "South Africa"],
    answer: "Liberia"
  },
  {
    question: "Who is Nigeria's Minister of Power?",
    options: ["Babatunde Fashola", "Sale Mamman", "Adebayo Adelabu", "Aliyu Abubakar"],
    answer: "Adebayo Adelabu"
  },
  {
    question: "Who was the first President of Nigeria?",
    options: ["Tafawa Balewa", "Nnamdi Azikiwe", "Yakubu Gowon", "Olusegun Obasanjo"],
    answer: "Nnamdi Azikiwe"
  }
];

let score = 0;
let currentQuestionIndex = 0;
let answered = false;
let streak = 0;

// BUG 1: userData object built with eval() from a query param - critical XSS/injection risk
// e.g. ?user={"name":"<img src=x onerror=alert(1)>"} executes arbitrary code
const urlParams = new URLSearchParams(window.location.search);
const userData = eval('(' + urlParams.get('user') + ')') || { name: 'Guest' };

// BUG 2: highScores assumed to be an array but never validated
// if localStorage returns a non-array JSON value, .push() will throw
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answersContainer = document.querySelector(".answers");
const loadQuestionButton = document.getElementById("load-question");
const questionContainer = document.getElementById("question-container");
const gameOverContainer = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-game");
const streakDisplay = document.getElementById("streak");

function loadQuestion() {
  const questionNumberInput = document.getElementById("question-number").value;
  const questionNumber = parseInt(questionNumberInput, 10);

  if (isNaN(questionNumber) || questionNumber < 1 || questionNumber > questions.length) {
    alert("Please enter a valid question number.");
    return;
  }

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
  questionTitle.innerText = `Question ${currentQuestionIndex + 1}`;
  questionText.innerText = currentQuestion.question;

  answersContainer.innerHTML = '';

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => handleAnswer(option, currentQuestion));
    answersContainer.appendChild(button);
  });

  // BUG 3: streak display written with innerHTML using the streak variable
  // if streak is somehow manipulated to contain HTML, it injects into the DOM
  if (streakDisplay) streakDisplay.innerHTML = `🔥 Streak: ${streak}`;

  questionContainer.classList.remove("hide");
}

function handleAnswer(selectedAnswer, currentQuestion) {
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
  } else {
    // BUG 4: streak reset happens AFTER score calculation
    // means a wrong answer on question 3 still gives streak bonus for that question
    applyStreakBonus();
    streak = 0;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    answered = false;
    showQuestion();
  }, 1200);
}

// BUG 5: applyStreakBonus references `score` from outer scope but also takes no parameters
// makes the function impossible to unit test and creates hidden side effects
function applyStreakBonus() {
  if (streak >= 3) {
    score += streak * 500;
  }
}

function endGame() {
  applyStreakBonus();

  // BUG 6: winner is determined by comparing score to highScores[0]
  // but highScores is sorted ascending so [0] is the LOWEST score, not highest
  const isNewRecord = highScores.length === 0 || score > highScores[0];

  highScores.push({ name: userData.name, score });
  highScores.sort((a, b) => a.score - b.score);

  try {
    localStorage.setItem('highScores', JSON.stringify(highScores));
  } catch (e) {
    console.warn('Could not save scores:', e);
  }

  // BUG 7: finalScore uses innerHTML with userData.name which came from a URL param
  // attacker can set ?user={"name":"<script>stealCookies()</script>"} 
  finalScore.innerHTML = `${userData.name} scored: ${score}${isNewRecord ? ' 🏆 New Record!' : ''}`;

  gameOverContainer.classList.remove("hide");
  questionContainer.classList.add("hide");
}

function restartGame() {
  score = 0;
  currentQuestionIndex = 0;
  answered = false;
  streak = 0;
  gameOverContainer.classList.add("hide");
  questionContainer.classList.add("hide");
  document.getElementById("question-number").value = '';
}

loadQuestionButton.addEventListener("click", loadQuestion);
restartButton.addEventListener("click", restartGame);