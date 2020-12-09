const button = document.querySelector("#new-question");
const loader = document.querySelector("#loader");
const container = document.querySelector("#question-container");
const questionText = document.querySelector("#question");
const category = document.querySelector("#category");
const difficulty = document.querySelector("#difficulty");
const answersElement = document.querySelector("#answers");

// Fetch trivia question from api
async function getQuestion() {
    const response = await fetch("https://opentdb.com/api.php?amount=1")
    const data = await response.json();
    return (data.results[0]);
}

// Display question on page
async function displayQuestion() {
    toggleLoader();
    const question = await getQuestion();
    toggleLoader();

    category.innerText = `Category: ${question.category}`;
    difficulty.innerText = `Difficulty: ${question.difficulty}`;
    // Use innerHTML instead of innerText, some questions contain HTML entities
    questionText.innerHTML = question.question;
    correctAnswer = question.correct_answer;

    const answers = [question.correct_answer, ...question.incorrect_answers];
    const shuffledAnswers = shuffleArray(answers);

    // Clear answers
    answersElement.innerHTML = "";

    // Create p element for each answer in array
    for(let answer of shuffledAnswers) {
        const p = document.createElement("p");
        p.classList.add("answer")
        p.innerHTML = answer;
        answersElement.appendChild(p);
    }

    // Assing event listener to each answer and check if answer was correct
    document.querySelectorAll(".answer").forEach(item => {
        item.addEventListener("click", event => {
            if(event.target.innerHTML === decodeHTML(question.correct_answer)) {
                event.target.classList.add("correct");
            } else {
                event.target.classList.add("wrong");
            }
        })
    })
}

// Toggle visibility between loader and container
function toggleLoader() {
    loader.hidden = !loader.hidden;
    container.hidden = !container.hidden
}

// Decode all HTML entities into text. Questions sometimes contain HTML entities, assign it to HTML element, convert it into text
function decodeHTML(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// Shuffle array
function shuffleArray(arr) {
    return arr.sort(()=> Math.random()-0.5);
}

// Fetch new question when button is pressed
button.addEventListener("click", displayQuestion);

// Fetch question on page load
displayQuestion();