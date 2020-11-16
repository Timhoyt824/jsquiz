var questions = [
    {
        title: "Which San Diego brewery makes Space ways IPA?",
        choices: ["Alesmith", "Pizza Port", "Modern Times", "Mikkeller"],
        answer: "Modern Times"
    },
    {
        title: "Which San Diego brewery took Alesmith's original brewery after they relocated?",
        choices: ["Pure Project", "Eppig", "Mikkeller", "Second Chance"],
        answer: "Mikkeller"
    },
    {
        title: "Which San Diego brewery has more GABF (Great American Beer Fesival) medals than anyone else in San Diego?",
        choices: ["Karl Strauss", "Stone", "Alesmith", "Pizza Port"],
        answer: "Pizza Port"
    },
    {
        title: "Which San Diego brewery was sold in 2015 for 1 billon dollars and later resold in 2019 for under 100 million dollars?",
        choices: ["Stone", "Green Flash", "Ballast Point", "Alpine"],
        answer: "Ballast Point"
    },
    {
        title: "San Diego is best known for what style of beer?",
        choices: ["Mexican Lager", "Stout", "Pale Ale", "IPA"],
        answer: "IPA"
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

// start timer
timer.addEventListener("click", function () {
    if (timeZero === 0) {
        timeZero = setInterval(function () {
            timeLeft--;
            time.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timeZero);
                complete();
                time.textContent = "Time's up!";
            }
        }, 1000);
    }
    exhibit(quizQuestionIndex);
});

// questions appear 
function exhibit(questionIndex) {
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
            // -5 seconds wrong answers
            timeLeft = timeLeft - minusTime;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[quizQuestionIndex].answer;
        }

    }
    // index what question user is on
    quizQuestionIndex++;

    if (quizQuestionIndex >= questions.length) {
        // All done will append last page with user stats
        complete();
        createDiv.textContent = "You got  " + score + "/" + questions.length + " correct!";
    } else {
        exhibit(quizQuestionIndex);
    }
    questionsArea.appendChild(createDiv);

}
// append last page
function complete() {
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
           
            window.location.replace("./highScores.html");
        }
    });

}
