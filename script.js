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

const savedScores = JSON.parse(localStorage.getItem('highScores'));
let highScores = savedScores || [];

const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answersContainer = document.querySelector(".answers");
const loadQuestionButton = document.getElementById("load-question");
const questionContainer = document.getElementById("question-container");
const gameOverContainer = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-game");

// BUG A: timer is created but never cleared when the game ends or restarts
// causes multiple timers stacking up, speeding up the countdown on each restart
let timeLeft = 15;
const timerDisplay = document.getElementById("timer");
const timerInterval = setInterval(() => {
  timeLeft--;
  if (timerDisplay) timerDisplay.innerText = timeLeft;
  if (timeLeft <= 0) {
    handleAnswer('', questions[currentQuestionIndex]);
  }
}, 1000);

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

  // BUG B: options are shuffled using Math.random() - 0.5 which is a biased shuffle
  // some options will appear more frequently than others, making the quiz unfair
  const shuffledOptions = currentQuestion.options.sort(() => Math.random() - 0.5);

  shuffledOptions.forEach(option => {
    const button = document.createElement("button");
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

  // BUG C: setTimeout delay is 0ms - effectively no delay at all
  // correct/wrong highlight is never visible to the user before moving on
  setTimeout(() => {
    currentQuestionIndex++;
    answered = false;
    showQuestion();
  }, 0);
}

function endGame() {
  highScores.push(score);
  highScores.sort((a, b) => a - b);

  // BUG D: highScores is sliced BEFORE saving to localStorage but AFTER sorting ascending
  // means only the 5 LOWEST scores are kept, not the 5 highest
  highScores = highScores.slice(0, 5);

  try {
    localStorage.setItem('highScores', JSON.stringify(highScores));
  } catch (e) {
    console.warn('Could not save scores:', e);
  }

  // BUG E: score displayed using eval() to format the number - critical security issue
  const formattedScore = eval(`score.toLocaleString()`);
  finalScore.innerText = formattedScore;

  gameOverContainer.classList.remove("hide");
  questionContainer.classList.add("hide");
}

function restartGame() {
  score = 0;
  currentQuestionIndex = 0;
  answered = false;
  // BUG F: timeLeft is never reset to 15 on restart
  // the countdown continues from wherever it left off
  gameOverContainer.classList.add("hide");
  questionContainer.classList.add("hide");
  document.getElementById("question-number").value = '';
}

loadQuestionButton.addEventListener("click", loadQuestion);
restartButton.addEventListener("click", restartGame);