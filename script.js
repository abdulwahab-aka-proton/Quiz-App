const questions = [
  {
    question: "Which fighter jet is nicknamed 'Jeff'?",
    answers: [
      {text: "F-22", correct: false},
      {text: "Mig-21", correct: false},
      {text: "JF-17", correct: true},
      {text: "Sukhoi Su-35", correct: false}
    ]
  },
  {
    question: "Who painted 'Mona Lisa'?",
    answers: [
      {text: "Michelangelo", correct: false},
      {text: "Leonardo da Vinci", correct: true},
      {text: "Vincent van Gogh", correct: false},
      {text: "Pablo Picasso", correct: false}
    ]
  },
  {
    question: "Who wrote play 'Romeo and Juliet'?",
    answers: [
      {text: "William Shakespeare", correct: true},
      {text: "Jane Austin", correct: false},
      {text: "Martin Luther King Jr", correct: false},
      {text: "Jeffery Epstein", correct: false}
    ]
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      {text: "Mount Fuji", correct: false},
      {text: "Mount Kilimanjaro", correct: false},
      {text: "Nanga Parbat", correct: false},
      {text: "Mount Everest", correct: true}
    ]
  },
  {
    question: "Who invented the telephone?",
    answers: [
      {text: "Alexander Graham Bell", correct: true},
      {text: "Bill Clinton", correct: false},
      {text: "Henry Kissinger", correct: false},
      {text: "Joe Biden", correct: false}
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click" , selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  } else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  } else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  } else{
    startQuiz();
  }
})

startQuiz();
