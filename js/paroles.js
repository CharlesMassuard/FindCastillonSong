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
                lyricsDisplay.textContent = "Trouvez les paroles !";
            }
            else{
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

let timestamp_demande_paroles = 0;

musique.addEventListener('loadedmetadata', () => {
    const duree_musique = musique.duration;
    timestamp_demande_paroles = Math.floor(Math.random() * (duree_musique - 60) + 20);
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
  