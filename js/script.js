function placement(pos) {
    if (!pos.classList.contains("rond") && !pos.classList.contains("croix")) {
        if (tour == "rond") {
            pos.classList.add("rond");
            tour = "croix";
            player1Title.classList.remove("tour");
            player2Title.classList.add("tour");
        } else {
            pos.classList.add("croix");
            tour = "rond";
            player1Title.classList.add("tour");
            player2Title.classList.remove("tour");
        }
    }
}

function removeCases() {
    cases.forEach(pos => {
        pos.classList.remove("rond");
        pos.classList.remove("croix");
        pos.classList.remove("win");
    })
}

function winCases() {
    let gagnant;
    let casesWin;

    for (let i = 0; i<3; i++) {
        if (cases[3*i].classList.contains("rond") && 
        cases[3*i+1].classList.contains("rond") && 
        cases[3*i+2].classList.contains("rond")) {
            gagnant = "Joueur 1";
            casesWin = [3*i, 3*i+1, 3*i+2];
        } else if (
            cases[3*i].classList.contains("croix") && 
            cases[3*i+1].classList.contains("croix") && 
            cases[3*i+2].classList.contains("croix")) {
            gagnant = "Joueur 2";
            casesWin = [3*i, 3*i+1, 3*i+2];
        } else if (
            cases[i].classList.contains("rond") && 
            cases[i+3].classList.contains("rond") && 
            cases[i+6].classList.contains("rond")) {
            gagnant = "Joueur 1";
            casesWin = [i, i+3, i+6];
        } else if (
            cases[i].classList.contains("croix") && 
            cases[i+3].classList.contains("croix") && 
            cases[i+6].classList.contains("croix")) {
            gagnant = "Joueur 2";
            casesWin = [i, i+3, i+6];
        }
    }
    if (
        cases[0].classList.contains("rond") &&
        cases[4].classList.contains("rond") &&
        cases[8].classList.contains("rond") ) {
        gagnant = "Joueur 1"; 
        casesWin = [0, 4, 8];
    } else if (

        cases[2].classList.contains("rond") &&
        cases[4].classList.contains("rond") &&
        cases[6].classList.contains("rond")) {
        gagnant = "Joueur 1";
        casesWin = [2, 4, 6];
    } else if (
        cases[0].classList.contains("croix") &&
        cases[4].classList.contains("croix") &&
        cases[8].classList.contains("croix") ) {
        gagnant = "Joueur 2";
        casesWin = [0, 4, 8];
    } else if (
        cases[2].classList.contains("croix") &&
        cases[4].classList.contains("croix") &&
        cases[6].classList.contains("croix")) {
        gagnant = "Joueur 2";
        casesWin = [2, 4, 6];
    }

    return {gagnant, casesWin};
}

function winVisual(casesWin) {
    casesWin.forEach(pos => {
        cases[pos].classList.add("win");
    })
    reset.classList.add("reset-available");
    reset.style.cursor = 'pointer';
}

function resetGame() {
    reset.onclick = () => {
        removeCases();
        player1Title.classList.add("tour");
        player2Title.classList.remove("tour"); 
        tour = "rond";
        gagnant = null;
        casesWin = null;

        controller = new AbortController();
        cases.forEach(pos =>  {
            pos.addEventListener("click", e => {
                placement(pos);
                win();
            
            }, {signal:controller.signal})
        })

        reset.classList.remove("reset-available");
        reset.style.cursor = 'not-allowed';
        reset.onclick = null;
    }
}

function addScore(gagnant) {
    if (gagnant == "Joueur 1") {
        player1Score.innerText = parseInt(player1Score.innerText) + 1;
    } else {
        player2Score.innerText = parseInt(player2Score.innerText) + 1;
    }
}

function win() {
    let gagnant;
    let casesWin;

    gagnant = winCases().gagnant;
    casesWin = winCases().casesWin;

    if (gagnant) {
        addScore(gagnant);
        winVisual(casesWin);
        controller.abort();
        resetGame();
    }

}

const player1Title = document.querySelector("#player1");
const player2Title = document.querySelector("#player2");
const player1Score = document.querySelector("#player1-score");  
const player2Score = document.querySelector("#player2-score");
const cases = document.querySelectorAll(".case");
const winAnim = document.querySelector(".win");
const reset = document.querySelector("#reset");


let controller = new AbortController();
let tour = "rond";

cases.forEach(pos =>  {

    pos.addEventListener("click", e => {
        placement(pos);
        win();
    
    }, {signal:controller.signal})
})

