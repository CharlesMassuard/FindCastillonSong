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
    
    if (currentLyric) {
    lyricsDisplay.textContent = currentLyric.text;
    }
};
}
  
// Initialisation
const audio = document.getElementById('audioPlayer');
loadLRC('../paroles/alabama.lrc').then(lyrics => {
syncLyrics(lyrics, audio);
});
  