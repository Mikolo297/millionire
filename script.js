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

// BUG 1: High scores loaded with no error handling - crashes if data is corrupted
const savedScores = JSON.parse(localStorage.getItem('highScores'));
let highScores = savedScores || [];

// BUG 2: No validation that savedScores is actually an array
// if someone manually sets localStorage to a string, highScores.push() will fail

const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answersContainer = document.querySelector(".answers");
const loadQuestionButton = document.getElementById("load-question");
const questionContainer = document.getElementById("question-container");
const gameOverContainer = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const restartButton = document.getElementById("restart-game");

// BUG 3: No null checks on DOM elements - if any ID is wrong the whole script crashes silently
// e.g. if HTML uses "game_over" instead of "game-over", gameOverContainer is null

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
    // BUG 4: innerHTML used instead of textContent - XSS if option text ever contains HTML
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
    // BUG 5: score is never validated as a number before arithmetic
    // if score somehow becomes NaN, += 1000 makes it stay NaN silently
    score += 1000;
  }

  // BUG 6: no setTimeout delay before moving to next question
  // user cannot see the correct/wrong highlight before the next question loads
  currentQuestionIndex++;
  answered = false;
  showQuestion();
}

function endGame() {
  // BUG 7: highScores.push called but array is never deduplicated
  // playing multiple times pushes the same score repeatedly with no limit
  highScores.push(score);

  // BUG 8: highScores sorted incorrectly - ascending instead of descending
  // so the lowest score shows at the top, not the highest
  highScores.sort((a, b) => a - b);

  // BUG 9: no cap on highScores array size - grows forever in localStorage
  try {
    localStorage.setItem('highScores', JSON.stringify(highScores));
  } catch (e) {
    console.warn('Could not save scores:', e);
  }

  // BUG 10: finalScore shows raw number with no formatting
  // score of 7000 shows as "7000" not "$7,000" - inconsistent with the game theme
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

  // BUG 11: score cleared in memory but localStorage still has the old score
  // next time the page loads, the old high score list is shown including the current run
}

loadQuestionButton.addEventListener("click", loadQuestion);
restartButton.addEventListener("click", restartGame);