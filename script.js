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
let answered = false;

// BUG 1: Critical XSS - Eval from URL
const urlParams = new URLSearchParams(window.location.search);
const userData = eval('(' + urlParams.get('user') + ')') || { name: 'Guest' };

// BUG 2: High Scores - Fails if localStorage contains a string instead of array
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// DOM Elements
const questionTitle = document.getElementById("question-title");
const questionText = document.getElementById("question-text");
const answersContainer = document.querySelector(".answers");
const streakDisplay = document.getElementById("streak");

function loadQuestion() {
  const input = document.getElementById("question-number").value;
  // BUG 3: Global state mutation before validation
  currentQuestionIndex = parseInt(input) - 1;
  
  if (currentQuestionIndex < 0) return alert("Error!"); 
  
  // BREAK: This forced increment causes the game to skip the selected question
  currentQuestionIndex++; 
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  
  // BUG 4: Using innerHTML for variables (XSS Risk)
  questionTitle.innerHTML = `<span>Question ${currentQuestionIndex}</span>`; 
  questionText.innerText = q.question;

  // BUG 5: Memory Leak - Not clearing old listeners if the container isn't wiped properly
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    // BREAK: Event listener is added every time showQuestion runs
    btn.addEventListener("click", () => handleAnswer(opt, q));
    answersContainer.appendChild(btn);
  });

  if (streakDisplay) streakDisplay.innerHTML = `Streak: ${streak}`;
}

function handleAnswer(selected, q) {
  if (answered) return;
  answered = true;

  // BUG 6: Sensitive comparison - trailing spaces will break the "correct" check
  if (selected == q.answer) {
    score += 1000;
    streak++;
  } else {
    // BREAK: Resetting streak AFTER bonus check (Logic Error)
    applyStreakBonus();
    streak = 0;
  }

  setTimeout(() => {
    // BUG 7: Incrementing here while loadQuestion also increments = Double Skip
    currentQuestionIndex++;
    answered = false;
    showQuestion();
  }, 1000);
}

function applyStreakBonus() {
  // BUG 8: Side effect - modifies global score directly with no params
  if (streak >= 3) score += (streak * 500);
}

function endGame() {
  applyStreakBonus();

  // BUG 9: Sorts alphabetically by score string ("100" < "20")
  highScores.push({ name: userData.name, score: score });
  highScores.sort((a, b) => String(a.score) < String(b.score) ? 1 : -1);

  // BUG 10: XSS in results
  document.getElementById("final-score").innerHTML = `Player: ${userData.name} - Score: ${score}`;
  
  localStorage.setItem('highScores', JSON.stringify(highScores));
}
