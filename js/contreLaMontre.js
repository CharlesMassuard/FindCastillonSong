let reponse = document.getElementById('reponse');
let validateButton = document.getElementById('valider');
let playButton = document.getElementById('suivant');
let body = document.querySelector('body');
let score = document.getElementById('score');
let titreReponse = document.getElementById('titreReponse');
let temps = document.getElementById('temps');

let buttonPause = document.getElementById('pause');

let ListMusiques = ["Amour Plastique", "C'est Drôle", "Alabama", "808", "Doliprane", "En nuit", "Enfance 80", "Euphories", "Gabrielle", "Impala", "Je t'aime", "Mai", "Novembre", "Partir", "Petit monde", "Petite Fille", "Polaroids", "PRD", "Promis", "Rêve", "Roi", "Sensations", "SMS", "Souvenirs", "Suricate", "Trois jours", "What Are You So Afraid Of"];

let nbrMusiquesEcoutees = 0;
let indexMusiqueEnCours = -1;
let musiqueEnCours = new Audio();
let valeurScore = 0;
let pause = false;
let enAttente = false;
let tpsEcoule = 0;
let valider = false;

function jouerMusique() {
    if(nbrMusiquesEcoutees === ListMusiques.length){
        alert("Partie terminée ! \nScore : "+valeurScore+"/"+nbrMusiquesEcoutees);
        nbrMusiquesEcoutees = 0;
        valeurScore = 0;
        score.innerHTML = "Score : "+valeurScore+"/"+nbrMusiquesEcoutees;
        validateButton.innerHTML = "Lancer la partie";
        buttonPause.style.display = "none";
        musiqueEnCours.pause();
        return;
    }
    valider = false;
    let nbrAleatoire;
    do{
        nbrAleatoire = Math.floor(Math.random() * ListMusiques.length);
    } while (nbrAleatoire === indexMusiqueEnCours);
    indexMusiqueEnCours = nbrAleatoire;
    musiqueEnCours.pause();
    nbrMusiquesEcoutees++;
    tpsEcoule = 0;
    temps.innerHTML = "8s";
    musiqueEnCours = new Audio(`../musiques/${ListMusiques[nbrAleatoire]}.mp3`);
    musiqueEnCours.volume = 0.1;
    musiqueEnCours.play();
    timer = setInterval(() => {
        if(pause){
            return;
        }
        tpsEcoule++;
        temps.style.color = "white";
        temps.innerHTML = `${8-tpsEcoule}s`;
        if(temps.innerHTML === "3s"){
            temps.style.color = "red";
        }
        console.log(tpsEcoule);
        if(tpsEcoule === 8){
            validateButton.click();
            clearInterval(timer);
        }
    }, 1000);
}

reponse.addEventListener('keyup', (e) => {
    if (e.key === "Enter" && !valider) {
        validateButton.click();
    }
});

validateButton.addEventListener('click', () => {
    if(validateButton.innerHTML === "Lancer la partie"){
        jouerMusique();
        validateButton.innerHTML = "Valider";
        buttonPause.style.display = "block";
        reponse.hidden = false;
        reponse.focus();
    } else {
        valider = true;
        temps.style.color = "white";
        reponse.style.transition = "background 0s, border 0s";
        reponse.style.backgroundColor = "#1a1a1a";
        reponseValue = document.getElementById('reponse').value;
        if (reponseValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === ListMusiques[indexMusiqueEnCours].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
            reponse.style.color = "darkgreen";
            body.style.backgroundColor = "green";
            valeurScore++;
        } else {
            reponse.style.color = "darkred";
            body.style.backgroundColor = "red";
        }
        clearInterval(timer);
        titreReponse.innerHTML = ListMusiques[indexMusiqueEnCours];
        score.innerHTML = "Score : "+valeurScore+"/"+nbrMusiquesEcoutees;
        setTimeout(() => {
            if (pause) {
                enAttente = true;
                return;
            }
            titreReponse.innerHTML = "";
            reponse.style.color = "#fff";
            document.getElementById('reponse').value = "";
            reponse.style.transition = "background 0.5s, border 0.5s";
            reponse.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            body.style.backgroundColor = "black";
            jouerMusique();
        }, 2000);
    }
});

buttonPause.addEventListener('click', () => {
    if (buttonPause.innerHTML === "Pause") {
        musiqueEnCours.pause();
        buttonPause.innerHTML = "Play";
        pause = true;
    } else {
        musiqueEnCours.play();
        buttonPause.innerHTML = "Pause";
        pause = false;
        reponse.focus();
        if(enAttente){
            titreReponse.innerHTML = "";
            enAttente = false;
            reponse.style.color = "#fff";
            document.getElementById('reponse').value = "";
            reponse.style.transition = "background 0.5s, border 0.5s";
            reponse.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            body.style.backgroundColor = "black";
            jouerMusique();
        }
    }
});