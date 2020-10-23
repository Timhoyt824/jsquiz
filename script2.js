var scoreArea = document.querySelector(".card-text");
var clear = document.querySelector(".clear");
var startOver = document.querySelector(".start-over");

// eventListener to clear storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// gets local storage
var scores = localStorage.getItem("allScores");
scores = JSON.parse(scores);

if (scores !== null) {

    for (var i = 0; i < scores.length; i++) {

        var userInitial = document.createElement("p");
        userInitial.textContent = scores[i].initials + " " + scores[i].score;
        scoreArea.appendChild(userInitial);

    }
}
// Event listener to move to index page
startOver.addEventListener("click", function () {
    window.location.replace("./index.html");
});