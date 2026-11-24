let names = [];
let votes = [];
let classSize = 0;
let votesCast = 0;
let round = 1;

function addCandidate() {
    let input = document.getElementById("candName");
    let name = input.value.trim();

    if (name === "") {
        alert("Please enter a candidate name.");
        return;
    }

    names.push(name);
    votes.push(0);
    input.value = "";

    let list = document.getElementById("candList");
    list.innerHTML = "";
    for (let i = 0; i < names.length; i++) {
        list.innerHTML += "<li>" + names[i] + "</li>";
    }
}

function startVoting() {
    classSize = parseInt(document.getElementById("classSize").value);

    if (isNaN(classSize) || classSize < 2 || names.length < 2) {
        alert("Enter a class size (at least 2) and add at least 2 candidates.");
        return;
    }

    document.getElementById("setupSection").style.display = "none";
    document.getElementById("votingSection").style.display = "block";

    setupRound();
}

function setupRound() {
    votesCast = 0;
    document.getElementById("roundText").innerText = "Round " + round;
    document.getElementById("voteText").innerText = "Votes cast: " + votesCast;

    let btnDiv = document.getElementById("voteButtons");
    btnDiv.innerHTML = "";
    for (let i = 0; i < names.length; i++) {
        btnDiv.innerHTML += "<button onclick='vote(" + i + ")'>Vote for " + names[i] + "</button><br>";
    }
}

function vote(index) {
    votes[index] = votes[index] + 1;
    votesCast = votesCast + 1;
    document.getElementById("voteText").innerText = "Votes cast: " + votesCast;

    if (votesCast === classSize) {
        alert("All students have voted!");
        countVotes();
    }
}

function countVotes() {
    let highest = 0;
    for (let i = 0; i < votes.length; i++) {
        if (votes[i] > highest) {
            highest = votes[i];
        }
    }

    let tiedNames = [];
    for (let i = 0; i < names.length; i++) {
        if (votes[i] === highest) {
            tiedNames.push(names[i]);
        }
    }

    if (tiedNames.length > 1) {
        alert("Tie detected! Starting Round " + (round + 1));
        round = round + 1;
        names = tiedNames;
        votes = [];
        for (let i = 0; i < names.length; i++) {
            votes.push(0);
        }
        setupRound();
        return;
    }

    document.getElementById("votingSection").style.display = "none";
    document.getElementById("winnerSection").style.display = "block";
    document.getElementById("winnerName").innerText = tiedNames[0];

    let results = document.getElementById("resultsList");
    results.innerHTML = "";
    for (let i = 0; i < names.length; i++) {
        results.innerHTML += "<li>" + names[i] + ": " + votes[i] + " votes</li>";
    }
}

function newElection() {
    names = [];
    votes = [];
    classSize = 0;
    votesCast = 0;
    round = 1;

    document.getElementById("classSize").value = "";
    document.getElementById("candName").value = "";
    document.getElementById("candList").innerHTML = "";

    document.getElementById("winnerSection").style.display = "none";
    document.getElementById("setupSection").style.display = "block";
}