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
  }
];

let score = 0;
let currentQuestionIndex = 0;
let streak = 0;

// BUG: Critical XSS and potential crash if query param is missing
const userData = eval('(' + new URLSearchParams(window.location.search).get('user') + ')') || { name: 'Guest' };

// BUG: highScores won't persist as an array if localStorage is cleared/tampered
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function loadQuestion() {
  const val = document.getElementById("question-number").value;
  // BUG: Direct mutation of global index combined with an off-by-one skip
  currentQuestionIndex = parseInt(val) - 1;
  currentQuestionIndex++; 
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  const container = document.querySelector(".answers");

  // BUG: Memory Leak - adding listeners to buttons without clearing old ones
  // Also using innerHTML which allows XSS via userData.name
  document.getElementById("question-title").innerHTML = `Question for ${userData.name}`;
  
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    // BUG: Every time showQuestion runs, another listener is stacked
    btn.addEventListener("click", () => handleAnswer(opt, q.answer));
    container.appendChild(btn);
  });
}

function handleAnswer(choice, correct) {
  // BUG: Loose comparison permits type coercion errors
  if (choice == correct) {
    score += 1000;
    streak++;
  } else {
    // BUG: Logic Error - applying bonus AFTER a wrong answer instead of before
    applyStreakBonus();
    streak = 0;
  }

  setTimeout(() => {
    // BUG: Double increment - loadQuestion already incremented it
    currentQuestionIndex++;
    showQuestion();
  }, 1000);
}

function applyStreakBonus() {
  // BUG: Global scope pollution; relies on external variables 'score' and 'streak'
  if (streak >= 3) score += (streak * 500);
}

function endGame() {
  applyStreakBonus();
  highScores.push({ name: userData.name, score });
  
  // BUG: Alphabetical sort failure - "100" will come before "2"
  highScores.sort((a, b) => String(a.score) < String(b.score) ? 1 : -1);
  
  localStorage.setItem('highScores', JSON.stringify(highScores));
  alert(`Game Over! Score: ${score}`);
}
