const optionContainer = document.getElementById("option-container");
const nextBtn = document.getElementById("nextBtn");
const questionIndex = document.getElementById("question_index");
const timeDuration = document.querySelector(".time-duration");
const resultContainer = document.getElementById("result-container");
const quizContainer = document.getElementById("quiz-container");
const configContainer = document.getElementById("config-container");
const categoryOption = document.getElementById("category-options");
const questionsQuestion = document.getElementById("question-questions");

const QUIZ_TIME = 10;
let currentTime = QUIZ_TIME;
let timer = null;
let quizCategory = "programming";
let questionNumber = 5;
let currentQuestion = null;
const questionHistoryIndex = [];
let countCorrectAnswer = 0;

const showQuizResult = () => {
  resultContainer.classList.remove("hidden");
  resultContainer.classList.add("flex");
  quizContainer.classList.add("hidden");

  const correctAnswer = ` You Answer ${countCorrectAnswer} out of ${questionNumber} questions correctly, great offer`;
  document.getElementById("showing-result").innerHTML = correctAnswer;
};

const resetTime = () => {
  clearInterval(timer);
  currentTime = QUIZ_TIME;
  timeDuration.textContent = `${currentTime}s`;
};

const startTime = () => {
  timer = setInterval(() => {
    currentTime--;
    timeDuration.textContent = `${currentTime}s`;
    if (currentTime <= 0) {
      clearInterval(timer);
      highLightCorrectAnswer();

      optionContainer.querySelectorAll(".answer-option").forEach((option) => {
        option.classList.add("pointer-events-none");
        option.classList.add("cursor-no-drop");
      });
      nextBtn.classList.remove("hidden");
      nextBtn.classList.add("flex");
    }
  }, 1000);
};

const getRandomQuestion = () => {
  const randomCategory =
    questions.find((cat) => {
      return cat.category.toLowerCase() === quizCategory.toLowerCase();
    }).questions || [];
  console.log(randomCategory);
  if (
    questionHistoryIndex.length >=
    Math.min(randomCategory.length, questionNumber)
  ) {
    return showQuizResult();
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
  clearInterval(timer);
  // console.log(option);
  const isCorrect = currentQuestion.correctAnswer === answerIndex;
  option.classList.add(isCorrect ? "correct" : "incorrect");

  !isCorrect ? highLightCorrectAnswer() : countCorrectAnswer++;

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
  resetTime();
  startTime();
};

const startQuiz = () => {
  configContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  quizCategory = configContainer.querySelector(
    ".category-option.active"
  ).textContent;
  console.log(quizCategory);
  // questionNumber = parseInt(
  //   configContainer.querySelector(".question-question.active").textContent
  // );

  renderQuestion();
};

document
  .querySelectorAll(".category-option, .question-question")
  .forEach((option) => {
    option.addEventListener("click", () => {
      option.parentNode.querySelector(".active").classList.remove("active");
      option.classList.add("active");
    });
  });

const resetQuiz = () => {
  resetTime();
  countCorrectAnswer = 0;
  questionHistoryIndex.length = 0;
  resultContainer.classList.remove("flex");
  resultContainer.classList.add("hidden");
  configContainer.classList.remove("hidden");
  configContainer.classList.add("flex");
};

renderQuestion();
nextBtn.addEventListener("click", renderQuestion);
document.getElementById("try-again").addEventListener("click", resetQuiz);
document.getElementById("start-quiz-btn").addEventListener("click", startQuiz);
