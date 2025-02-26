const optionContainer = document.getElementById("option-container");
const nextBtn = document.getElementById("nextBtn");
const questionIndex = document.getElementById("question_index");

let quizCategory = "programming";
let questionNumber = 10;
let currentQuestion = null;
const questionHistoryIndex = [];

const getRandomQuestion = () => {
  const randomCategory =
    questions.find((cat) => {
      return cat.category.toLowerCase() === quizCategory.toLowerCase();
    }).questions || [];

  if (
    questionHistoryIndex.length >=
    Math.min(randomCategory.length, questionNumber)
  ) {
    return console.log("quiz Complete");
  }

  const availableIndex = randomCategory.filter((_, index) => {
    return !questionHistoryIndex.includes(index);
  });

  const randomQuestion =
    availableIndex[Math.floor(Math.random() * randomCategory.length)];
  questionHistoryIndex.push(randomCategory.indexOf(randomQuestion));
  return randomQuestion;
};

const highLightCorrectAnswer = () => {
  const highLightColor =
    optionContainer.querySelectorAll(".answer-option")[
      currentQuestion.correctAnswer
    ];
  highLightColor.classList.add("correct");
  const iconHtml = `<span><i class="ri-checkbox-circle-line"></i></span>`;
  highLightColor.insertAdjacentHTML("beforeend", iconHtml);
};

const handleAnswer = (option, answerIndex) => {
  // console.log(option);
  const isCorrect = currentQuestion.correctAnswer === answerIndex;
  option.classList.add(isCorrect ? "correct" : "incorrect");

  !isCorrect ? highLightCorrectAnswer() : "";

  const iconHtml = `<span>${
    isCorrect
      ? '<i class="ri-checkbox-circle-line"></i>'
      : '<i class="ri-close-circle-line"></i>'
  }</span>`;
  option.insertAdjacentHTML("beforeend", iconHtml);

  optionContainer.querySelectorAll(".answer-option").forEach((option) => {
    option.classList.add("pointer-events-none");
    option.classList.add("cursor-no-drop");
  });
  nextBtn.classList.remove("hidden");
  nextBtn.classList.add("flex");
};

const renderQuestion = () => {
  currentQuestion = getRandomQuestion();
  // console.log(currentQuestion);
  if (!currentQuestion) return;
  optionContainer.innerHTML = "";
  nextBtn.classList.add("hidden");
  document.getElementById("question").textContent = currentQuestion.question;
  questionIndex.innerHTML = ` <span class="font-semibold">${questionHistoryIndex.length}</span> of
            <span class="font-semibold">${questionNumber}</span> question`;
  currentQuestion.options.forEach((option, index) => {
    // console.log(index);
    const li = document.createElement("li");
    li.classList.add("btn");
    li.classList.add("answer-option");
    li.textContent = option;
    optionContainer.appendChild(li);
    li.addEventListener("click", () => handleAnswer(li, index));
  });
};

renderQuestion();
nextBtn.addEventListener("click", renderQuestion);
