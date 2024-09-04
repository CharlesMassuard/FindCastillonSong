let reponse = document.getElementById('reponse');
let validateButton = document.getElementById('valider');
let playButton = document.getElementById('suivant');
let body = document.querySelector('body');
let score = document.getElementById('score');
let titreReponse = document.getElementById('titreReponse');

let buttonPause = document.getElementById('pause');

let ListMusiques = ["Amour Plastique", "C'est Drôle", "Alabama", "808", "Doliprane", "En nuit", "Enfance 80", "Euphories", "Gabrielle", "Impala", "Je t'aime", "Mai", "Novembre", "Partir", "Petit monde", "Petite Fille", "Polaroids", "PRD", "Promis", "Rêve", "Roi", "Sensations", "SMS", "Souvenirs", "Suricate", "Trois jours", "What Are You So Afraid Of", "Ce soir", "À la folie", "Crève-cœur", "Frissons", "lèche_vitrine_demo1.wav", "Subutex"];

let nbrMusiquesEcoutees = 0;
let indexMusiqueEnCours = -1;
let musiqueEnCours = new Audio();
let valeurScore = 0;
let pause = false;
let enAttente = false;
let valider = false;
let iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
let listMusiquesJouees = [];

function jouerMusique() {
    if(nbrMusiquesEcoutees === 20){
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
    } while (listMusiquesJouees.includes(ListMusiques[nbrAleatoire]));
    listMusiquesJouees.push(ListMusiques[nbrAleatoire]);
    indexMusiqueEnCours = nbrAleatoire;
    musiqueEnCours.pause();
    nbrMusiquesEcoutees++;
    musiqueEnCours = new Audio(`../musiques/${ListMusiques[nbrAleatoire]}.mp3`);
    musiqueEnCours.volume = 0.1;
    musiqueEnCours.play();
    if(iOS){
        buttonPause.click();
    }
}

reponse.addEventListener('keyup', (e) => {
    if (e.key === "Enter" && !valider) {
        validateButton.click();
    }
});

validateButton.addEventListener('click', () => {
    if(validateButton.innerHTML === "Lancer la partie"){
        document.getElementById('avantLancement').style.display = "none";
        if(iOS){
            alert("Suite à une limitation sur les appareils IOS, vous devrez cliquer sur le bouton 'Play' à chaque nouvelle musique. Nous sommes désolés pour ce désagrément hors de notre contrôle, et vous remercions de votre compréhension.");
        }
        jouerMusique();
        validateButton.innerHTML = "Valider";
        buttonPause.style.display = "block";
        reponse.hidden = false;
        reponse.focus();
    } else {
        valider = true;
        reponse.style.transition = "background 0s, border 0s";
        reponse.style.backgroundColor = "#1a1a1a";
        reponseValue = document.getElementById('reponse').value;
        if (isValidResponse(reponseValue)) {
            reponse.style.color = "darkgreen";
            body.style.backgroundColor = "green";
            document.getElementById('accueil').style.backgroundColor = "green";
            valeurScore++;
        } else {
            reponse.style.color = "darkred";
            body.style.backgroundColor = "red";
            document.getElementById('accueil').style.backgroundColor = "red";
        }
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
            document.getElementById('accueil').style.backgroundColor = "black";
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
            document.getElementById('accueil').style.backgroundColor = "black";
            jouerMusique();
        }
    }
});

function isValidResponse(reponseValue) {
    const normalizedResponse = reponseValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/œ/g, "oe");
    const normalizedMusic = ListMusiques[indexMusiqueEnCours].toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/œ/g, "oe");

    if (normalizedResponse === normalizedMusic) {
        return true;
    }

    // Specific checks for "lèche_vitrine_demo1.wav" and its variations
    if (normalizedMusic === "leche_vitrine_demo1.wav") {
        const validResponses = ["leche_vitrine", "leche_vitrine_demo", "leche_vitrine_demo1", "leche vitrine", "leche vitrine demo", "leche vitrine demo1"];
        if (validResponses.includes(normalizedResponse)) {
            return true;
        }
    }
    if(normalizedMusic === "creve-coeur"){
        const validResponses = ["creve-coeur", "creve coeur"];
        if (validResponses.includes(normalizedResponse)) {
            return true;
        }
    }

    return false;
}
