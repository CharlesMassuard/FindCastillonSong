let buttonPlay = document.getElementById('jouer');
let normalMode = document.getElementById('normalMode');
let contreLaMontreMode = document.getElementById('contreLaMontreMode');
let aleatoireMode = document.getElementById('aleatoireMode');
let extremeMode = document.getElementById('extremeMode');

buttonPlay.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight + 200,
        behavior: 'smooth'
    });
});

normalMode.addEventListener('click', () => {
    window.location.href = "./html/normalGame.html";
});

contreLaMontreMode.addEventListener('click', () => {
    window.location.href = "./html/contreLaMontre.html";
});

aleatoireMode.addEventListener('click', () => {
    window.location.href = "./html/aleatoire.html";
});

extremeMode.addEventListener('click', () => {
    window.location.href = "./html/extremeMode.html";
});