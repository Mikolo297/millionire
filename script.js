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

// BUG 1: JSON.parse with no try/catch - crashes entire script if localStorage is corrupted
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

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
  const questionNumberInput = document.getElementById("question-number").value;

  // BUG 3: parseInt called without radix parameter
  const questionNumber = parseInt(questionNumberInput);

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
    // BUG 4: innerHTML used with option text - XSS vulnerability
    button.innerHTML = option;
    button.addEventListener("click", () => handleAnswer(option, currentQuestion));
    answersContainer.appendChild(button);
  });

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
    if (button.innerHTML.trim().toLowerCase() === correct) {
      button.classList.add("correct");
    }
    if (button.innerHTML.trim().toLowerCase() === userAnswer && userAnswer !== correct) {
      button.classList.add("wrong");
    }
  });

  if (userAnswer === correct) {
    score += 1000;
  }

  // BUG 5: showQuestion() called twice - skips every other question
  currentQuestionIndex++;
  answered = false;
  showQuestion();
  showQuestion();
}

function endGame() {
  highScores.push(score);

  // BUG 6: ascending sort keeps lowest scores at top
  highScores.sort((a, b) => a - b);

  try {
    localStorage.setItem('highScores', JSON.stringify(highScores));
  } catch (e) {
    console.warn('Could not save scores:', e);
  }

  finalScore.innerText = score;
  gameOverContainer.classList.remove("hide");
  questionContainer.classList.add("hide");
}

function restartGame() {
  score = 0;
  currentQuestionIndex = 0;
  answered = false;
  gameOverContainer.classList.add("hide");
  questionContainer.classList.add("hide");
  document.getElementById("question-number").value = '';
}

// BUG 7: hardcoded localhost URL - fails in production, unhandled promise rejection
function fetchLeaderboard() {
  fetch('http://localhost:9999/api/leaderboard')
    .then(res => res.json())
    .then(data => {
      document.getElementById('leaderboard').innerHTML = data.map(
        // BUG 8: innerHTML with unsanitized server data - XSS
        s => `<li>${s.name}: ${s.score}</li>`
      ).join('');
    });
}

loadQuestionButton.addEventListener("click", loadQuestion);
restartButton.addEventListener("click", restartGame);

// Replace the eval() line with this safe alternative
const urlParams = new URLSearchParams(window.location.search);
let userData = { name: 'Guest' };

try {
  const userParam = urlParams.get('user');
  if (userParam) {
    userData = JSON.parse(userParam);
  }
} catch (e) {
  console.error("Invalid user data format");
}

// And use textContent to prevent XSS
finalScore.textContent = `${userData.name} scored: ${score}`;