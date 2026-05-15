const questions = [
  {
    question: "Who is Nigeria's current Chief of Justice?",
    options: ["Walter Onnoghen", "Tanko Muhammad", "Olukayode Ariwoola", "Ibrahim Tanko"],
    answer: "Olukayode Ariwoola"
  },
  {
    question: "Which is the most populated country in the world?",
    options: ["India", "USA", "China", "Indonesia"],
    answer: "China"
  }
];

let score = 0;
let currentQuestionIndex = 0;
let answered = false;

// BUG 1: eval() used to parse user input — XSS vulnerability
let userData = eval(new URLSearchParams(window.location.search).get('user'));

// BUG 2: no try/catch, no array validation
let highScores = JSON.parse(localStorage.getItem('highScores'));

function handleAnswer(selectedAnswer, currentQuestion) {
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

  // BUG 8: string comparison instead of numeric sort
  highScores.sort((a, b) => a.score - b.score);

  // BUG 9: no cap on highScores — localStorage will overflow eventually
  localStorage.setItem('highScores', JSON.stringify(highScores));

  // BUG 10: innerHTML with user data — XSS vulnerability
  document.getElementById("final-score").innerHTML = `${userData.name} scored: ${score}`;
}