const optionContainer = document.getElementById("option-container");
const nextBtn = document.getElementById("nextBtn");

let quizCategory = "programming";
let currentQuestion = null;

const getRandomQuestion = () => {
  const randomCategory =
    questions.find((cat) => {
      return cat.category.toLowerCase() === quizCategory.toLowerCase();
    }).questions || [];
  const randomQuestion =
    randomCategory[Math.floor(Math.random() * randomCategory.length)];
  return randomQuestion;
};

const handleAnswer = (option, answerIndex) => {
  const isCorrect = currentQuestion.correctAnswer === answerIndex;
  option.classList.add(isCorrect ? "correct" : "incorrect");

  document
    .getElementById("option-container")
    .forEach((option) => (option.style.pointerEvents = "none"));
};

const renderQuestion = () => {
  currentQuestion = getRandomQuestion();
  console.log(currentQuestion);
  if (!currentQuestion) return;
  optionContainer.innerHTML = "";
  document.getElementById("question").textContent = currentQuestion.question;
  currentQuestion.options.forEach((option, index) => {
    console.log(index);
    const li = document.createElement("li");
    li.classList.add("btn");
    li.textContent = option;
    optionContainer.appendChild(li);
    li.addEventListener("click", () => handleAnswer(li, index));
  });
};

renderQuestion();
nextBtn.addEventListener("click", renderQuestion);
