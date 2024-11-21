// Fonction pour charger un fichier LRC (paroles)
function loadLRC(lrcFile) {
    return fetch(lrcFile)
      .then(response => response.text())
      .then(parseLRC);
}
  
// Fonction pour parser le fichier LRC
function parseLRC(lrcText) {
    const lines = lrcText.split('\n');
    const lyrics = [];

    lines.forEach(line => {
        const timeMatch = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\]/);
        if (timeMatch) {
        const minutes = parseInt(timeMatch[1]);
        const seconds = parseInt(timeMatch[2]);
        const milliseconds = parseInt(timeMatch[3]);
        const timeInSeconds = minutes * 60 + seconds + milliseconds / 100;
        const text = line.split(']').pop().trim();
        lyrics.push({ time: timeInSeconds, text });
        }
    });

    return lyrics;
}

// Fonction pour afficher les paroles synchronisées
function syncLyrics(lyrics, audio) {
    const lyricsDisplay = document.getElementById('lyricsDisplay');
    audio.ontimeupdate = () => {
        const currentTime = audio.currentTime;
        const currentLyric = lyrics.find((lyric, index) => {
        return currentTime >= lyric.time && (index === lyrics.length - 1 || currentTime < lyrics[index + 1].time);
        });
        if (currentLyric && currentLyric.text != prec_lyrics) {
            if (currentTime >= timestamp_demande_paroles) {
                audio.pause();
                //remplacer lettres par _
                let text = currentLyric.text;
                let text_censure = "";
                for (let i = 0; i < text.length; i++) {
                    lyricsDisplay.style.fontSize = "2em";
                    if (text[i] === " ") {
                        text_censure += "&nbsp;&nbsp;";
                    }
                    else if (text[i] === "'") {
                        text_censure += "'";
                    }
                    else if (text[i] === ",") {
                        text_censure += ",";
                    }
                    else {
                        text_censure += "_ ";
                    }
                }
                lyricsDisplay.innerHTML = text_censure;
                document.getElementById('reponse').hidden = false;
                paroles_a_trouver = currentLyric.text;
            }
            else{
                lyricsDisplay.style.fontSize = "2.5em";
                lyricsDisplay.textContent = currentLyric.text;
                prec_lyrics = currentLyric.text;
            }
        }

    };
}

// Initialisation
import { ListMusiques } from './musiques.js';
// const musique = ListMusiques[Math.floor(Math.random() * ListMusiques.length)];
let musique = new Audio(`../musiques/Alabama.mp3`);
let prec_lyrics = "";
let paroles_a_trouver = "";

let timestamp_demande_paroles = 0;

musique.addEventListener('loadedmetadata', () => {
    const duree_musique = musique.duration;
    timestamp_demande_paroles = Math.floor(Math.random() * (duree_musique - 60) + 20);
    timestamp_demande_paroles = 5;
});

let startButton = document.getElementById('startButton');
startButton.addEventListener('click', function() {

    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.volume = 0.1;
    audioPlayer.play();
    startButton.textContent = 'Pause (TODO)';
});
const audio = document.getElementById('audioPlayer');
    loadLRC('../paroles/alabama.lrc').then(lyrics => {
    syncLyrics(lyrics, audio);
});

let reponse = document.getElementById('reponse');

reponse.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const normalizedResponse = reponse.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/œ/g, "oe");
        const normalizedParoles = paroles_a_trouver.toLowerCase()
                                                                    .normalize("NFD")
                                                                    .replace(/[\u0300-\u036f]/g, "")
                                                                    .replace(/œ/g, "oe")
                                                                    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                                                                    .replace(/\s+/g, " "); //espaces multiples par un seul
        console.log(normalizedResponse);
        console.log(normalizedParoles);
        document.getElementById('boutons').hidden = false;
        if(normalizedResponse === normalizedParoles){
            document.getElementById('recommencer').hidden = true;
            document.getElementById('reponse').hidden = true;
            lyricsDisplay.style.fontSize = "2.5em";
            lyricsDisplay.style.color = "Green";
            lyricsDisplay.innerHTML = paroles_a_trouver;
        }
        else{
            let liste_mots_a_trouver = normalizedParoles.split(" ");
            let liste_mots_reponse = normalizedResponse.split(" ");
            //ecrire en rouge les mots faux
            let texte = "";
            for (let i = 0; i < liste_mots_a_trouver.length; i++) {
                if (liste_mots_reponse[i] === liste_mots_a_trouver[i]) {
                    texte += "<span style='color:green'>" + liste_mots_a_trouver[i] + "</span>&nbsp;";
                }
                else {
                    texte += "<span style='color:red'>" + liste_mots_a_trouver[i] + "</span>&nbsp;";
                }
            }
            document.getElementById('reponse').hidden = true;
            lyricsDisplay.style.fontSize = "2.5em";
            lyricsDisplay.innerHTML = texte;
        }
    }
});

//boutons

let continuer = document.getElementById('continuer');
continuer.addEventListener('click', function() {
    document.getElementById('boutons').hidden = true;
    document.getElementById('reponse').value = "";
    const duree_musique = musique.duration - audio.currentTime;
    timestamp_demande_paroles = Math.floor(Math.random() * (duree_musique - 60) + 20);
    lyricsDisplay.style.color = "White";
    audio.play();
});

let recommencer = document.getElementById('recommencer');
recommencer.addEventListener('click', function() {
    document.getElementById('boutons').hidden = true;
    document.getElementById('reponse').value = "";
    const duree_musique = musique.duration;
    timestamp_demande_paroles = Math.floor(Math.random() * (duree_musique - 60) + 20);
    lyricsDisplay.style.color = "White";
    lyricsDisplay.innerHTML = "";
    prec_lyrics = "";
    audio.currentTime = 0;
    audio.play();
});

  