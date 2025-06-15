
let currentQuestion = 0;
let lives = 3;
let score = 0;

const questionDiv = document.getElementById("question");
const answerInput = document.getElementById("answer");
const livesDiv = document.getElementById("lives");
const scoreDiv = document.getElementById("score");
const confettiCanvas = document.getElementById("confetti");

function showQuestion() {
  questionDiv.innerText = questions[currentQuestion].question;
  answerInput.value = "";
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  if (userAnswer === questions[currentQuestion].answer.toLowerCase()) {
    score++;
    scoreDiv.innerText = "Skor: " + score;
    showConfetti();
    setTimeout(() => {
      hideConfetti();
      nextQuestion();
    }, 3000);
  } else {
    lives--;
    livesDiv.innerText = "❤️".repeat(lives);
    if (lives === 0) {
      alert("Game Over!");
      restartGame();
    }
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    alert("Kamu telah menyelesaikan semua soal!");
    restartGame();
  } else {
    showQuestion();
  }
}

function restartGame() {
  currentQuestion = 0;
  lives = 3;
  score = 0;
  livesDiv.innerText = "❤️❤️❤️";
  scoreDiv.innerText = "Skor: 0";
  showQuestion();
}

function showConfetti() {
  confettiCanvas.style.display = "block";
  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(Math.random() * confettiCanvas.width, Math.random() * confettiCanvas.height, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function hideConfetti() {
  confettiCanvas.style.transition = "opacity 1s ease-out";
  confettiCanvas.style.opacity = "0";
  setTimeout(() => {
    confettiCanvas.style.display = "none";
    confettiCanvas.style.opacity = "1";
  }, 1000);
}

window.onload = showQuestion;
