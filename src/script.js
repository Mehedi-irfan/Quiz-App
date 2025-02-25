const optionContainer = document.getElementById("option-container");
const nextBtn = document.getElementById("nextBtn");
let quizCategory = "programming";

const getRandomQuestion = () => {
  const randomCategory =
    questions.find((cat) => {
      return cat.category.toLowerCase() === quizCategory.toLowerCase();
    }).questions || [];
  const randomQuestion =
    randomCategory[Math.floor(Math.random() * randomCategory.length)];
  return randomQuestion;
};

const renderQuestion = () => {
  const currentQuestion = getRandomQuestion();
  if (!currentQuestion) return;
  optionContainer.innerHTML = "";
  document.getElementById("question").textContent = currentQuestion.question;
  currentQuestion.options.forEach((option) => {
    const li = document.createElement("li");
    li.classList.add("btn");
    li.textContent = option;
    optionContainer.appendChild(li);
  });
};

renderQuestion();
nextBtn.addEventListener("click", renderQuestion);
