var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];

var score = 0;
var quizQuestionIndex = 0;


var time = document.querySelector(".timer-area");
var timer = document.querySelector(".start-btn");
var questionsArea = document.querySelector(".card-text");
var cardBody = document.querySelector(".card-body");


var timeLeft = 60;

var timeZero = 0;

var minusTime = 5;

var newQuestionElement = document.createElement("div");

// starts timer
timer.addEventListener("click", function () {
    if (timeZero === 0) {
        timeZero = setInterval(function () {
            timeLeft--;
            time.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timeZero);
                allDone();
                time.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(quizQuestionIndex);
});

// questions appear 
function render(questionIndex) {
    // clear data
    questionsArea.innerHTML = "";
    newQuestionElement.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsArea.textContent = userQuestion;
    }
    // new for each question 
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("button");
        listItem.textContent = newItem;
        questionsArea.appendChild(newQuestionElement);
        newQuestionElement.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// compare user choice with answer
function compare(event) {
    var element = event.target;

    if (element.matches("button")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
         
        if (element.textContent == questions[quizQuestionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!";
        
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            timeLeft = timeLeft - minusTime;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[quizQuestionIndex].answer;
        }

    }
    // index what question user is on
    quizQuestionIndex++;

    if (quizQuestionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "You got  " + score + "/" + questions.length + " correct!";
    } else {
        render(quizQuestionIndex);
    }
    questionsArea.appendChild(createDiv);

}
// append last page
function allDone() {
    questionsArea.innerHTML = "";
    time.innerHTML = "";

    // Heading:
    var h1El = document.createElement("h1");
    h1El.setAttribute("id", "createH1");
    h1El.textContent = "All Done!"

    questionsArea.appendChild(h1El);

    // Paragraph
    var paraEl = document.createElement("p");
    paraEl.setAttribute("id", "createP");

    questionsArea.appendChild(paraEl);

    // Replace timer with score 
    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(timeZero);
        paraEl.textContent = "Final score is: " + timeRemaining;

        questionsArea.appendChild(createP2);
    }

    
    var labelEl = document.createElement("label");
    labelEl.setAttribute("id", "createLabel");
    labelEl.textContent = "Enter your initials: ";

    questionsArea.appendChild(labelEl);


    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "initials");
    inputEl.textContent = "";

    questionsArea.appendChild(inputEl);

    
    var submitEl = document.createElement("button");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("id", "Submit");
    submitEl.textContent = "Submit";

    questionsArea.appendChild(submitEl);

    // eventListener and local storage
    submitEl.addEventListener("click", function () {
        var initials = inputEl.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
           
            window.location.replace("./HighScores.html");
        }
    });

}
